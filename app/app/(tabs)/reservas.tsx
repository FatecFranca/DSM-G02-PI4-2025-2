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
import ApiService, { Reservation } from '../../lib/api';
import ReservationFilters from '../../components/reservations/ReservationFilters';
import ReservationList from '../../components/reservations/ReservationList';
import ReservationStats from '../../components/reservations/ReservationStats';

export default function ReservasPage() {
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadReservations = async () => {

        try {
            setError(null);
            const response = await ApiService.getMyReservations();
            if (response.data) {
                setReservations(response.data);
            }
        } catch (e: any) {
            setError('Erro ao carregar reservas');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadReservations();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        await loadReservations();
        setRefreshing(false);
    };

    // Transformar dados da API para o formato dos componentes
    const transformedReservations = useMemo(() => {
        return reservations.map(reservation => {
            const now = new Date();
            const startTime = new Date(reservation.startTime);
            const endTime = new Date(reservation.endTime);

            let status: 'active' | 'completed' | 'cancelled' | 'pending' = 'pending';
            if (now < startTime) {
                status = 'pending';
            } else if (now >= startTime && now <= endTime) {
                status = 'active';
            } else {
                status = 'completed';
            }

            return {
                id: reservation.id,
                user: reservation.user?.name || 'Usuário',
                vehicle: reservation.vehiclePlate || 'N/A',
                spot: reservation.parkingSlot?.number?.toString().padStart(2, '0') || 'N/A',
                startTime: reservation.startTime,
                endTime: reservation.endTime,
                status,
                price: 'R$ 0,00', // Preço não implementado ainda
                createdAt: reservation.createdAt
            };
        });
    }, [reservations]);

    const filteredReservations = useMemo(() => {
        return transformedReservations.filter(reservation => {
            const matchesSearch = reservation.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                reservation.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                reservation.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                reservation.spot.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesFilter = selectedFilter === 'all' || reservation.status === selectedFilter;

            return matchesSearch && matchesFilter;
        });
    }, [transformedReservations, searchTerm, selectedFilter]);

    const stats = useMemo(() => {
        return {
            total: transformedReservations.length,
            active: transformedReservations.filter(r => r.status === 'active').length,
            completed: transformedReservations.filter(r => r.status === 'completed').length,
            cancelled: 0, // Não temos cancelamentos no modelo atual
            pending: transformedReservations.filter(r => r.status === 'pending').length
        };
    }, [transformedReservations]);

    const handleEdit = (reservation: any) => {
        Alert.alert('Editar Reserva', `Editar reserva ${reservation.id}`);
    };

    const handleApprove = (reservation: any) => {
        Alert.alert('Aprovar Reserva', `Aprovar reserva ${reservation.id}`);
    };

    const handleReject = (reservation: any) => {
        Alert.alert('Rejeitar Reserva', `Rejeitar reserva ${reservation.id}`);
    };

    const handleDelete = async (reservation: any) => {
        Alert.alert(
            'Cancelar Reserva',
            'Tem certeza que deseja cancelar esta reserva?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Confirmar',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await ApiService.cancelReservation(reservation.id);
                            await loadReservations();
                            Alert.alert('Sucesso', 'Reserva cancelada com sucesso');
                        } catch (e: any) {
                            Alert.alert('Erro', 'Falha ao cancelar reserva');
                        }
                    }
                }
            ]
        );
    };

    const handleFilters = () => {
        Alert.alert('Filtros Avançados', 'Funcionalidade em desenvolvimento');
    };

    const handleNewReservation = () => {
        Alert.alert('Nova Reserva', 'Redirecionando para criação de reserva...');
    };


    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Carregando reservas...</Text>
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
                        <Text style={styles.title}>Minhas Reservas</Text>
                        <Text style={styles.subtitle}>Gerencie suas reservas de estacionamento</Text>
                    </View>
                    <TouchableOpacity style={styles.newReservationButton} onPress={handleNewReservation}>
                        <Ionicons name="add" size={20} color="#FFFFFF" />
                        <Text style={styles.newReservationText}>Nova Reserva</Text>
                    </TouchableOpacity>
                </View>

                {/* Error Display */}
                {error && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                        <TouchableOpacity style={styles.retryButton} onPress={loadReservations}>
                            <Text style={styles.retryButtonText}>Tentar novamente</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Stats */}
                <ReservationStats
                    total={stats.total}
                    active={stats.active}
                    completed={stats.completed}
                    pending={stats.pending}
                    cancelled={stats.cancelled}
                />

                {/* Filters */}
                <ReservationFilters
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    selectedFilter={selectedFilter}
                    onFilterChange={setSelectedFilter}
                    onFiltersPress={handleFilters}
                />

                {/* Reservations List */}
                <ReservationList
                    reservations={filteredReservations}
                    onEdit={handleEdit}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    onDelete={handleDelete}
                />
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    subtitle: {
        fontSize: 16,
        color: '#6B7280',
        marginTop: 2,
    },
    newReservationButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3B82F6',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        gap: 4,
    },
    newReservationText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
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
});
