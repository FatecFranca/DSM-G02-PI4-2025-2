import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReservationFilters from '../../components/reservations/ReservationFilters';
import ReservationList from '../../components/reservations/ReservationList';
import ReservationStats from '../../components/reservations/ReservationStats';

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

export default function ReservasPage() {
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Dados simulados de reservas
    const reservations: Reservation[] = [
        {
            id: '1',
            user: 'João Silva',
            vehicle: 'ABC-1234',
            spot: 'A01',
            startTime: '2024-01-15T09:00:00Z',
            endTime: '2024-01-15T17:00:00Z',
            status: 'active',
            price: 'R$ 40,00',
            createdAt: '2024-01-15T08:30:00Z'
        },
        {
            id: '2',
            user: 'Maria Santos',
            vehicle: 'XYZ-5678',
            spot: 'B02',
            startTime: '2024-01-14T14:00:00Z',
            endTime: '2024-01-14T18:00:00Z',
            status: 'completed',
            price: 'R$ 20,00',
            createdAt: '2024-01-14T13:30:00Z'
        },
        {
            id: '3',
            user: 'Pedro Costa',
            vehicle: 'DEF-9012',
            spot: 'C03',
            startTime: '2024-01-16T10:00:00Z',
            endTime: '2024-01-16T12:00:00Z',
            status: 'pending',
            price: 'R$ 10,00',
            createdAt: '2024-01-15T20:00:00Z'
        },
        {
            id: '4',
            user: 'Ana Oliveira',
            vehicle: 'GHI-3456',
            spot: 'A05',
            startTime: '2024-01-13T16:00:00Z',
            endTime: '2024-01-13T18:00:00Z',
            status: 'cancelled',
            price: 'R$ 10,00',
            createdAt: '2024-01-13T15:30:00Z'
        }
    ];

    const filteredReservations = useMemo(() => {
        return reservations.filter(reservation => {
            const matchesSearch = reservation.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                reservation.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                reservation.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                reservation.spot.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesFilter = selectedFilter === 'all' || reservation.status === selectedFilter;

            return matchesSearch && matchesFilter;
        });
    }, [reservations, searchTerm, selectedFilter]);

    const stats = {
        total: reservations.length,
        active: reservations.filter(r => r.status === 'active').length,
        completed: reservations.filter(r => r.status === 'completed').length,
        cancelled: reservations.filter(r => r.status === 'cancelled').length,
        pending: reservations.filter(r => r.status === 'pending').length
    };

    const handleEdit = (reservation: Reservation) => {
        Alert.alert('Editar Reserva', `Editar reserva ${reservation.id}`);
    };

    const handleApprove = (reservation: Reservation) => {
        Alert.alert('Aprovar Reserva', `Aprovar reserva ${reservation.id}`);
    };

    const handleReject = (reservation: Reservation) => {
        Alert.alert('Rejeitar Reserva', `Rejeitar reserva ${reservation.id}`);
    };

    const handleDelete = (reservation: Reservation) => {
        Alert.alert('Excluir Reserva', `Excluir reserva ${reservation.id}`);
    };

    const handleFilters = () => {
        Alert.alert('Filtros Avançados', 'Funcionalidade em desenvolvimento');
    };

    const handleNewReservation = () => {
        Alert.alert('Nova Reserva', 'Redirecionando para criação de reserva...');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.title}>Gestão de Reservas</Text>
                        <Text style={styles.subtitle}>Gerencie todas as reservas dos estacionamentos</Text>
                    </View>
                    <TouchableOpacity style={styles.newReservationButton} onPress={handleNewReservation}>
                        <Ionicons name="add" size={20} color="#FFFFFF" />
                        <Text style={styles.newReservationText}>Nova Reserva</Text>
                    </TouchableOpacity>
                </View>

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
});
