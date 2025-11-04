import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect, useMemo } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View, RefreshControl, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import ApiService, { Parking, ParkingSlot } from '../../lib/api';
import { useAuth } from '../../contexts/AuthContext';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryPie, VictoryLine } from "victory-native";

import StatCard from '@/components/dashboard/StatCard';
import StatisticsTable from '@/components/dashboard/StatisticsTable';
import StatisticsCards from '@/components/dashboard/StatisticsCards';
import Card from '@/components/ui/Card';
import { calculateStatistics, calculateParkingStats, calculateTrends } from '../../lib/statistics';

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

    // Dados para gráficos e estatísticas
    const chartData = useMemo(() => {
        const total = slots.length;
        const livre = slots.filter(s => s.isActive && s.isAvailable).length;
        const ocupada = slots.filter(s => s.isActive && !s.isAvailable).length;
        const manutencao = slots.filter(s => !s.isActive).length;

        // Calcular estatísticas avançadas
        const occupancyRates = parkingStats.map(stat => stat.occupancyRate);
        const occupancyStats = calculateStatistics(occupancyRates);
        const occupancyTrend = calculateTrends(occupancyRates);

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
            })),
            occupancyStats,
            occupancyTrend
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

                {/* Statistics Cards */}
                <View style={styles.statisticsCardsContainer}>
                    <StatisticsCards 
                        stats={chartData.occupancyStats} 
                        title="Estatísticas de Ocupação"
                        trend={chartData.occupancyTrend}
                    />
                </View>

                {/* Statistics Table */}
                <StatisticsTable stats={parkingStats} />

                {/* Charts Section */}
                <View style={styles.chartsContainer}>
                    {/* Distribution Chart (Pizza) */}
                    <Card style={styles.chartCard}>
                        <Text style={styles.chartTitle}>Distribuição de Status das Vagas</Text>
                        <View style={styles.pieChartContainer}>
                            {chartData.pieData.length > 0 ? (
                                <>
                                    <VictoryPie
                                        data={chartData.pieData.map((item) => ({
                                            x: item.name,
                                            y: item.value,
                                        }))}
                                        colorScale={chartData.pieData.map(item => item.color)}
                                        innerRadius={50}
                                        labelRadius={(props) => (typeof props.innerRadius === 'number' ? props.innerRadius + 20 : 70)}
                                        style={{
                                            labels: { fill: '#fff', fontSize: 12, fontWeight: 'bold' }
                                        }}
                                        animate={{
                                            duration: 800,
                                            easing: 'bounce'
                                        }}
                                    />
                                    <View style={styles.pieChartLegend}>
                                        {chartData.pieData.map((item, index) => {
                                            const total = chartData.pieData.reduce((sum, d) => sum + d.value, 0);
                                            const percentage = total > 0 ? (item.value / total) * 100 : 0;
                                            return (
                                                <View key={index} style={styles.legendItem}>
                                                    <View style={[styles.legendColor, { backgroundColor: item.color }]} />
                                                    <Text style={styles.legendLabel}>{item.name}</Text>
                                                    <Text style={styles.legendValue}>{item.value} ({percentage.toFixed(1)}%)</Text>
                                                </View>
                                            );
                                        })}
                                    </View>
                                </>
                            ) : (
                                <View style={styles.emptyChartContainer}>
                                    <Text style={styles.emptyChartText}>Nenhum dado disponível</Text>
                                </View>
                            )}
                        </View>
                    </Card>

                    {/* Occupancy by Parking Chart (Barras) */}
                    <Card style={styles.chartCard}>
                        <Text style={styles.chartTitle}>Taxa de Ocupação por Estacionamento</Text>
                        <View style={styles.barChartContainer}>
                            {chartData.barData.length > 0 ? (
                                <>
                                    <VictoryChart
                                        theme={VictoryTheme.material}
                                        domainPadding={{ x: 20 }}
                                        height={250}
                                    >
                                        <VictoryAxis
                                            tickFormat={(t: string) => t.substring(0, 3)}
                                            style={{
                                                axis: { stroke: '#ccc' },
                                                ticks: { stroke: '#ccc' },
                                                tickLabels: { fontSize: 10, fill: '#666' }
                                            }}
                                        />
                                        <VictoryAxis
                                            dependentAxis
                                            style={{
                                                axis: { stroke: '#ccc' },
                                                ticks: { stroke: '#ccc' },
                                                tickLabels: { fontSize: 10, fill: '#666' }
                                            }}
                                        />
                                        <VictoryBar
                                            data={chartData.barData.map(item => ({
                                                x: item.estacionamento.substring(0, 10),
                                                y: item.ocupacao,
                                                fill: item.ocupacao >= 80 ? '#EF4444' : item.ocupacao >= 60 ? '#F59E0B' : '#10B981',
                                            }))}
                                            style={{
                                                data: {
                                                    fill: ({ datum }) => datum.fill,
                                                }
                                            }}
                                            animate={{
                                                duration: 800,
                                                easing: 'bounce'
                                            }}
                                        />
                                    </VictoryChart>
                                    <View style={styles.barChartLabels}>
                                        {chartData.barData.map((item, index) => (
                                            <View key={index} style={styles.barChartLabelItem}>
                                                <Text style={styles.barChartLabel} numberOfLines={1}>
                                                    {item.estacionamento}
                                                </Text>
                                                <Text style={styles.barChartSubLabel}>
                                                    {item.ocupadas}/{item.total} - {item.ocupacao}%
                                                </Text>
                                            </View>
                                        ))}
                                    </View>
                                </>
                            ) : (
                                <View style={styles.emptyChartContainer}>
                                    <Text style={styles.emptyChartText}>Nenhum dado disponível</Text>
                                </View>
                            )}
                        </View>
                    </Card>

                    {/* Line Chart - Tendência de Ocupação */}
                    {chartData.barData.length > 0 && (
                        <Card style={styles.chartCard}>
                            <Text style={styles.chartTitle}>Tendência de Ocupação</Text>
                            <View style={styles.lineChartContainer}>
                                <VictoryChart
                                    theme={VictoryTheme.material}
                                    height={250}
                                >
                                    <VictoryAxis
                                        tickFormat={(t: any, i: number) => chartData.barData[i]?.estacionamento.substring(0, 3) || ''}
                                        style={{
                                            axis: { stroke: '#ccc' },
                                            ticks: { stroke: '#ccc' },
                                            tickLabels: { fontSize: 10, fill: '#666' }
                                        }}
                                    />
                                    <VictoryAxis
                                        dependentAxis
                                        style={{
                                            axis: { stroke: '#ccc' },
                                            ticks: { stroke: '#ccc' },
                                            tickLabels: { fontSize: 10, fill: '#666' }
                                        }}
                                    />
                                    <VictoryLine
                                        data={chartData.barData.map((item, index) => ({
                                            x: index + 1,
                                            y: item.ocupacao,
                                        }))}
                                        style={{
                                            data: { stroke: '#3b82f6', strokeWidth: 2 },
                                            parent: { border: '1px solid #ccc' }
                                        }}
                                        animate={{
                                            duration: 800,
                                            easing: 'bounce'
                                        }}
                                    />
                                </VictoryChart>
                            </View>
                        </Card>
                    )}

                    {/* Progress Chart - Ocupação Geral */}
                    {chartData.pieData.length > 0 && (
                        <Card style={styles.chartCardLast}>
                            <Text style={styles.chartTitle}>Ocupação Geral do Sistema</Text>
                            <View style={styles.progressChartContainer}>
                                {(() => {
                                    const total = chartData.pieData.reduce((sum, d) => sum + d.value, 0);
                                    const ocupada = chartData.pieData.find(d => d.name === 'Ocupada')?.value || 0;
                                    const ocupacaoGeral = total > 0 ? ocupada / total : 0;
                                    
                                    return (
                                        <>
                                            <VictoryPie
                                                data={[
                                                    { x: 'Ocupadas', y: ocupacaoGeral * 100 },
                                                    { x: 'Livres', y: (1 - ocupacaoGeral) * 100 },
                                                ]}
                                                colorScale={['#3b82f6', '#e5e7eb']}
                                                innerRadius={80}
                                                width={250}
                                                height={250}
                                                style={{
                                                    labels: { fill: 'transparent' }
                                                }}
                                                animate={{
                                                    duration: 800,
                                                    easing: 'bounce'
                                                }}
                                            />
                                            <View style={styles.progressChartCenter}>
                                                <Text style={styles.progressChartText}>
                                                    {(ocupacaoGeral * 100).toFixed(1)}%
                                                </Text>
                                                <Text style={styles.progressChartSubText}>
                                                    das vagas ocupadas
                                                </Text>
                                            </View>
                                        </>
                                    );
                                })()}
                            </View>
                        </Card>
                    )}
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
    statisticsCardsContainer: {
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    chartsContainer: {
        padding: 16,
    },
    chartCard: {
        padding: 20,
        marginBottom: 16,
    },
    chartCardLast: {
        padding: 20,
        marginBottom: 0,
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 16,
    },
    pieChartContainer: {
        marginTop: 8,
        alignItems: 'center',
    },
    pieChart: {
        height: 250,
        width: '100%',
        alignItems: 'center',
    },
    pieChartLegend: {
        marginTop: 16,
        width: '100%',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    legendColor: {
        width: 16,
        height: 16,
        borderRadius: 8,
        marginRight: 8,
    },
    legendLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#1F2937',
        flex: 1,
    },
    legendValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6B7280',
    },
    barChartContainer: {
        marginTop: 8,
    },
    barChart: {
        width: '100%',
    },
    barChartLabels: {
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    },
    barChartLabelItem: {
        alignItems: 'center',
        marginBottom: 8,
        minWidth: 80,
    },
    barChartLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#1F2937',
        textAlign: 'center',
    },
    barChartSubLabel: {
        fontSize: 10,
        color: '#6B7280',
        marginTop: 2,
        textAlign: 'center',
    },
    lineChartContainer: {
        marginTop: 8,
    },
    lineChart: {
        height: 200,
        width: '100%',
    },
    lineChartLabels: {
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    lineChartLabel: {
        fontSize: 11,
        color: '#6B7280',
        textAlign: 'center',
    },
    progressChartContainer: {
        marginTop: 8,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    progressChartCenter: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressChartText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#3b82f6',
        textAlign: 'center',
    },
    progressChartSubText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6B7280',
        textAlign: 'center',
        marginTop: 4,
    },
    emptyChartContainer: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyChartText: {
        fontSize: 14,
        color: '#6B7280',
        fontStyle: 'italic',
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
