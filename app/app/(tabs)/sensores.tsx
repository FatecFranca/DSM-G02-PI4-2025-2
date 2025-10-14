import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useMemo, useState } from 'react';
import {
    Alert,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import CustomModal from '../../components/ui/CustomModal';
import FilterPicker from '../../components/ui/FilterPicker';
import SearchInput from '../../components/ui/SearchInput';

// Types
type Parking = {
    id: string;
    name: string
};

type Sensor = {
    id: string;
    parkingSlotId?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    name: string;
    description?: string;
    type: string;
};

type SensorsData = {
    id: string;
    sensorId: string;
    parkingSlotId?: string;
    isActive?: boolean;
    createdAt: string;
    data: string;
};

type ParkingSensor = {
    id: string;
    parkingId: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    name: string;
    description?: string;
    type: string;
};

type ParkingSensorData = {
    id: string;
    parkingSensorId: string;
    data: string;
    createdAt: string;
};

// Mock data
const mockParkings: Parking[] = [
    { id: "1", name: "Estacionamento Centro" },
    { id: "2", name: "Estacionamento Shopping" },
    { id: "3", name: "Estacionamento Universidade" },
];

const mockSensors: Sensor[] = [
    {
        id: "1",
        name: "Sensor Vaga A1",
        type: "IR",
        description: "Sensor infravermelho para vaga A1",
        parkingSlotId: "A1",
        isActive: true,
        createdAt: "2024-01-15T10:00:00Z",
        updatedAt: "2024-01-20T14:30:00Z"
    },
    {
        id: "2",
        name: "Sensor Vaga B2",
        type: "ULTRASONIC",
        description: "Sensor ultrassônico para vaga B2",
        parkingSlotId: "B2",
        isActive: false,
        createdAt: "2024-01-16T09:15:00Z",
        updatedAt: "2024-01-19T16:45:00Z"
    },
    {
        id: "3",
        name: "Sensor Vaga C3",
        type: "CAMERA",
        description: "Sensor de câmera para vaga C3",
        parkingSlotId: "C3",
        isActive: true,
        createdAt: "2024-01-17T11:30:00Z",
        updatedAt: "2024-01-21T08:20:00Z"
    }
];

const mockParkingSensors: ParkingSensor[] = [
    {
        id: "1",
        name: "Sensor Entrada Principal",
        type: "CAMERA",
        description: "Sensor de câmera na entrada principal",
        parkingId: "1",
        isActive: true,
        createdAt: "2024-01-10T08:00:00Z",
        updatedAt: "2024-01-22T10:15:00Z"
    },
    {
        id: "2",
        name: "Sensor Contador de Vagas",
        type: "COUNTER",
        description: "Contador automático de vagas disponíveis",
        parkingId: "2",
        isActive: true,
        createdAt: "2024-01-12T14:20:00Z",
        updatedAt: "2024-01-21T09:30:00Z"
    },
    {
        id: "3",
        name: "Sensor Temperatura",
        type: "TEMPERATURE",
        description: "Monitoramento de temperatura ambiente",
        parkingId: "3",
        isActive: false,
        createdAt: "2024-01-14T16:45:00Z",
        updatedAt: "2024-01-20T12:00:00Z"
    }
];

const mockSensorData: SensorsData[] = [
    {
        id: "1",
        sensorId: "1",
        data: "Vaga ocupada - veículo detectado",
        createdAt: "2024-01-22T10:30:00Z"
    },
    {
        id: "2",
        sensorId: "1",
        data: "Vaga liberada",
        createdAt: "2024-01-22T10:25:00Z"
    },
    {
        id: "3",
        sensorId: "2",
        data: "Sensor inativo - sem detecção",
        createdAt: "2024-01-22T09:45:00Z"
    }
];

export default function SensoresPage() {
    // State for tabs
    const [tab, setTab] = useState<"sensors" | "parkingSensors">("sensors");

    // State for data
    const [parkings, setParkings] = useState<Parking[]>(mockParkings);
    const [sensors, setSensors] = useState<Sensor[]>(mockSensors);
    const [parkingSensors, setParkingSensors] = useState<ParkingSensor[]>(mockParkingSensors);

    // Loading states
    const [sensorsLoading, setSensorsLoading] = useState(false);
    const [psLoading, setPsLoading] = useState(false);
    const [sensorsError, setSensorsError] = useState<string | null>(null);
    const [psError, setPsError] = useState<string | null>(null);

    // Filter states
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState<string>("todos");
    const [parkingFilter, setParkingFilter] = useState<string>("todos");

    // Detail modal states
    const [detailId, setDetailId] = useState<string | null>(null);
    const [detailLoading, setDetailLoading] = useState(false);
    const [detailData, setDetailData] = useState<(SensorsData | ParkingSensorData)[]>([]);
    const [detailTab, setDetailTab] = useState<"today" | "week" | "all">("today");
    const [detailSearch, setDetailSearch] = useState("");
    const [showAllDetails, setShowAllDetails] = useState(false);

    // Refresh function
    const refreshAll = async () => {
        setSensorsLoading(true);
        setPsLoading(true);
        setSensorsError(null);
        setPsError(null);

        try {
            // Simulate API calls with mock data
            await new Promise(resolve => setTimeout(resolve, 1000));
            setParkings(mockParkings);
            setSensors(mockSensors);
            setParkingSensors(mockParkingSensors);
        } catch (e: any) {
            const msg = e?.message || "Erro ao carregar dados";
            setSensorsError(msg);
            setPsError(msg);
        } finally {
            setSensorsLoading(false);
            setPsLoading(false);
        }
    };

    // Load data on mount
    useEffect(() => {
        refreshAll();
    }, []);

    // Filtered data
    const filteredSensors = useMemo(() => {
        return sensors.filter((s) => {
            const bySearch = search === "" ? true :
                `${s.name} ${s.description ?? ""} ${s.type}`.toLowerCase().includes(search.toLowerCase());
            const byType = typeFilter === "todos" ? true : s.type === typeFilter;
            return bySearch && byType;
        });
    }, [sensors, search, typeFilter]);

    const filteredParkingSensors = useMemo(() => {
        return parkingSensors.filter((s) => {
            const bySearch = search === "" ? true :
                `${s.name} ${s.description ?? ""} ${s.type}`.toLowerCase().includes(search.toLowerCase());
            const byType = typeFilter === "todos" ? true : s.type === typeFilter;
            const byParking = parkingFilter === "todos" ? true : s.parkingId === parkingFilter;
            return bySearch && byType && byParking;
        });
    }, [parkingSensors, search, typeFilter, parkingFilter]);

    // Available types
    const types = useMemo(() => {
        const fromSensors = Array.from(new Set(sensors.map(s => s.type)));
        const fromParkingSensors = Array.from(new Set(parkingSensors.map(s => s.type)));
        return Array.from(new Set(["todos", ...fromSensors, ...fromParkingSensors]));
    }, [sensors, parkingSensors]);

    // Open details modal
    const openDetails = async (id: string) => {
        setDetailId(id);
        setDetailLoading(true);
        setDetailData([]);
        setDetailTab("today");
        setDetailSearch("");
        setShowAllDetails(false);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            setDetailData(mockSensorData);
        } catch (e) {
            setDetailData([]);
        } finally {
            setDetailLoading(false);
        }
    };

    // Filter detail data
    const filteredDetailData = useMemo(() => {
        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - 6);

        return detailData.filter((d) => {
            const created = new Date(d.createdAt);
            const byTab = detailTab === "all"
                ? true
                : detailTab === "today"
                    ? created >= startOfToday
                    : created >= startOfWeek;
            const text = (d as any).data ?? "";
            const bySearch = detailSearch.trim() === "" ? true :
                String(text).toLowerCase().includes(detailSearch.toLowerCase());
            return byTab && bySearch;
        });
    }, [detailData, detailTab, detailSearch]);

    const visibleDetailData = useMemo(() => {
        return showAllDetails ? filteredDetailData : filteredDetailData.slice(0, 20);
    }, [filteredDetailData, showAllDetails]);

    // Toggle sensor active status
    const toggleActive = async (item: Sensor | ParkingSensor) => {
        try {
            Alert.alert(
                "Alterar Status",
                `Deseja ${item.isActive ? 'desativar' : 'ativar'} este sensor?`,
                [
                    { text: "Cancelar", style: "cancel" },
                    {
                        text: "Confirmar",
                        onPress: () => {
                            // Simulate API call
                            if ("parkingSlotId" in item) {
                                setSensors(prev => prev.map(s =>
                                    s.id === item.id ? { ...s, isActive: !s.isActive } : s
                                ));
                            } else {
                                setParkingSensors(prev => prev.map(s =>
                                    s.id === item.id ? { ...s, isActive: !s.isActive } : s
                                ));
                            }
                        }
                    }
                ]
            );
        } catch (e) {
            Alert.alert("Erro", "Falha ao atualizar status");
        }
    };

    // Remove sensor
    const removeItem = async (item: Sensor | ParkingSensor) => {
        Alert.alert(
            "Remover Sensor",
            "Deseja remover este sensor?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Remover",
                    style: "destructive",
                    onPress: () => {
                        if ("parkingSlotId" in item) {
                            setSensors(prev => prev.filter(s => s.id !== item.id));
                        } else {
                            setParkingSensors(prev => prev.filter(s => s.id !== item.id));
                        }
                    }
                }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={sensorsLoading || psLoading} onRefresh={refreshAll} />
                }
            >
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerTop}>
                        <View>
                            <Text style={styles.title}>Sensores</Text>
                            <Text style={styles.subtitle}>Gerencie sensores de vagas e estacionamentos</Text>
                        </View>
                        <Button
                            variant="secondary"
                            size="sm"
                            onPress={refreshAll}
                            style={styles.refreshButton}
                        >
                            <Ionicons name="refresh" size={16} color="#6B7280" />
                            <Text style={styles.refreshButtonText}>Atualizar</Text>
                        </Button>
                    </View>
                </View>

                {/* Tabs */}
                <View style={styles.tabsContainer}>
                    <View style={styles.tabs}>
                        <TouchableOpacity
                            style={[styles.tab, tab === "sensors" && styles.activeTab]}
                            onPress={() => setTab("sensors")}
                            activeOpacity={0.7}
                        >
                            <Text style={[styles.tabText, tab === "sensors" && styles.activeTabText]}>
                                Vaga Sensores
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tab, tab === "parkingSensors" && styles.activeTab]}
                            onPress={() => setTab("parkingSensors")}
                            activeOpacity={0.7}
                        >
                            <Text style={[styles.tabText, tab === "parkingSensors" && styles.activeTabText]}>
                                Estacionamento Sensores
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Filters */}
                <Card style={styles.filtersCard}>
                    <View style={styles.searchContainer}>
                        <SearchInput
                            value={search}
                            onChangeText={setSearch}
                            placeholder="Buscar por nome, descrição ou tipo..."
                        />
                    </View>
                    <View style={styles.filtersRow}>
                        <FilterPicker
                            value={typeFilter}
                            onValueChange={setTypeFilter}
                            options={types.map(t => ({
                                label: t === "todos" ? "Todos os Tipos" : t,
                                value: t
                            }))}
                            placeholder="Tipo"
                        />

                        {tab === "parkingSensors" && (
                            <FilterPicker
                                value={parkingFilter}
                                onValueChange={setParkingFilter}
                                options={[
                                    { label: "Todos os Estacionamentos", value: "todos" },
                                    ...parkings.map(p => ({ label: p.name, value: p.id }))
                                ]}
                                placeholder="Estacionamento"
                            />
                        )}
                    </View>
                </Card>

                {/* Sensors List */}
                {tab === "sensors" ? (
                    <Card style={styles.listCard}>
                        <View style={styles.listHeader}>
                            <Text style={styles.listTitle}>
                                Sensores de Vaga ({filteredSensors.length})
                            </Text>
                            {sensorsError && (
                                <Text style={styles.errorText}>{sensorsError}</Text>
                            )}
                        </View>

                        {sensorsLoading ? (
                            <View style={styles.loadingContainer}>
                                <Text style={styles.loadingText}>Carregando...</Text>
                            </View>
                        ) : filteredSensors.length === 0 ? (
                            <View style={styles.emptyContainer}>
                                <Ionicons name="hardware-chip" size={48} color="#9CA3AF" />
                                <Text style={styles.emptyText}>Nenhum sensor encontrado</Text>
                            </View>
                        ) : (
                            <View style={styles.list}>
                                {filteredSensors.map((sensor) => (
                                    <View key={sensor.id} style={styles.listItem}>
                                        <View style={styles.itemContent}>
                                            <View style={styles.itemHeader}>
                                                <Text style={styles.itemName}>{sensor.name}</Text>
                                                <View style={[
                                                    styles.statusBadge,
                                                    sensor.isActive ? styles.activeBadge : styles.inactiveBadge
                                                ]}>
                                                    <Text style={[
                                                        styles.statusText,
                                                        sensor.isActive ? styles.activeText : styles.inactiveText
                                                    ]}>
                                                        {sensor.isActive ? "Ativo" : "Inativo"}
                                                    </Text>
                                                </View>
                                            </View>

                                            <View style={styles.itemDetails}>
                                                <View style={styles.detailRow}>
                                                    <Ionicons name="hardware-chip" size={14} color="#6B7280" />
                                                    <Text style={styles.detailText}>{sensor.type}</Text>
                                                </View>
                                                {sensor.description && (
                                                    <View style={styles.detailRow}>
                                                        <Ionicons name="document-text" size={14} color="#6B7280" />
                                                        <Text style={styles.detailText} numberOfLines={1}>
                                                            {sensor.description}
                                                        </Text>
                                                    </View>
                                                )}
                                                <View style={styles.detailRow}>
                                                    <Ionicons name="car" size={14} color="#6B7280" />
                                                    <Text style={styles.detailText}>Vaga {sensor.parkingSlotId}</Text>
                                                </View>
                                                <View style={styles.detailRow}>
                                                    <Ionicons name="time" size={14} color="#6B7280" />
                                                    <Text style={styles.detailText}>
                                                        {new Date(sensor.updatedAt).toLocaleString("pt-BR", {
                                                            dateStyle: "short",
                                                            timeStyle: "short"
                                                        })}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.itemActions}>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        )}
                    </Card>
                ) : (
                    <Card style={styles.listCard}>
                        <View style={styles.listHeader}>
                            <Text style={styles.listTitle}>
                                Sensores de Estacionamento ({filteredParkingSensors.length})
                            </Text>
                            {psError && (
                                <Text style={styles.errorText}>{psError}</Text>
                            )}
                        </View>

                        {psLoading ? (
                            <View style={styles.loadingContainer}>
                                <Text style={styles.loadingText}>Carregando...</Text>
                            </View>
                        ) : filteredParkingSensors.length === 0 ? (
                            <View style={styles.emptyContainer}>
                                <Ionicons name="business" size={48} color="#9CA3AF" />
                                <Text style={styles.emptyText}>Nenhum sensor encontrado</Text>
                            </View>
                        ) : (
                            <View style={styles.list}>
                                {filteredParkingSensors.map((sensor) => (
                                    <View key={sensor.id} style={styles.listItem}>
                                        <View style={styles.itemContent}>
                                            <View style={styles.itemHeader}>
                                                <Text style={styles.itemName}>{sensor.name}</Text>
                                                <View style={[
                                                    styles.statusBadge,
                                                    sensor.isActive ? styles.activeBadge : styles.inactiveBadge
                                                ]}>
                                                    <Text style={[
                                                        styles.statusText,
                                                        sensor.isActive ? styles.activeText : styles.inactiveText
                                                    ]}>
                                                        {sensor.isActive ? "Ativo" : "Inativo"}
                                                    </Text>
                                                </View>
                                            </View>

                                            <View style={styles.itemDetails}>
                                                <View style={styles.detailRow}>
                                                    <Ionicons name="hardware-chip" size={14} color="#6B7280" />
                                                    <Text style={styles.detailText}>{sensor.type}</Text>
                                                </View>
                                                {sensor.description && (
                                                    <View style={styles.detailRow}>
                                                        <Ionicons name="document-text" size={14} color="#6B7280" />
                                                        <Text style={styles.detailText} numberOfLines={1}>
                                                            {sensor.description}
                                                        </Text>
                                                    </View>
                                                )}
                                                <View style={styles.detailRow}>
                                                    <Ionicons name="business" size={14} color="#6B7280" />
                                                    <Text style={styles.detailText}>
                                                        {parkings.find(p => p.id === sensor.parkingId)?.name || sensor.parkingId}
                                                    </Text>
                                                </View>
                                                <View style={styles.detailRow}>
                                                    <Ionicons name="time" size={14} color="#6B7280" />
                                                    <Text style={styles.detailText}>
                                                        {new Date(sensor.updatedAt).toLocaleString("pt-BR", {
                                                            dateStyle: "short",
                                                            timeStyle: "short"
                                                        })}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        )}
                    </Card>
                )}

                {/* Details Modal */}
                <CustomModal
                    visible={detailId !== null}
                    title="Leituras Recentes"
                    onClose={() => setDetailId(null)}
                >
                    <View style={styles.modalContent}>
                        <Text style={styles.modalSubtitle}>
                            Visualize, filtre e pesquise os logs deste sensor.
                        </Text>
                        
                        {/* Detail Tabs */}
                        <View style={styles.detailTabsContainer}>
                            <View style={styles.detailTabs}>
                                <TouchableOpacity
                                    style={[styles.detailTab, detailTab === "today" && styles.activeDetailTab]}
                                    onPress={() => setDetailTab("today")}
                                    activeOpacity={0.7}
                                >
                                    <Text style={[styles.detailTabText, detailTab === "today" && styles.activeDetailTabText]}>
                                        Hoje
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.detailTab, detailTab === "week" && styles.activeDetailTab]}
                                    onPress={() => setDetailTab("week")}
                                    activeOpacity={0.7}
                                >
                                    <Text style={[styles.detailTabText, detailTab === "week" && styles.activeDetailTabText]}>
                                        Essa semana
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.detailTab, detailTab === "all" && styles.activeDetailTab]}
                                    onPress={() => setDetailTab("all")}
                                    activeOpacity={0.7}
                                >
                                    <Text style={[styles.detailTabText, detailTab === "all" && styles.activeDetailTabText]}>
                                        Todos
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Detail Search */}
                        <View style={styles.detailSearchContainer}>
                            <SearchInput
                                value={detailSearch}
                                onChangeText={setDetailSearch}
                                placeholder="Pesquisar nos logs..."
                            />
                            <TouchableOpacity
                                style={styles.showAllButton}
                                onPress={() => setShowAllDetails(!showAllDetails)}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.showAllButtonText}>
                                    {showAllDetails ? "Mostrar menos" : "Ver completo"}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Detail Data */}
                        <View style={styles.detailDataContainer}>
                            {detailLoading ? (
                                <View style={styles.detailLoadingContainer}>
                                    <Text style={styles.detailLoadingText}>Carregando...</Text>
                                </View>
                            ) : filteredDetailData.length === 0 ? (
                                <View style={styles.detailEmptyContainer}>
                                    <Ionicons name="document-text" size={48} color="#9CA3AF" />
                                    <Text style={styles.detailEmptyText}>Nenhum log encontrado.</Text>
                                </View>
                            ) : (
                                <>
                                    <Text style={styles.detailCountText}>
                                        Mostrando {visibleDetailData.length} de {filteredDetailData.length} registros filtrados
                                    </Text>
                                    <ScrollView style={styles.detailScrollView}>
                                        {visibleDetailData.map((data, index) => (
                                            <View key={data.id || index} style={styles.detailItem}>
                                                <Text style={styles.detailItemText} numberOfLines={2}>
                                                    {(data as any).data}
                                                </Text>
                                                <Text style={styles.detailItemDate}>
                                                    {new Date(data.createdAt).toLocaleString("pt-BR", {
                                                        dateStyle: "short",
                                                        timeStyle: "short"
                                                    })}
                                                </Text>
                                            </View>
                                        ))}
                                    </ScrollView>
                                    {!showAllDetails && filteredDetailData.length > 20 && (
                                        <TouchableOpacity
                                            style={styles.showMoreButton}
                                            onPress={() => setShowAllDetails(true)}
                                            activeOpacity={0.7}
                                        >
                                            <Text style={styles.showMoreButtonText}>Ver completo</Text>
                                        </TouchableOpacity>
                                    )}
                                </>
                            )}
                        </View>
                    </View>
                </CustomModal>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    scrollView: {
        flex: 1,
    },
    header: {
        padding: 20,
        paddingBottom: 16,
    },
    refreshButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    refreshButtonText: {
        fontSize: 14,
        fontWeight: '600',
    },
    tabsContainer: {
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    tabs: {
        flexDirection: 'row',
        gap: 16,
    },
    tab: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: '#F3F4F6',
    },
    activeTab: {
        backgroundColor: '#3B82F6',
    },
    tabText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1F2937',
    },
    activeTabText: {
        color: '#FFFFFF',
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
    filtersCard: {
        marginHorizontal: 20,
        marginBottom: 20,
        padding: 20,
    },
    searchContainer: {
        marginBottom: 16,
    },
    filtersRow: {
        flexDirection: 'row',
        gap: 16,
    },
    listCard: {
        marginHorizontal: 20,
        marginBottom: 20,
        padding: 20,
    },
    listHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    listTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    errorText: {
        fontSize: 14,
        color: '#EF4444',
        marginTop: 4,
    },
    loadingContainer: {
        padding: 40,
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 16,
        color: '#6B7280',
    },
    emptyContainer: {
        padding: 40,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#6B7280',
        marginTop: 12,
    },
    list: {
        padding: 0,
    },
    listItem: {
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
        alignItems: 'center',
    },
    itemContent: {
        flex: 1,
        marginRight: 12,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    itemName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        flex: 1,
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    activeBadge: {
        backgroundColor: '#D1FAE5',
    },
    inactiveBadge: {
        backgroundColor: '#F3F4F6',
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
    },
    activeText: {
        color: '#065F46',
    },
    inactiveText: {
        color: '#6B7280',
    },
    itemDetails: {
        gap: 6,
    },
    itemActions: {
        flexDirection: 'row',
        gap: 8,
    },
    actionButton: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#F9FAFB',
    },
    modalContent: {
        padding: 20,
    },
    modalSubtitle: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 20,
    },
    detailTabsContainer: {
        marginBottom: 16,
    },
    detailTabs: {
        flexDirection: 'row',
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        padding: 4,
    },
    detailTab: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6,
        alignItems: 'center',
    },
    activeDetailTab: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    detailTabText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6B7280',
    },
    activeDetailTabText: {
        color: '#1F2937',
    },
    detailSearchContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 16,
        alignItems: 'center',
    },
    showAllButton: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
    },
    showAllButtonText: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '500',
    },
    detailDataContainer: {
        flex: 1,
        minHeight: 300,
    },
    detailLoadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailLoadingText: {
        fontSize: 16,
        color: '#6B7280',
    },
    detailEmptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailEmptyText: {
        fontSize: 16,
        color: '#6B7280',
        marginTop: 12,
    },
    detailCountText: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 12,
    },
    detailScrollView: {
        flex: 1,
        maxHeight: 300,
    },
    detailItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    detailItemText: {
        flex: 1,
        fontSize: 14,
        color: '#1F2937',
        marginRight: 12,
    },
    detailItemDate: {
        fontSize: 12,
        color: '#6B7280',
    },
    showMoreButton: {
        marginTop: 12,
        paddingVertical: 8,
        alignItems: 'center',
    },
    showMoreButtonText: {
        fontSize: 14,
        color: '#3B82F6',
        fontWeight: '500',
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    detailText: {
        fontSize: 14,
        color: '#6B7280',
        flex: 1,
    },
}); 