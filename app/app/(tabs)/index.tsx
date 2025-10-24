import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect, useMemo } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import ApiService, { Parking, ParkingSlot } from '../../lib/api';
import { useAuth } from '../../contexts/AuthContext';

import StatCard from '@/components/dashboard/StatCard';
import StatisticsTable from '@/components/dashboard/StatisticsTable';
import Card from '@/components/ui/Card';

interface ParkingStat {
    parkingId: string;
    parkingName: string;
    total: number;
    occupied: number;
    available: number;
    maintenance: number;
    occupancyRate: number;
}

export default function DashboardScreen() {
    const { logout } = useAuth();
    const [statsData, setStatsData] = useState<any>(null);
    const [parkings, setParkings] = useState<Parking[]>([]);
    const [slots, setSlots] = useState<ParkingSlot[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadData = async () => {
        try {
            setError(null);
            const [statsResponse, parkingsResponse, slotsResponse] = await Promise.all([
                ApiService.getStatistics(),
                ApiService.getParkings(),
                ApiService.getParkingSlots()
            ]);

            if (statsResponse.data) {
                setStatsData(statsResponse.data);
            }
            if (parkingsResponse.data) {
                setParkings(parkingsResponse.data);
            }
            if (slotsResponse.data) {
                setSlots(slotsResponse.data);
            }
        } catch (e: any) {
            setError('Erro ao carregar dados');
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await loadData();
        setRefreshing(false);
    };

    const handleLogout = async () => {
        Alert.alert(
            'Sair',
            'Tem certeza que deseja sair da sua conta?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Sair',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await logout();
                            router.replace('/login');
                        } catch (error) {
                            Alert.alert('Erro', 'Não foi possível fazer logout');
                        }
                    },
                },
            ]
        );
    };

    useEffect(() => {
        loadData();
    }, []);

    // Calcular estatísticas dos estacionamentos
    const parkingStats: ParkingStat[] = useMemo(() => {
        return parkings.map(parking => {
            const parkingSlots = slots.filter(slot => slot.parkingId === parking.id);
            const total = parkingSlots.length;
            const occupied = parkingSlots.filter(slot => slot.isActive && !slot.isAvailable).length;
            const available = parkingSlots.filter(slot => slot.isActive && slot.isAvailable).length;
            const maintenance = parkingSlots.filter(slot => !slot.isActive).length;
            const occupancyRate = total > 0 ? Math.round((occupied / total) * 100) : 0;

            return {
                parkingId: parking.id,
                parkingName: parking.name,
                total,
                occupied,
                available,
                maintenance,
                occupancyRate
            };
        });
    }, [parkings, slots]);

    const alerts = [
        {
            id: 1,
            type: 'warning' as const,
            message: 'Vaga B03 em manutenção há 2 horas',
            time: '5 min atrás'
        },
        {
            id: 2,
            type: 'info' as const,
            message: 'Manutenção programada para hoje às 22h',
            time: '1 hora atrás'
        },
        {
            id: 3,
            type: 'error' as const,
            message: 'Sensor da vaga A15 com falha',
            time: '2 horas atrás'
        }
    ];

    const quickActions = [
        {
            id: '1',
            title: 'Nova Reserva',
            icon: 'calendar' as keyof typeof Ionicons.glyphMap,
            color: 'primary' as const,
            onPress: () => Alert.alert('Nova Reserva', 'Funcionalidade em desenvolvimento')
        },
        {
            id: '2',
            title: 'Relatório',
            icon: 'bar-chart' as keyof typeof Ionicons.glyphMap,
            color: 'secondary' as const,
            onPress: () => Alert.alert('Relatório', 'Funcionalidade em desenvolvimento')
        },
        {
            id: '3',
            title: 'Configurações',
            icon: 'settings' as keyof typeof Ionicons.glyphMap,
            color: 'secondary' as const,
            onPress: () => Alert.alert('Configurações', 'Funcionalidade em desenvolvimento')
        },
        {
            id: '4',
            title: 'Suporte',
            icon: 'help-circle' as keyof typeof Ionicons.glyphMap,
            color: 'secondary' as const,
            onPress: () => Alert.alert('Suporte', 'Funcionalidade em desenvolvimento')
        }
    ];

    const stats = useMemo(() => {
        if (!statsData) {
            return [
                { title: 'Vagas Totais', value: '0', icon: 'car' as keyof typeof Ionicons.glyphMap, color: 'blue' as const },
                { title: 'Vagas Ocupadas', value: '0', icon: 'location' as keyof typeof Ionicons.glyphMap, color: 'green' as const },
                { title: 'Sensores Ativos', value: '0', icon: 'people' as keyof typeof Ionicons.glyphMap, color: 'purple' as const },
                { title: 'Estacionamentos Ativos', value: '0', icon: 'card' as keyof typeof Ionicons.glyphMap, color: 'yellow' as const }
            ];
        }

        return [
            {
                title: 'Vagas Totais',
                value: String(statsData.parkingSlots?.total || 0),
                icon: 'car' as keyof typeof Ionicons.glyphMap,
                color: 'blue' as const
            },
            {
                title: 'Vagas Ocupadas',
                value: String(statsData.parkingSlots?.occupied || 0),
                icon: 'location' as keyof typeof Ionicons.glyphMap,
                color: 'green' as const
            },
            {
                title: 'Sensores Ativos',
                value: String(statsData.sensors?.active || 0),
                icon: 'people' as keyof typeof Ionicons.glyphMap,
                color: 'purple' as const
            },
            {
                title: 'Estacionamentos Ativos',
                value: String(statsData.parkings?.active || 0),
                icon: 'card' as keyof typeof Ionicons.glyphMap,
                color: 'yellow' as const
            }
        ];
    }, [statsData]);

    // Dados para gráficos
    const chartData = useMemo(() => {
        const total = slots.length;
        const livre = slots.filter(s => s.isActive && s.isAvailable).length;
        const ocupada = slots.filter(s => s.isActive && !s.isAvailable).length;
        const manutencao = slots.filter(s => !s.isActive).length;

        return {
            pieData: [
                { name: "Livre", value: livre, color: "#10b981" },
                { name: "Ocupada", value: ocupada, color: "#ef4444" },
                { name: "Manutenção", value: manutencao, color: "#f59e0b" }
            ],
            barData: parkingStats.map(stat => ({
                estacionamento: stat.parkingName,
                ocupacao: stat.occupancyRate,
                total: stat.total,
                ocupadas: stat.occupied,
                livres: stat.available
            }))
        };
    }, [slots, parkingStats]);

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Carregando dashboard...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView 
                style={styles.scrollView} 
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.headerTitle}>Dashboard</Text>
                        <Text style={styles.headerSubtitle}>Visão geral dos estacionamentos</Text>
                    </View>
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Ionicons name="log-out-outline" size={24} color="#EF4444" />
                    </TouchableOpacity>
                </View>

                {error && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                        <TouchableOpacity style={styles.retryButton} onPress={loadData}>
                            <Text style={styles.retryButtonText}>Tentar novamente</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Stats Grid */}
                <View style={styles.statsGrid}>
                    {stats.map((stat, index) => (
                        <StatCard
                            key={index}
                            title={stat.title}
                            value={stat.value}
                            icon={stat.icon}
                            color={stat.color}
                        />
                    ))}
                </View>

                {/* Statistics Table */}
                <StatisticsTable stats={parkingStats} />

                {/* Charts Section */}
                <View style={styles.chartsContainer}>
                    {/* Distribution Chart */}
                    <Card style={styles.chartCard}>
                        <Text style={styles.chartTitle}>Distribuição de Status das Vagas</Text>
                        <View style={styles.pieChartContainer}>
                            {chartData.pieData.map((item, index) => (
                                <View key={index} style={styles.pieChartItem}>
                                    <View style={[styles.pieChartColor, { backgroundColor: item.color }]} />
                                    <Text style={styles.pieChartLabel}>{item.name}: {item.value}</Text>
                                </View>
                            ))}
                        </View>
                    </Card>

                    {/* Occupancy by Parking Chart */}
                    <Card style={styles.chartCard}>
                        <Text style={styles.chartTitle}>Taxa de Ocupação por Estacionamento</Text>
                        <View style={styles.barChartContainer}>
                            {chartData.barData.map((item, index) => (
                                <View key={index} style={styles.barChartItem}>
                                    <Text style={styles.barChartLabel}>{item.estacionamento}</Text>
                                    <View style={styles.barChartBar}>
                                        <View 
                                            style={[
                                                styles.barChartFill, 
                                                { width: `${Math.min(item.ocupacao, 100)}%` }
                                            ]} 
                                        />
                                    </View>
                                    <Text style={styles.barChartValue}>{item.ocupacao}%</Text>
                                </View>
                            ))}
                        </View>
                    </Card>
                </View>

                {/* Alerts Section */}
                <View style={styles.alertsContainer}>
                    <Card style={styles.alertCard}>
                        <Text style={styles.alertTitle}>Alertas</Text>
                        <View style={styles.alertsList}>
                            {alerts.map((alert) => (
                                <View key={alert.id} style={styles.alertItem}>
                                    <Ionicons 
                                        name={alert.type === 'warning' ? 'warning' : alert.type === 'error' ? 'close-circle' : 'information-circle'} 
                                        size={20} 
                                        color={alert.type === 'warning' ? '#F59E0B' : alert.type === 'error' ? '#EF4444' : '#3B82F6'} 
                                    />
                                    <View style={styles.alertContent}>
                                        <Text style={styles.alertMessage}>{alert.message}</Text>
                                        <Text style={styles.alertTime}>{alert.time}</Text>
                                    </View>
                                </View>
                            ))}
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
        backgroundColor: '#F8FAFC',
    },
    scrollView: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#6B7280',
        marginTop: 2,
    },
    logoutButton: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#FEF2F2',
        borderWidth: 1,
        borderColor: '#FECACA',
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 16,
        justifyContent: 'space-between',
    },
    actionsRow: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        justifyContent: 'space-between',
    },
    actionsColumn: {
        flex: 1,
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
    chartsContainer: {
        padding: 16,
        gap: 16,
    },
    chartCard: {
        padding: 20,
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 16,
    },
    pieChartContainer: {
        gap: 12,
    },
    pieChartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    pieChartColor: {
        width: 16,
        height: 16,
        borderRadius: 8,
    },
    pieChartLabel: {
        fontSize: 14,
        color: '#6B7280',
    },
    barChartContainer: {
        gap: 12,
    },
    barChartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    barChartLabel: {
        fontSize: 12,
        color: '#6B7280',
        minWidth: 80,
    },
    barChartBar: {
        flex: 1,
        height: 8,
        backgroundColor: '#E5E7EB',
        borderRadius: 4,
        overflow: 'hidden',
    },
    barChartFill: {
        height: '100%',
        backgroundColor: '#3B82F6',
        borderRadius: 4,
    },
    barChartValue: {
        fontSize: 12,
        fontWeight: '600',
        color: '#1F2937',
        minWidth: 40,
        textAlign: 'right',
    },
    alertsContainer: {
        padding: 16,
        gap: 16,
    },
    alertCard: {
        padding: 20,
    },
    alertTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 16,
    },
    alertsList: {
        gap: 12,
    },
    alertItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
        padding: 12,
        backgroundColor: '#FEF3C7',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#FDE68A',
    },
    alertContent: {
        flex: 1,
    },
    alertMessage: {
        fontSize: 14,
        color: '#92400E',
        marginBottom: 4,
    },
    alertTime: {
        fontSize: 12,
        color: '#A16207',
    },
    actionsCard: {
        padding: 20,
    },
    actionsTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 16,
    },
    actionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    actionButton: {
        flex: 1,
        minWidth: 140,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: 12,
        borderRadius: 8,
    },
    actionText: {
        fontSize: 14,
        fontWeight: '500',
    },
});
