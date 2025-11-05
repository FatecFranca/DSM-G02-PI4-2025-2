import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState, useEffect } from 'react';
import {
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ApiService, { Parking, ParkingSlot } from '../../lib/api';
import ParkingSpot, { SpotStatus } from '../../components/parking/ParkingSpot';
import FilterPicker from '../../components/ui/FilterPicker';
import SearchInput from '../../components/ui/SearchInput';
import StatCard from '../../components/ui/StatCard';

type SensorsData = {
    id: string;
    sensorId: string;
    parkingSlotId?: string;
    data: string;
    createdAt: string;
    sensor: {
        id: string;
        name: string;
        type: string;
        parkingSlot?: {
            id: string;
            number: number;
            parking: {
                id: string;
                name: string;
                address: string;
                city: string;
            };
        };
    };
};

type ReservationData = {
    id: string;
    parkingSlotId: string;
    userId: string;
    vehiclePlate: string;
    startTime: string;
    endTime: string;
    status: string;
    createdAt: string;
};

// Função para obter o último dado de sensor de uma vaga
function getLatestSensorData(slotId: string, sensorsData: SensorsData[]): SensorsData | null {
    const latestData = sensorsData.find(sd => {
        const slotIdFromSensor = sd.sensor?.parkingSlot?.id;
        const slotIdDirect = sd.parkingSlotId;
        const matchesSlot = slotIdFromSensor === slotId || slotIdDirect === slotId;
        const hasData = sd.data != null && sd.data !== undefined && sd.data !== "";
        return matchesSlot && hasData;
    });
    return latestData || null;
}

// Função para verificar se há reserva ativa para uma vaga
function hasActiveReservation(slotId: string, reservations: ReservationData[]): boolean {
    const now = new Date();
    return reservations.some(r => 
        r.parkingSlotId === slotId &&
        r.status !== "cancelled" &&
        new Date(r.startTime) <= now &&
        new Date(r.endTime) >= now
    );
}

function mapStatus(slot: ParkingSlot, sensorsData: SensorsData[], reservations: ReservationData[]): SpotStatus {
    // Se não estiver ativa, sempre retorna manutenção
    if (!slot.isActive) return "manutencao";

    // Buscar último dado do sensor
    const latestData = getLatestSensorData(slot.id, sensorsData);
    
    // Se houver dados de sensor, priorizar o valor do sensor
    if (latestData) {
        const sensorValue = String(latestData.data || "").toUpperCase().trim();
        
        // Se o sensor detecta presença, sempre retorna ocupada (independente de reserva)
        if (sensorValue === "PRESENT") {
            return "ocupada";
        }
        
        // Se o sensor detecta livre, verificar se há reserva
        if (sensorValue === "FREE") {
            const hasReservation = hasActiveReservation(slot.id, reservations);
            if (hasReservation) {
                return "reservada";
            }
            return "livre";
        }
    }
    
    // Se não houver dados de sensor ou valor desconhecido, usar fallback
    const hasReservation = hasActiveReservation(slot.id, reservations);
    if (hasReservation && slot.isAvailable) {
        return "reservada";
    }
    return slot.isAvailable ? "livre" : "ocupada";
}

export default function ParkingSpotsPage() {
    const [parkings, setParkings] = useState<Parking[]>([]);
    const [slots, setSlots] = useState<ParkingSlot[]>([]);
    const [sensorsData, setSensorsData] = useState<SensorsData[]>([]);
    const [reservations, setReservations] = useState<ReservationData[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const [filter, setFilter] = useState<SpotStatus | "todas">("todas");
    const [parkingFilter, setParkingFilter] = useState<string>("todos");
    const [searchTerm, setSearchTerm] = useState("");

    const loadData = async () => {
        try {
            setError(null);
            // Buscar dados usando métodos do ApiService
            const [parkingsResponse, slotsResponse, sensorsResponse, reservationsResponse] = await Promise.all([
                ApiService.getParkings(),
                ApiService.getParkingSlots(),
                // Buscar apenas o último dado de cada vaga (endpoint otimizado)
                ApiService.getLatestSensorsDataBySlot(),
                ApiService.getReservations().catch(() => ({ data: [] as ReservationData[] })),
            ]);

            if (parkingsResponse.data) {
                setParkings(parkingsResponse.data);
            }
            if (slotsResponse.data) {
                // Tratar resposta paginada ou não paginada
                const slots = Array.isArray(slotsResponse.data) ? slotsResponse.data : (slotsResponse.data as any).data || [];
                setSlots(Array.isArray(slots) ? slots : []);
            }
            // O novo endpoint já retorna apenas o último dado de cada vaga como array direto
            if (sensorsResponse.data) {
                setSensorsData(Array.isArray(sensorsResponse.data) ? sensorsResponse.data : []);
            }
            if (reservationsResponse.data) {
                // Converter Reservation do ApiService para ReservationData
                const reservationsArray = Array.isArray(reservationsResponse.data) ? reservationsResponse.data : [];
                const convertedReservations: ReservationData[] = reservationsArray.map((r: any) => ({
                    id: r.id,
                    parkingSlotId: r.parkingSlotId,
                    userId: r.userId || r.user?.id || '',
                    vehiclePlate: r.vehiclePlate,
                    startTime: r.startTime,
                    endTime: r.endTime,
                    status: r.status || 'active',
                    createdAt: r.createdAt,
                }));
                setReservations(convertedReservations);
            }
        } catch (err) {
            setError('Erro ao carregar dados');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const filtered = useMemo(() => {
        return slots.filter((slot) => {
            const status = mapStatus(slot, sensorsData, reservations);
            const statusOk = filter === "todas" ? true : status === filter;
            const parkingOk = parkingFilter === "todos" ? true : slot.parkingId === parkingFilter;
            const searchOk = searchTerm === "" ? true : `${slot.number}`.toLowerCase().includes(searchTerm.toLowerCase());
            return statusOk && parkingOk && searchOk;
        });
    }, [slots, sensorsData, reservations, filter, parkingFilter, searchTerm]);

    const counts = useMemo(() => {
        const allStatuses = slots.map(slot => mapStatus(slot, sensorsData, reservations));
        return {
            total: slots.length,
            livre: allStatuses.filter((s) => s === "livre").length,
            ocupada: allStatuses.filter((s) => s === "ocupada").length,
            reservada: allStatuses.filter((s) => s === "reservada").length,
            manutencao: allStatuses.filter((s) => s === "manutencao").length,
        };
    }, [slots, sensorsData, reservations]);

    const onRefresh = async () => {
        setRefreshing(true);
        await loadData();
        setRefreshing(false);
    };

    const statusOptions = [
        { label: "Todos os Status", value: "todas" },
        { label: "Livres", value: "livre" },
        { label: "Ocupadas", value: "ocupada" },
        { label: "Reservadas", value: "reservada" },
        { label: "Manutenção", value: "manutencao" },
    ];

    const parkingOptions = [
        { label: "Todos os Estacionamentos", value: "todos" },
        ...parkings.map(p => ({ label: p.name, value: p.id }))
    ];

    const legendItems = [
        { label: "Livre", color: "#22C55E" },
        { label: "Ocupada", color: "#EF4444" },
        { label: "Reservada", color: "#EAB308" },
        { label: "Manutenção", color: "#9CA3AF" },
    ];

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Carregando vagas...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Gestão de Vagas</Text>
                    <Text style={styles.subtitle}>Gerencie todas as vagas dos estacionamentos</Text>
                </View>

                {/* Summary Cards */}
                <View style={styles.statsContainer}>
                    <StatCard
                        label="Total"
                        value={counts.total}
                        color="#374151"
                        bgColor="#F3F4F6"
                    />
                    <StatCard
                        label="Livre"
                        value={counts.livre}
                        color="#166534"
                        bgColor="#DCFCE7"
                    />
                    <StatCard
                        label="Ocupada"
                        value={counts.ocupada}
                        color="#991B1B"
                        bgColor="#FEE2E2"
                    />
                    <StatCard
                        label="Reservada"
                        value={counts.reservada}
                        color="#92400E"
                        bgColor="#FEF3C7"
                    />
                    <StatCard
                        label="Manutenção"
                        value={counts.manutencao}
                        color="#374151"
                        bgColor="#F3F4F6"
                    />
                </View>

                {/* Search and Filters */}
                <View style={styles.toolbar}>
                    <SearchInput
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                        placeholder="Buscar por vaga..."
                    />

                    <View style={styles.filtersRow}>
                        <View style={styles.filterWrapper}>
                            <FilterPicker
                                value={filter}
                                onValueChange={(value) => setFilter(value as any)}
                                options={statusOptions}
                                placeholder="Status"
                            />
                        </View>

                        <View style={styles.filterWrapper}>
                            <FilterPicker
                                value={parkingFilter}
                                onValueChange={(value) => setParkingFilter(value as any)}
                                options={parkingOptions}
                                placeholder="Estacionamento"
                            />
                        </View>
                    </View>

                    <View style={styles.actionButtons}>
                        <TouchableOpacity
                            style={styles.refreshButton}
                            onPress={onRefresh}
                            activeOpacity={0.7}
                        >
                            <Ionicons name="refresh" size={20} color="#6B7280" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Error Display */}
                {error && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                        <TouchableOpacity style={styles.retryButton} onPress={loadData}>
                            <Text style={styles.retryButtonText}>Tentar novamente</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Parking Grid */}
                <View style={styles.parkingContainer}>
                    <View style={styles.parkingHeader}>
                        <Text style={styles.parkingTitle}>Vagas ({filtered.length}/{slots.length})</Text>
                        <View style={styles.legend}>
                            {legendItems.map((item, index) => (
                                <View key={index} style={styles.legendItem}>
                                    <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                                    <Text style={styles.legendText}>{item.label}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {(() => {
                        const byParking = new Map<string, ParkingSlot[]>();
                        filtered.forEach((slot) => {
                            const arr = byParking.get(slot.parkingId) || [];
                            arr.push(slot);
                            byParking.set(slot.parkingId, arr);
                        });
                        const groups = Array.from(byParking.entries());

                        if (groups.length === 0) {
                            return (
                                <View style={styles.emptyState}>
                                    <Ionicons name="search-outline" size={48} color="#9CA3AF" />
                                    <Text style={styles.emptyText}>
                                        Nenhuma vaga encontrada com os filtros aplicados.
                                    </Text>
                                </View>
                            );
                        }

                        return groups.map(([parkingId, slotsGroup]) => {
                            const parkingName = parkings.find((p) => p.id === parkingId)?.name || parkingId;
                            return (
                                <View key={parkingId} style={styles.sectorContainer}>
                                    <Text style={styles.sectorTitle}>{parkingName}</Text>
                                    <View style={styles.spotsGrid}>
                                        {slotsGroup
                                            .sort((a, b) => a.number - b.number)
                                            .map((slot) => {
                                                const status = mapStatus(slot, sensorsData, reservations);
                                                return (
                                                    <View key={slot.id} style={styles.spotWrapper}>
                                                        <ParkingSpot 
                                                            id={String(slot.number).padStart(2, '0')} 
                                                            status={status} 
                                                        />
                                                    </View>
                                                );
                                            })}
                                    </View>
                                </View>
                            );
                        });
                    })()}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    scrollView: {
        flex: 1,
    },
    header: {
        padding: 20,
        paddingBottom: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 16,
        color: '#6B7280',
    },
    statsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        gap: 6,
        marginBottom: 20,
        flexWrap: 'wrap',
    },
    toolbar: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    filtersRow: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 12,
    },
    filterWrapper: {
        flex: 1,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
    },
    refreshButton: {
        padding: 12,
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: '600',
        marginLeft: 4,
    },
    parkingContainer: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    parkingHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
        flexWrap: 'wrap',
    },
    parkingTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937',
        flex: 1,
        marginRight: 8,
    },
    legend: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        flex: 1,
        justifyContent: 'flex-end',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 4,
    },
    legendDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    legendText: {
        fontSize: 10,
        color: '#6B7280',
        flexShrink: 1,
    },
    sectorContainer: {
        marginBottom: 24,
    },
    sectorTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 12,
    },
    spotsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        justifyContent: 'center',
    },
    spotWrapper: {
        transform: [{ rotate: '-2deg' }],
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    emptyText: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
        marginTop: 12,
    },
    authRequired: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    authRequiredTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1F2937',
        marginTop: 16,
        marginBottom: 8,
    },
    authRequiredText: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    loadingText: {
        fontSize: 16,
        color: '#6B7280',
    },
    errorContainer: {
        backgroundColor: '#FEF2F2',
        margin: 20,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#FECACA',
    },
    errorText: {
        fontSize: 14,
        color: '#DC2626',
        marginBottom: 12,
    },
    retryButton: {
        backgroundColor: '#DC2626',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    retryButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },
});
