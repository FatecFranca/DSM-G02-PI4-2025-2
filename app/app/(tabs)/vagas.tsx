import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ParkingSpot, { SpotStatus } from '../../components/parking/ParkingSpot';
import Button from '../../components/ui/Button';
import FilterPicker from '../../components/ui/FilterPicker';
import SearchInput from '../../components/ui/SearchInput';
import StatCard from '../../components/ui/StatCard';

const initialSpots: { id: string; status: SpotStatus; sector: string }[] = [
    { id: "A01", status: "livre", sector: "A" },
    { id: "A02", status: "ocupada", sector: "A" },
    { id: "A03", status: "reservada", sector: "A" },
    { id: "A04", status: "livre", sector: "A" },
    { id: "A05", status: "ocupada", sector: "A" },
    { id: "A06", status: "manutencao", sector: "A" },
    { id: "B01", status: "livre", sector: "B" },
    { id: "B02", status: "ocupada", sector: "B" },
    { id: "B03", status: "manutencao", sector: "B" },
    { id: "B04", status: "livre", sector: "B" },
    { id: "B05", status: "reservada", sector: "B" },
    { id: "B06", status: "ocupada", sector: "B" },
];

export default function ParkingSpotsPage() {
    const [spots, setSpots] = useState(initialSpots);
    const [filter, setFilter] = useState<SpotStatus | "todas">("todas");
    const [sector, setSector] = useState<"A" | "B" | "todos">("todos");
    const [searchTerm, setSearchTerm] = useState("");
    const [refreshing, setRefreshing] = useState(false);

    const filtered = useMemo(() => {
        return spots.filter((s) =>
            (filter === "todas" ? true : s.status === filter) &&
            (sector === "todos" ? true : s.sector === sector) &&
            (searchTerm === "" ? true : s.id.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [spots, filter, sector, searchTerm]);

    const counts = useMemo(() => {
        return {
            total: spots.length,
            livre: spots.filter((s) => s.status === "livre").length,
            ocupada: spots.filter((s) => s.status === "ocupada").length,
            reservada: spots.filter((s) => s.status === "reservada").length,
            manutencao: spots.filter((s) => s.status === "manutencao").length,
        };
    }, [spots]);

    const onRefresh = () => {
        setRefreshing(true);
        // Simulate API call
        setTimeout(() => {
            setSpots([...initialSpots]);
            setRefreshing(false);
        }, 1000);
    };

    const addSpot = () => {
        // ir para a tela de reserva
        router.push("/reserva");
    };

    const statusOptions = [
        { label: "Todos os Status", value: "todas" },
        { label: "Livres", value: "livre" },
        { label: "Ocupadas", value: "ocupada" },
        { label: "Reservadas", value: "reservada" },
        { label: "Manutenção", value: "manutencao" },
    ];

    const sectorOptions = [
        { label: "Todos Setores", value: "todos" },
        { label: "Setor A", value: "A" },
        { label: "Setor B", value: "B" },
    ];

    const legendItems = [
        { label: "Livre", color: "#22C55E" },
        { label: "Ocupada", color: "#EF4444" },
        { label: "Reservada", color: "#EAB308" },
        { label: "Manutenção", color: "#9CA3AF" },
    ];

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
                        <FilterPicker
                            value={filter}
                            onValueChange={(value) => setFilter(value as any)}
                            options={statusOptions}
                            placeholder="Status"
                        />

                        <FilterPicker
                            value={sector}
                            onValueChange={(value) => setSector(value as any)}
                            options={sectorOptions}
                            placeholder="Setor"
                        />
                    </View>

                    <View style={styles.actionButtons}>
                        <TouchableOpacity
                            style={styles.refreshButton}
                            onPress={onRefresh}
                            activeOpacity={0.7}
                        >
                            <Ionicons name="refresh" size={20} color="#6B7280" />
                        </TouchableOpacity>

                        <Button variant="primary" size="sm" onPress={addSpot}>
                            <Ionicons name="add" size={16} color="#FFFFFF" />
                            <Text style={styles.buttonText}>Adicionar</Text>
                        </Button>
                    </View>
                </View>

                {/* Parking Grid */}
                <View style={styles.parkingContainer}>
                    <View style={styles.parkingHeader}>
                        <View style={styles.legend}>
                            {legendItems.map((item, index) => (
                                <View key={index} style={styles.legendItem}>
                                    <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                                    <Text style={styles.legendText}>{item.label}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Setor A */}
                    <View style={styles.sectorContainer}>
                        <Text style={styles.sectorTitle}>Setor A</Text>
                        <View style={styles.spotsGrid}>
                            {filtered.filter((s) => s.sector === "A").map((s) => (
                                <View key={s.id} style={styles.spotWrapper}>
                                    <ParkingSpot id={s.id} status={s.status} />
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Setor B */}
                    <View style={styles.sectorContainer}>
                        <Text style={styles.sectorTitle}>Setor B</Text>
                        <View style={styles.spotsGrid}>
                            {filtered.filter((s) => s.sector === "B").map((s) => (
                                <View key={s.id} style={styles.spotWrapper}>
                                    <ParkingSpot id={s.id} status={s.status} />
                                </View>
                            ))}
                        </View>
                    </View>

                    {filtered.length === 0 && (
                        <View style={styles.emptyState}>
                            <Ionicons name="search-outline" size={48} color="#9CA3AF" />
                            <Text style={styles.emptyText}>
                                Nenhuma vaga encontrada com os filtros aplicados.
                            </Text>
                        </View>
                    )}
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
        gap: 8,
        marginBottom: 20,
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
        gap: 12,
        marginTop: 12,
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
        alignItems: 'center',
        marginBottom: 20,
    },
    parkingTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    legend: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    legendDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    legendText: {
        fontSize: 12,
        color: '#6B7280',
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
});
