import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

interface ParkingStat {
    parkingId: string;
    parkingName: string;
    total: number;
    occupied: number;
    available: number;
    maintenance: number;
    occupancyRate: number;
}

interface StatisticsTableProps {
    stats: ParkingStat[];
}

export default function StatisticsTable({ stats }: StatisticsTableProps) {
    const getOccupancyColor = (rate: number) => {
        if (rate >= 80) return '#DC2626'; // red
        if (rate >= 60) return '#D97706'; // yellow
        return '#059669'; // green
    };

    const getOccupancyBgColor = (rate: number) => {
        if (rate >= 80) return '#FEF2F2'; // red bg
        if (rate >= 60) return '#FFFBEB'; // yellow bg
        return '#F0FDF4'; // green bg
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Estatísticas Detalhadas por Estacionamento</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.table}>
                    {/* Header */}
                    <View style={styles.headerRow}>
                        <Text style={[styles.headerCell, styles.estacionamentoHeader]}>Estacionamento</Text>
                        <Text style={[styles.headerCell, styles.numberHeader]}>Total</Text>
                        <Text style={[styles.headerCell, styles.numberHeader]}>Ocupadas</Text>
                        <Text style={[styles.headerCell, styles.numberHeader]}>Livres</Text>
                        <Text style={[styles.headerCell, styles.numberHeader]}>Manutenção</Text>
                        <Text style={[styles.headerCell, styles.numberHeader]}>Taxa Ocupação</Text>
                    </View>
                    
                    {/* Rows */}
                    {stats.map((stat, index) => (
                        <View key={stat.parkingId} style={[
                            styles.row,
                            index % 2 === 0 ? styles.evenRow : styles.oddRow
                        ]}>
                            <Text style={[styles.cell, styles.estacionamentoCell]} numberOfLines={1}>
                                {stat.parkingName}
                            </Text>
                            <Text style={[styles.cell, styles.numberCell]}>{stat.total}</Text>
                            <Text style={[styles.cell, styles.numberCell, styles.occupiedText]}>
                                {stat.occupied}
                            </Text>
                            <Text style={[styles.cell, styles.numberCell, styles.availableText]}>
                                {stat.available}
                            </Text>
                            <Text style={[styles.cell, styles.numberCell, styles.maintenanceText]}>
                                {stat.maintenance}
                            </Text>
                            <View style={styles.occupancyContainer}>
                                <View style={[
                                    styles.occupancyBadge,
                                    { backgroundColor: getOccupancyBgColor(stat.occupancyRate) }
                                ]}>
                                    <Text style={[
                                        styles.occupancyText,
                                        { color: getOccupancyColor(stat.occupancyRate) }
                                    ]}>
                                        {stat.occupancyRate}%
                                    </Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 16,
    },
    table: {
        minWidth: 500,
    },
    headerRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        paddingBottom: 12,
        marginBottom: 8,
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    evenRow: {
        backgroundColor: '#F9FAFB',
    },
    oddRow: {
        backgroundColor: '#FFFFFF',
    },
    headerCell: {
        fontSize: 12,
        fontWeight: '600',
        color: '#374151',
        textAlign: 'center',
    },
    cell: {
        fontSize: 12,
        color: '#1F2937',
        textAlign: 'center',
    },
    estacionamentoHeader: {
        flex: 2,
        textAlign: 'left',
    },
    estacionamentoCell: {
        flex: 2,
        textAlign: 'left',
        fontWeight: '500',
    },
    numberHeader: {
        flex: 1,
    },
    numberCell: {
        flex: 1,
    },
    occupiedText: {
        color: '#DC2626',
        fontWeight: '500',
    },
    availableText: {
        color: '#059669',
        fontWeight: '500',
    },
    maintenanceText: {
        color: '#D97706',
        fontWeight: '500',
    },
    occupancyContainer: {
        flex: 1,
        alignItems: 'center',
    },
    occupancyBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    occupancyText: {
        fontSize: 10,
        fontWeight: '600',
    },
});
