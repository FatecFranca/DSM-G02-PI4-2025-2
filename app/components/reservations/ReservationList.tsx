import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Reservation {
    id: string;
    user: string;
    vehicle: string;
    spot: string;
    startTime: string;
    endTime: string;
    status: 'active' | 'completed' | 'cancelled' | 'pending';
    price: string;
    createdAt: string;
}

interface ReservationListProps {
    reservations: Reservation[];
    onEdit: (reservation: Reservation) => void;
    onApprove: (reservation: Reservation) => void;
    onReject: (reservation: Reservation) => void;
    onDelete: (reservation: Reservation) => void;
}

export default function ReservationList({
    reservations,
    onEdit,
    onApprove,
    onReject,
    onDelete
}: ReservationListProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return { bg: '#D1FAE5', text: '#065F46', border: '#10B981' };
            case 'completed':
                return { bg: '#DBEAFE', text: '#1E40AF', border: '#3B82F6' };
            case 'cancelled':
                return { bg: '#FEE2E2', text: '#991B1B', border: '#EF4444' };
            case 'pending':
                return { bg: '#FEF3C7', text: '#92400E', border: '#F59E0B' };
            default:
                return { bg: '#F3F4F6', text: '#374151', border: '#6B7280' };
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'active': return 'Ativa';
            case 'completed': return 'Concluída';
            case 'cancelled': return 'Cancelada';
            case 'pending': return 'Pendente';
            default: return 'Desconhecido';
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    };

    if (reservations.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Ionicons name="calendar" size={48} color="#9CA3AF" />
                <Text style={styles.emptyTitle}>Nenhuma reserva encontrada</Text>
                <Text style={styles.emptySubtitle}>
                    Tente ajustar os filtros ou criar uma nova reserva.
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Reservas ({reservations.length})</Text>
            </View>

            <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
                {reservations.map((reservation) => {
                    const statusColors = getStatusColor(reservation.status);
                    
                    return (
                        <View key={reservation.id} style={styles.reservationCard}>
                            <View style={styles.reservationHeader}>
                                <View style={styles.reservationInfo}>
                                    <Text style={styles.reservationId}>#{reservation.id}</Text>
                                    <View style={[styles.statusBadge, { backgroundColor: statusColors.bg, borderColor: statusColors.border }]}>
                                        <Text style={[styles.statusText, { color: statusColors.text }]}>
                                            {getStatusText(reservation.status)}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.reservationActions}>
                                    <TouchableOpacity
                                        style={styles.actionButton}
                                        onPress={() => onEdit(reservation)}
                                    >
                                        <Ionicons name="create" size={16} color="#3B82F6" />
                                    </TouchableOpacity>
                                    {reservation.status === 'pending' && (
                                        <>
                                            <TouchableOpacity
                                                style={styles.actionButton}
                                                onPress={() => onApprove(reservation)}
                                            >
                                                <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={styles.actionButton}
                                                onPress={() => onReject(reservation)}
                                            >
                                                <Ionicons name="close-circle" size={16} color="#EF4444" />
                                            </TouchableOpacity>
                                        </>
                                    )}
                                    <TouchableOpacity
                                        style={styles.actionButton}
                                        onPress={() => onDelete(reservation)}
                                    >
                                        <Ionicons name="trash" size={16} color="#EF4444" />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.reservationDetails}>
                                <View style={styles.detailRow}>
                                    <View style={styles.detailItem}>
                                        <Ionicons name="person" size={16} color="#6B7280" />
                                        <Text style={styles.detailLabel}>Usuário:</Text>
                                        <Text style={styles.detailValue}>{reservation.user}</Text>
                                    </View>
                                    <View style={styles.detailItem}>
                                        <Ionicons name="car" size={16} color="#6B7280" />
                                        <Text style={styles.detailLabel}>Veículo:</Text>
                                        <Text style={styles.detailValue}>{reservation.vehicle}</Text>
                                    </View>
                                </View>

                                <View style={styles.detailRow}>
                                    <View style={styles.detailItem}>
                                        <Ionicons name="location" size={16} color="#6B7280" />
                                        <Text style={styles.detailLabel}>Vaga:</Text>
                                        <Text style={styles.detailValue}>{reservation.spot}</Text>
                                    </View>
                                    <View style={styles.detailItem}>
                                        <Ionicons name="card" size={16} color="#6B7280" />
                                        <Text style={styles.detailLabel}>Preço:</Text>
                                        <Text style={styles.detailValue}>{reservation.price}</Text>
                                    </View>
                                </View>

                                <View style={styles.timeContainer}>
                                    <View style={styles.timeItem}>
                                        <Ionicons name="calendar" size={16} color="#6B7280" />
                                        <Text style={styles.timeLabel}>Data:</Text>
                                        <Text style={styles.timeValue}>{formatDate(reservation.startTime)}</Text>
                                    </View>
                                    <View style={styles.timeItem}>
                                        <Ionicons name="time" size={16} color="#6B7280" />
                                        <Text style={styles.timeLabel}>Horário:</Text>
                                        <Text style={styles.timeValue}>
                                            {formatTime(reservation.startTime)} - {formatTime(reservation.endTime)}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
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
    header: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
    },
    listContainer: {
        maxHeight: 400,
    },
    reservationCard: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    reservationHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    reservationInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    reservationId: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        borderWidth: 1,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
    },
    reservationActions: {
        flexDirection: 'row',
        gap: 8,
    },
    actionButton: {
        padding: 8,
        borderRadius: 6,
        backgroundColor: '#F9FAFB',
    },
    reservationDetails: {
        gap: 8,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        flex: 1,
    },
    detailLabel: {
        fontSize: 12,
        color: '#6B7280',
        fontWeight: '500',
    },
    detailValue: {
        fontSize: 12,
        color: '#1F2937',
        fontWeight: '500',
    },
    timeContainer: {
        marginTop: 8,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
    },
    timeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 4,
    },
    timeLabel: {
        fontSize: 12,
        color: '#6B7280',
        fontWeight: '500',
    },
    timeValue: {
        fontSize: 12,
        color: '#1F2937',
        fontWeight: '500',
    },
    emptyContainer: {
        alignItems: 'center',
        padding: 48,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginHorizontal: 16,
        marginBottom: 16,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
        marginTop: 16,
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 20,
    },
});
