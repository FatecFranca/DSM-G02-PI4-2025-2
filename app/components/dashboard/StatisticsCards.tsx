import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../ui/Card';
import { StatisticsResult } from '../../lib/statistics';

interface StatisticsCardsProps {
    stats: StatisticsResult;
    title: string;
    trend?: {
        trend: 'up' | 'down' | 'stable';
        percentage: number;
    };
}

export default function StatisticsCards({ stats, title, trend }: StatisticsCardsProps) {
    const getTrendIcon = () => {
        if (!trend) return <Ionicons name="remove-outline" size={16} color="#9CA3AF" />;
        
        switch (trend.trend) {
            case 'up':
                return <Ionicons name="trending-up-outline" size={16} color="#10B981" />;
            case 'down':
                return <Ionicons name="trending-down-outline" size={16} color="#EF4444" />;
            default:
                return <Ionicons name="remove-outline" size={16} color="#9CA3AF" />;
        }
    };

    const getTrendColor = () => {
        if (!trend) return '#6B7280';
        
        switch (trend.trend) {
            case 'up':
                return '#10B981';
            case 'down':
                return '#EF4444';
            default:
                return '#6B7280';
        }
    };

    return (
        <Card style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                {trend && (
                    <View style={styles.trendContainer}>
                        {getTrendIcon()}
                        <Text style={[styles.trendText, { color: getTrendColor(), marginLeft: 4 }]}>
                            {trend.percentage > 0 ? '+' : ''}{trend.percentage}%
                        </Text>
                    </View>
                )}
            </View>

            {/* Estatísticas Básicas */}
            <View style={styles.basicStatsGrid}>
                <View style={[styles.statCard, styles.blueCard]}>
                    <View style={styles.statHeader}>
                        <Ionicons name="calculator-outline" size={16} color="#2563EB" />
                        <Text style={styles.statLabel}>Média</Text>
                    </View>
                    <Text style={styles.statValue}>{stats.mean.toFixed(2)}</Text>
                </View>

                <View style={[styles.statCard, styles.greenCard]}>
                    <View style={styles.statHeader}>
                        <Ionicons name="target-outline" size={16} color="#10B981" />
                        <Text style={styles.statLabel}>Mediana</Text>
                    </View>
                    <Text style={styles.statValue}>{stats.median.toFixed(2)}</Text>
                </View>

                <View style={[styles.statCard, styles.purpleCard]}>
                    <View style={styles.statHeader}>
                        <Ionicons name="stats-chart" size={16} color="#9333EA" />
                        <Text style={styles.statLabel}>Moda</Text>
                    </View>
                    <Text style={styles.statValue}>{stats.mode.toFixed(2)}</Text>
                </View>

                <View style={[styles.statCard, styles.orangeCard]}>
                    <View style={styles.statHeader}>
                        <Ionicons name="pulse-outline" size={16} color="#F97316" />
                        <Text style={styles.statLabel}>Desvio Padrão</Text>
                    </View>
                    <Text style={styles.statValue}>{stats.standardDeviation.toFixed(2)}</Text>
                </View>
            </View>

            {/* Estatísticas Avançadas */}
            <View style={styles.advancedStatsGrid}>
                <View style={[styles.statCard, styles.indigoCard]}>
                    <View style={styles.statHeader}>
                        <Ionicons name="swap-vertical-outline" size={16} color="#6366F1" />
                        <Text style={styles.statLabel}>Assimetria</Text>
                    </View>
                    <Text style={styles.statValue}>{stats.skewness.toFixed(2)}</Text>
                    <Text style={styles.statHint}>
                        {stats.skewness > 0 ? 'Assimétrica à direita' : stats.skewness < 0 ? 'Assimétrica à esquerda' : 'Simétrica'}
                    </Text>
                </View>

                <View style={[styles.statCard, styles.pinkCard]}>
                    <View style={styles.statHeader}>
                        <Ionicons name="flash-outline" size={16} color="#EC4899" />
                        <Text style={styles.statLabel}>Curtose</Text>
                    </View>
                    <Text style={styles.statValue}>{stats.kurtosis.toFixed(2)}</Text>
                    <Text style={styles.statHint}>
                        {stats.kurtosis > 0 ? 'Leptocúrtica' : stats.kurtosis < 0 ? 'Platicúrtica' : 'Mesocúrtica'}
                    </Text>
                </View>

                {stats.probability && (
                    <View style={[styles.statCard, styles.tealCard]}>
                        <View style={styles.statHeader}>
                            <Ionicons name="target-outline" size={16} color="#14B8A6" />
                            <Text style={styles.statLabel}>Probabilidade</Text>
                        </View>
                        <Text style={styles.statValue}>{(stats.probability.cumulative * 100).toFixed(1)}%</Text>
                        <Text style={styles.statHint}>Percentil: {stats.probability.percentile.toFixed(1)}%</Text>
                    </View>
                )}
            </View>

            {/* Regressão e Inferência */}
            <View style={styles.regressionContainer}>
                {stats.regression && (
                    <View style={[styles.statCard, styles.cyanCard, styles.wideCard, { marginRight: 0 }]}>
                        <View style={styles.statHeader}>
                            <Ionicons name="trending-up-outline" size={16} color="#06B6D4" />
                            <Text style={styles.statLabel}>Regressão Linear</Text>
                        </View>
                        <View style={styles.regressionRow}>
                            <Text style={styles.regressionLabel}>Coeficiente Angular:</Text>
                            <Text style={styles.regressionValue}>{stats.regression.slope.toFixed(3)}</Text>
                        </View>
                        <View style={styles.regressionRow}>
                            <Text style={styles.regressionLabel}>Intercepto:</Text>
                            <Text style={styles.regressionValue}>{stats.regression.intercept.toFixed(3)}</Text>
                        </View>
                        <View style={styles.regressionRow}>
                            <Text style={styles.regressionLabel}>R²:</Text>
                            <Text style={styles.regressionValue}>{(stats.regression.rSquared * 100).toFixed(1)}%</Text>
                        </View>
                    </View>
                )}

                {stats.inference && (
                    <View style={[styles.statCard, styles.amberCard, styles.wideCard, { marginRight: 0 }]}>
                        <View style={styles.statHeader}>
                            <Ionicons name="notifications-outline" size={16} color="#F59E0B" />
                            <Text style={styles.statLabel}>Inferência Estatística</Text>
                        </View>
                        <View style={styles.regressionRow}>
                            <Text style={styles.regressionLabel}>Intervalo de Confiança (95%):</Text>
                            <Text style={styles.regressionValue}>
                                [{stats.inference.confidenceInterval[0].toFixed(2)}, {stats.inference.confidenceInterval[1].toFixed(2)}]
                            </Text>
                        </View>
                        <View style={styles.regressionRow}>
                            <Text style={styles.regressionLabel}>Margem de Erro:</Text>
                            <Text style={styles.regressionValue}>±{stats.inference.marginOfError.toFixed(2)}</Text>
                        </View>
                    </View>
                )}
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        marginBottom: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
    },
    trendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    trendText: {
        fontSize: 14,
        fontWeight: '500',
    },
    basicStatsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 16,
    },
    advancedStatsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 16,
    },
    statCard: {
        flex: 1,
        minWidth: '45%',
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        marginRight: 12,
        marginBottom: 12,
    },
    wideCard: {
        minWidth: '100%',
    },
    statHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    statLabel: {
        fontSize: 12,
        fontWeight: '500',
        marginLeft: 6,
    },

    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    statHint: {
        fontSize: 10,
        marginTop: 4,
    },
    blueCard: {
        backgroundColor: '#EFF6FF',
        borderColor: '#BFDBFE',
    },
    greenCard: {
        backgroundColor: '#F0FDF4',
        borderColor: '#BBF7D0',
    },
    purpleCard: {
        backgroundColor: '#FAF5FF',
        borderColor: '#E9D5FF',
    },
    orangeCard: {
        backgroundColor: '#FFF7ED',
        borderColor: '#FED7AA',
    },
    indigoCard: {
        backgroundColor: '#EEF2FF',
        borderColor: '#C7D2FE',
    },
    pinkCard: {
        backgroundColor: '#FDF2F8',
        borderColor: '#FBCFE8',
    },
    tealCard: {
        backgroundColor: '#F0FDFA',
        borderColor: '#99F6E4',
    },
    cyanCard: {
        backgroundColor: '#ECFEFF',
        borderColor: '#A5F3FC',
    },
    amberCard: {
        backgroundColor: '#FFFBEB',
        borderColor: '#FDE68A',
    },
    regressionContainer: {
        marginTop: 0,
    },
    regressionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    regressionLabel: {
        fontSize: 11,
        flex: 1,
    },
    regressionValue: {
        fontSize: 12,
        fontWeight: '600',
    },
});
