import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
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

interface Reservation {
    id: string;
    spot: string;
    startDate: Date;
    endDate: Date;
    price: string;
    status: 'active' | 'completed' | 'cancelled' | 'pending';
    createdAt: Date;
    notes?: string;
}

export default function MinhasReservasPage() {
    const [reservations, setReservations] = useState<Reservation[]>([
        {
            id: "RES-001",
            spot: "A01",
            startDate: new Date('2024-01-15T14:00:00'),
            endDate: new Date('2024-01-15T18:00:00'),
            price: "20,00",
            status: "active",
            createdAt: new Date('2024-01-15T10:30:00'),
            notes: "Reserva para reunião"
        },
        {
            id: "RES-002",
            spot: "B04",
            startDate: new Date('2024-01-14T09:00:00'),
            endDate: new Date('2024-01-14T12:00:00'),
            price: "15,00",
            status: "completed",
            createdAt: new Date('2024-01-14T08:15:00')
        },
        {
            id: "RES-003",
            spot: "C01",
            startDate: new Date('2024-01-16T16:00:00'),
            endDate: new Date('2024-01-16T20:00:00'),
            price: "20,00",
            status: "pending",
            createdAt: new Date('2024-01-15T16:30:00')
        },
        {
            id: "RES-004",
            spot: "A03",
            startDate: new Date('2024-01-13T10:00:00'),
            endDate: new Date('2024-01-13T14:00:00'),
            price: "20,00",
            status: "cancelled",
            createdAt: new Date('2024-01-13T09:00:00'),
            notes: "Cancelado por imprevisto"
        }
    ]);

    const [refreshing, setRefreshing] = useState(false);
    const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'cancelled' | 'pending'>('all');

    const getStatusColor = (status: string) => {
        switch (status) {
            case "active": return "#22C55E";
            case "completed": return "#3B82F6";
            case "cancelled": return "#EF4444";
            case "pending": return "#F59E0B";
            default: return "#6B7280";
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case "active": return "Ativa";
            case "completed": return "Concluída";
            case "cancelled": return "Cancelada";
            case "pending": return "Pendente";
            default: return "Desconhecido";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "active": return "checkmark-circle";
            case "completed": return "checkmark-done-circle";
            case "cancelled": return "close-circle";
            case "pending": return "time";
            default: return "help-circle";
        }
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('pt-BR');
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    };

    const formatDateTime = (date: Date) => {
        return `${formatDate(date)} ${formatTime(date)}`;
    };

    const onRefresh = () => {
        setRefreshing(true);
        // Simular atualização
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    };

    const cancelReservation = (id: string) => {
        Alert.alert(
            "Cancelar Reserva",
            "Tem certeza que deseja cancelar esta reserva?",
            [
                { text: "Não", style: "cancel" },
                {
                    text: "Sim",
                    style: "destructive",
                    onPress: () => {
                        setReservations(prev => 
                            prev.map(res => 
                                res.id === id 
                                    ? { ...res, status: 'cancelled' as const }
                                    : res
                            )
                        );
                        Alert.alert("Sucesso", "Reserva cancelada com sucesso!");
                    }
                }
            ]
        );
    };

    const filteredReservations = reservations.filter(reservation => {
        if (filter === 'all') return true;
        return reservation.status === filter;
    });

    const stats = {
        total: reservations.length,
        active: reservations.filter(r => r.status === 'active').length,
        completed: reservations.filter(r => r.status === 'completed').length,
        cancelled: reservations.filter(r => r.status === 'cancelled').length,
        pending: reservations.filter(r => r.status === 'pending').length,
    };

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
                    <Text style={styles.title}>Minhas Reservas</Text>
                    <Text style={styles.subtitle}>Gerencie suas reservas de vagas</Text>
                </View>

                {/* Stats */}
                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>{stats.total}</Text>
                        <Text style={styles.statLabel}>Total</Text>
                    </View>
                    <View style={[styles.statCard, { backgroundColor: '#DCFCE7' }]}>
                        <Text style={[styles.statNumber, { color: '#166534' }]}>{stats.active}</Text>
                        <Text style={[styles.statLabel, { color: '#166534' }]}>Ativas</Text>
                    </View>
                    <View style={[styles.statCard, { backgroundColor: '#DBEAFE' }]}>
                        <Text style={[styles.statNumber, { color: '#1E40AF' }]}>{stats.completed}</Text>
                        <Text style={[styles.statLabel, { color: '#1E40AF' }]}>Concluídas</Text>
                    </View>
                    <View style={[styles.statCard, { backgroundColor: '#FEF3C7' }]}>
                        <Text style={[styles.statNumber, { color: '#92400E' }]}>{stats.pending}</Text>
                        <Text style={[styles.statLabel, { color: '#92400E' }]}>Pendentes</Text>
                    </View>
                </View>

                {/* Filter */}
                <View style={styles.filterContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <TouchableOpacity
                            style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]}
                            onPress={() => setFilter('all')}
                        >
                            <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
                                Todas
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.filterButton, filter === 'active' && styles.filterButtonActive]}
                            onPress={() => setFilter('active')}
                        >
                            <Text style={[styles.filterText, filter === 'active' && styles.filterTextActive]}>
                                Ativas
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.filterButton, filter === 'pending' && styles.filterButtonActive]}
                            onPress={() => setFilter('pending')}
                        >
                            <Text style={[styles.filterText, filter === 'pending' && styles.filterTextActive]}>
                                Pendentes
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.filterButton, filter === 'completed' && styles.filterButtonActive]}
                            onPress={() => setFilter('completed')}
                        >
                            <Text style={[styles.filterText, filter === 'completed' && styles.filterTextActive]}>
                                Concluídas
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.filterButton, filter === 'cancelled' && styles.filterButtonActive]}
                            onPress={() => setFilter('cancelled')}
                        >
                            <Text style={[styles.filterText, filter === 'cancelled' && styles.filterTextActive]}>
                                Canceladas
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                {/* Reservations List */}
                <View style={styles.reservationsContainer}>
                    {filteredReservations.map((reservation) => (
                        <View key={reservation.id} style={styles.reservationCard}>
                            <View style={styles.reservationHeader}>
                                <View style={styles.reservationInfo}>
                                    <Text style={styles.reservationId}>{reservation.id}</Text>
                                    <Text style={styles.reservationSpot}>Vaga {reservation.spot}</Text>
                                </View>
                                <View style={styles.statusContainer}>
                                    <Ionicons 
                                        name={getStatusIcon(reservation.status) as any} 
                                        size={20} 
                                        color={getStatusColor(reservation.status)} 
                                    />
                                    <Text style={[styles.statusText, { color: getStatusColor(reservation.status) }]}>
                                        {getStatusText(reservation.status)}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.reservationDetails}>
                                <View style={styles.detailRow}>
                                    <Ionicons name="calendar" size={16} color="#6B7280" />
                                    <Text style={styles.detailText}>
                                        {formatDate(reservation.startDate)} - {formatDate(reservation.endDate)}
                                    </Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Ionicons name="time" size={16} color="#6B7280" />
                                    <Text style={styles.detailText}>
                                        {formatTime(reservation.startDate)} - {formatTime(reservation.endDate)}
                                    </Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Ionicons name="cash" size={16} color="#6B7280" />
                                    <Text style={styles.detailText}>R$ {reservation.price}</Text>
                                </View>
                                {reservation.notes && (
                                    <View style={styles.detailRow}>
                                        <Ionicons name="document-text" size={16} color="#6B7280" />
                                        <Text style={styles.detailText}>{reservation.notes}</Text>
                                    </View>
                                )}
                            </View>

                            <View style={styles.reservationActions}>
                                <Text style={styles.createdAt}>
                                    Criada em {formatDateTime(reservation.createdAt)}
                                </Text>
                                {reservation.status === 'active' && (
                                    <TouchableOpacity
                                        style={styles.cancelButton}
                                        onPress={() => cancelReservation(reservation.id)}
                                    >
                                        <Ionicons name="close" size={16} color="#EF4444" />
                                        <Text style={styles.cancelButtonText}>Cancelar</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    ))}

                    {filteredReservations.length === 0 && (
                        <View style={styles.emptyState}>
                            <Ionicons name="calendar-outline" size={48} color="#9CA3AF" />
                            <Text style={styles.emptyTitle}>Nenhuma reserva encontrada</Text>
                            <Text style={styles.emptyText}>
                                {filter === 'all' 
                                    ? 'Você ainda não possui reservas.'
                                    : `Nenhuma reserva ${getStatusText(filter).toLowerCase()} encontrada.`
                                }
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
    statCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    statNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#6B7280',
        fontWeight: '500',
    },
    filterContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    filterButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    filterButtonActive: {
        backgroundColor: '#3B82F6',
        borderColor: '#3B82F6',
    },
    filterText: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '500',
    },
    filterTextActive: {
        color: '#FFFFFF',
    },
    reservationsContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    reservationCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    reservationHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    reservationInfo: {
        flex: 1,
    },
    reservationId: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 4,
    },
    reservationSpot: {
        fontSize: 14,
        color: '#6B7280',
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
    },
    reservationDetails: {
        marginBottom: 16,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 8,
    },
    detailText: {
        fontSize: 14,
        color: '#374151',
    },
    reservationActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
    },
    createdAt: {
        fontSize: 12,
        color: '#9CA3AF',
    },
    cancelButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        backgroundColor: '#FEF2F2',
        gap: 4,
    },
    cancelButtonText: {
        fontSize: 12,
        color: '#EF4444',
        fontWeight: '500',
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: 60,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937',
        marginTop: 16,
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
    },
});
