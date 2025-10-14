import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import StatCard from '@/components/dashboard/StatCard';
import StatisticsTable from '@/components/dashboard/StatisticsTable';

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
    const [statsData, setStatsData] = useState({
        totalSlots: 150,
        occupiedSlots: 89,
        activeSensors: 142,
        activeParkings: 5
    });

    // Dados simulados para demonstração
    const parkingStats: ParkingStat[] = [
        {
            parkingId: '1',
            parkingName: 'Shopping Center',
            total: 50,
            occupied: 35,
            available: 12,
            maintenance: 3,
            occupancyRate: 70
        },
        {
            parkingId: '2',
            parkingName: 'Centro Comercial',
            total: 40,
            occupied: 28,
            available: 10,
            maintenance: 2,
            occupancyRate: 70
        },
        {
            parkingId: '3',
            parkingName: 'Estacionamento Central',
            total: 60,
            occupied: 26,
            available: 32,
            maintenance: 2,
            occupancyRate: 43
        }
    ];

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

    const stats = [
        {
            title: 'Vagas Totais',
            value: String(statsData.totalSlots),
            icon: 'car' as keyof typeof Ionicons.glyphMap,
            color: 'blue' as const
        },
        {
            title: 'Vagas Ocupadas',
            value: String(statsData.occupiedSlots),
            icon: 'location' as keyof typeof Ionicons.glyphMap,
            color: 'green' as const
        },
        {
            title: 'Sensores Ativos',
            value: String(statsData.activeSensors),
            icon: 'people' as keyof typeof Ionicons.glyphMap,
            color: 'purple' as const
        },
        {
            title: 'Estacionamentos Ativos',
            value: String(statsData.activeParkings),
            icon: 'card' as keyof typeof Ionicons.glyphMap,
            color: 'yellow' as const
        }
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.headerTitle}>Dashboard</Text>
                        <Text style={styles.headerSubtitle}>Visão geral dos estacionamentos</Text>
                    </View>
                    <TouchableOpacity style={styles.profileButton}>
                        <Ionicons name="person-circle" size={32} color="#3B82F6" />
                    </TouchableOpacity>
                </View>

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
    profileButton: {
        padding: 4,
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
});
