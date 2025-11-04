import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useMemo, useState } from 'react';
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
import Card from '../../components/ui/Card';
import FilterPicker from '../../components/ui/FilterPicker';
import StatCard from '../../components/ui/StatCard';

type StatisticsResponse = {
    parkings: { total: number; active: number };
    parkingSlots: { total: number; available: number; occupied: number };
    sensors: { total: number; active: number };
    parkingSensors: { total: number; active: number };
    dataPoints: { sensorsData: number; parkingSensorsData: number };
};

type ContactMessage = {
    id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
};

export default function RelatoriosPage() {
    const [selectedPeriod, setSelectedPeriod] = useState("week");
    const [stats, setStats] = useState<StatisticsResponse | null>(null);
    const [parkings, setParkings] = useState<Parking[]>([]);
    const [slots, setSlots] = useState<ParkingSlot[]>([]);
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadData = async () => {

        try {
            setError(null);
            const [statsResponse, parkingsResponse, slotsResponse, messagesResponse] = await Promise.all([
                ApiService.getStatistics(),
                ApiService.getParkings(),
                ApiService.getParkingSlots(),
                ApiService.getContactMessages()
            ]);

            if (statsResponse.data) {
                setStats(statsResponse.data as any);
            }
            if (parkingsResponse.data) {
                setParkings(parkingsResponse.data);
            }
            if (slotsResponse.data) {
                setSlots(slotsResponse.data);
            }
            if (messagesResponse.data) {
                setMessages(messagesResponse.data);
            }
        } catch (e: any) {
            setError('Erro ao carregar dados');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        await loadData();
        setRefreshing(false);
    };

    const occupancyByParking = useMemo(() => {
        const byId: Record<string, { name: string; total: number; occupied: number }> = {};
        parkings.forEach(p => { byId[p.id] = { name: p.name, total: 0, occupied: 0 }; });
        slots.forEach(s => {
            const group = byId[s.parkingId] || { name: s.parkingId, total: 0, occupied: 0 };
            group.total += 1;
            if (!s.isAvailable && s.isActive) group.occupied += 1;
            byId[s.parkingId] = group;
        });
        return Object.values(byId).map(g => ({ 
            label: g.name, 
            value: g.total ? Math.round((g.occupied / g.total) * 100) : 0 
        }));
    }, [parkings, slots]);

    const statusDistribution = useMemo(() => {
        const total = slots.length || 1;
        const manutencao = slots.filter(s => !s.isActive).length;
        const ocupada = slots.filter(s => s.isActive && !s.isAvailable).length;
        const livre = slots.filter(s => s.isActive && s.isAvailable).length;
        return [
            { label: "Livre", value: Math.round((livre / total) * 100), color: "#22C55E" },
            { label: "Ocupada", value: Math.round((ocupada / total) * 100), color: "#EF4444" },
            { label: "Manutenção", value: Math.round((manutencao / total) * 100), color: "#9CA3AF" },
        ];
    }, [slots]);

    const avgOccupancy = useMemo(() => {
        if (!stats) return 0;
        const total = stats.parkingSlots.total || 1;
        return Math.round((stats.parkingSlots.occupied / total) * 100);
    }, [stats]);



    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Carregando relatórios...</Text>
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
                    <View style={styles.headerTop}>
                        <View style={styles.headerLeft}>
                            <Text style={styles.title}>Relatórios</Text>
                            <Text style={styles.subtitle}>Analise o desempenho dos estacionamentos</Text>
                        </View>
                    </View>
                    <View style={styles.headerActions}>
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

                {/* Key Metrics */}
                <View style={styles.metricsContainer}>
                    <StatCard
                        label="Vagas Totais"
                        value={stats?.parkingSlots.total || 0}
                        color="#1F2937"
                        bgColor="#F3F4F6"
                    />
                    <StatCard
                        label="Disponíveis"
                        value={stats?.parkingSlots.available || 0}
                        color="#3B82F6"
                        bgColor="#EFF6FF"
                    />
                    <StatCard
                        label="Ocupadas"
                        value={stats?.parkingSlots.occupied || 0}
                        color="#8B5CF6"
                        bgColor="#F3E8FF"
                    />
                    <StatCard
                        label="Ocupação Média"
                        value={avgOccupancy}
                        color="#F59E0B"
                        bgColor="#FEF3C7"
                    />
                </View>

                {/* Charts */}
                <View style={styles.chartsContainer}>
                    {/* Ocupação por Estacionamento */}
                    <Card style={styles.chartCard}>
                        <View style={styles.chartHeader}>
                            <Text style={styles.chartTitle}>Ocupação por Estacionamento</Text>
                            <TouchableOpacity style={styles.chartActionButton} activeOpacity={0.7}>
                                <Text style={styles.chartActionText}>Exportar</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={styles.chartContent}>
                            {occupancyByParking.map((item, index) => (
                                <View key={index} style={styles.chartItem}>
                                    <View style={styles.chartBarContainer}>
                                        <View style={styles.chartBar}>
                                            <View 
                                                style={[styles.chartBarFill, { width: `${item.value}%` }]}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.chartItemInfo}>
                                        <Text style={styles.chartItemLabel} numberOfLines={1}>
                                            {item.label}
                                        </Text>
                                        <Text style={styles.chartItemValue}>{item.value}%</Text>
                                    </View>
                                </View>
                            ))}
                            {occupancyByParking.length === 0 && (
                                <Text style={styles.emptyChartText}>
                                    Sem dados de ocupação por estacionamento.
                                </Text>
                            )}
                        </View>
                    </Card>

                    {/* Distribuição de Status */}
                    <Card style={styles.chartCard}>
                        <View style={styles.chartHeader}>
                            <Text style={styles.chartTitle}>Distribuição de Status</Text>
                            <TouchableOpacity style={styles.chartActionButton} activeOpacity={0.7}>
                                <Text style={styles.chartActionText}>Exportar</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={styles.chartContent}>
                            {statusDistribution.map((item, index) => (
                                <View key={index} style={styles.chartItem}>
                                    <Text style={styles.chartItemLabel}>{item.label}</Text>
                                    <View style={styles.chartBarContainer}>
                                        <View style={styles.chartBar}>
                                            <View
                                                style={[
                                                    styles.chartBarFill,
                                                    { backgroundColor: item.color, width: `${item.value}%` }
                                                ]}
                                            />
                                        </View>
                                    </View>
                                    <Text style={styles.chartItemValue}>{item.value}%</Text>
                                </View>
                            ))}
                            {statusDistribution.length === 0 && (
                                <Text style={styles.emptyChartText}>
                                    Sem dados suficientes.
                                </Text>
                            )}
                        </View>
                    </Card>
                </View>

                {/* Tables */}
                <View style={styles.tablesContainer}>
                    {/* Estacionamentos */}
                    <Card style={styles.tableCard}>
                        <View style={styles.tableHeader}>
                            <Text style={styles.tableTitle}>Estacionamentos</Text>
                        </View>
                        <View style={styles.tableContent}>
                            {parkings.map((p) => {
                                const total = slots.filter(s => s.parkingId === p.id).length;
                                const ocup = slots.filter(s => s.parkingId === p.id && s.isActive && !s.isAvailable).length;
                                return (
                                    <View key={p.id} style={styles.tableRow}>
                                        <View style={styles.tableRowContent}>
                                            <Text style={styles.tableRowTitle}>{p.name}</Text>
                                            <Text style={styles.tableRowSubtitle}>{ocup}/{total} ocupadas</Text>
                                        </View>
                                    </View>
                                );
                            })}
                            {parkings.length === 0 && (
                                <Text style={styles.emptyTableText}>
                                    Nenhum estacionamento encontrado.
                                </Text>
                            )}
                        </View>
                    </Card>

                    {/* Mensagens Recentes */}
                    <Card style={styles.tableCard}>
                        <View style={styles.tableHeader}>
                            <Text style={styles.tableTitle}>Mensagens Recentes</Text>
                        </View>
                        <View style={styles.tableContent}>
                            {messages.slice(0, 6).map((msg) => (
                                <View key={msg.id} style={styles.tableRow}>
                                    <View style={styles.tableRowContent}>
                                        <View style={styles.messageHeader}>
                                            <Text style={styles.messageName} numberOfLines={1}>
                                                {msg.name}
                                            </Text>
                                            <Text style={styles.messageDate}>
                                                {new Date(msg.createdAt).toLocaleString("pt-BR", { 
                                                    dateStyle: "short", 
                                                    timeStyle: "short" 
                                                })}
                                            </Text>
                                        </View>
                                        <Text style={styles.messageEmail} numberOfLines={1}>
                                            {msg.email}
                                        </Text>
                                        <Text style={styles.messageText} numberOfLines={2}>
                                            {msg.message}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                            {messages.length === 0 && (
                                <Text style={styles.emptyTableText}>
                                    Nenhuma mensagem encontrada.
                                </Text>
                            )}
                        </View>
                    </Card>
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
    headerTop: {
        marginBottom: 16,
    },
    headerLeft: {
        flex: 1,
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
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        flexWrap: 'wrap',
        width: '100%',
    },
    filterWrapper: {
        flex: 1,
        minWidth: 140,
        maxWidth: 200,
    },
    exportButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
    },
    exportButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6B7280',
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
    metricsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        gap: 8,
        marginBottom: 20,
        flexWrap: 'wrap',
    },
    chartsContainer: {
        paddingHorizontal: 20,
        gap: 16,
        marginBottom: 20,
    },
    chartCard: {
        padding: 20,
    },
    chartHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
    },
    chartActionButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: '#F3F4F6',
        borderRadius: 6,
    },
    chartActionText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#6B7280',
    },
    chartContent: {
        gap: 16,
    },
    chartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    chartBarContainer: {
        flex: 1,
    },
    chartBar: {
        height: 8,
        backgroundColor: '#E5E7EB',
        borderRadius: 4,
        overflow: 'hidden',
    },
    chartBarFill: {
        height: '100%',
        backgroundColor: '#3B82F6',
        borderRadius: 4,
    },
    chartItemInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        minWidth: 80,
    },
    chartItemLabel: {
        fontSize: 12,
        color: '#6B7280',
        flex: 1,
    },
    chartItemValue: {
        fontSize: 12,
        fontWeight: '600',
        color: '#1F2937',
        minWidth: 30,
        textAlign: 'right',
    },
    emptyChartText: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
        fontStyle: 'italic',
    },
    tablesContainer: {
        paddingHorizontal: 20,
        gap: 16,
        marginBottom: 20,
    },
    tableCard: {
        padding: 20,
    },
    tableHeader: {
        marginBottom: 16,
    },
    tableTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
    },
    tableContent: {
        gap: 0,
    },
    tableRow: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    tableRowContent: {
        flex: 1,
    },
    tableRowTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#1F2937',
        marginBottom: 2,
    },
    tableRowSubtitle: {
        fontSize: 12,
        color: '#6B7280',
    },
    messageHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    messageName: {
        fontSize: 14,
        fontWeight: '500',
        color: '#1F2937',
        flex: 1,
    },
    messageDate: {
        fontSize: 12,
        color: '#6B7280',
    },
    messageEmail: {
        fontSize: 12,
        color: '#6B7280',
        marginBottom: 4,
    },
    messageText: {
        fontSize: 12,
        color: '#374151',
        lineHeight: 16,
    },
    emptyTableText: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
        fontStyle: 'italic',
        paddingVertical: 20,
    },
    exportCard: {
        margin: 20,
        padding: 20,
    },
    exportTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 16,
    },
    exportOptions: {
        gap: 12,
    },
    exportOption: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 12,
        backgroundColor: '#F9FAFB',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    exportOptionText: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '500',
    },
});
