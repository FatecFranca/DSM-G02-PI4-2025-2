import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Button from '../ui/Button';

interface ReservationFiltersProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
    selectedFilter: string;
    onFilterChange: (filter: string) => void;
    onFiltersPress: () => void;
}

export default function ReservationFilters({
    searchTerm,
    onSearchChange,
    selectedFilter,
    onFilterChange,
    onFiltersPress
}: ReservationFiltersProps) {
    const filterOptions = [
        { value: 'all', label: 'Todos' },
        { value: 'active', label: 'Ativas' },
        { value: 'completed', label: 'Concluídas' },
        { value: 'cancelled', label: 'Canceladas' },
        { value: 'pending', label: 'Pendentes' },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <View style={styles.searchInputContainer}>
                    <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Buscar por ID, usuário, veículo ou vaga..."
                        value={searchTerm}
                        onChangeText={onSearchChange}
                        placeholderTextColor="#9CA3AF"
                    />
                </View>
            </View>

            <View style={styles.filtersContainer}>
                <View style={styles.filterRow}>
                    {filterOptions.map((option) => (
                        <TouchableOpacity
                            key={option.value}
                            style={[
                                styles.filterButton,
                                selectedFilter === option.value && styles.filterButtonActive
                            ]}
                            onPress={() => onFilterChange(option.value)}
                        >
                            <Text style={[
                                styles.filterButtonText,
                                selectedFilter === option.value && styles.filterButtonTextActive
                            ]}>
                                {option.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                
                <Button 
                    variant="secondary" 
                    size="sm" 
                    onPress={onFiltersPress}
                    style={styles.filtersButton}
                >
                    <Ionicons name="options" size={16} color="#6B7280" />
                    <Text style={styles.filtersButtonText}>Filtros</Text>
                </Button>
            </View>
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
    searchContainer: {
        marginBottom: 16,
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: '#FFFFFF',
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#1F2937',
        paddingVertical: 12,
    },
    filtersContainer: {
        gap: 12,
    },
    filterRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    filterButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: '#F3F4F6',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    filterButtonActive: {
        backgroundColor: '#3B82F6',
        borderColor: '#3B82F6',
    },
    filterButtonText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#6B7280',
    },
    filterButtonTextActive: {
        color: '#FFFFFF',
    },
    filtersButton: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        gap: 4,
    },
    filtersButtonText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#6B7280',
    },
});
