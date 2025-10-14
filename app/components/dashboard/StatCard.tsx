import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface StatCardProps {
    title: string;
    value: string;
    change?: string;
    changeType?: 'increase' | 'decrease' | 'neutral';
    icon: keyof typeof Ionicons.glyphMap;
    color: 'blue' | 'green' | 'purple' | 'yellow' | 'red';
}

export default function StatCard({ title, value, change, changeType = 'neutral', icon, color }: StatCardProps) {
    const getColorStyles = () => {
        switch (color) {
            case 'blue':
                return { bg: '#EFF6FF', icon: '#3B82F6', text: '#1E40AF' };
            case 'green':
                return { bg: '#F0FDF4', icon: '#10B981', text: '#059669' };
            case 'purple':
                return { bg: '#FAF5FF', icon: '#8B5CF6', text: '#7C3AED' };
            case 'yellow':
                return { bg: '#FFFBEB', icon: '#F59E0B', text: '#D97706' };
            case 'red':
                return { bg: '#FEF2F2', icon: '#EF4444', text: '#DC2626' };
            default:
                return { bg: '#F3F4F6', icon: '#6B7280', text: '#374151' };
        }
    };

    const colors = getColorStyles();

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.value}>{value}</Text>
                    {change && (
                        <Text style={[
                            styles.change,
                            changeType === 'increase' && styles.changeIncrease,
                            changeType === 'decrease' && styles.changeDecrease
                        ]}>
                            {change}
                        </Text>
                    )}
                </View>
                <View style={[styles.iconContainer, { backgroundColor: colors.bg }]}>
                    <Ionicons name={icon} size={24} color={colors.icon} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
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
        width: '48%',
        marginBottom: 12,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6B7280',
        marginBottom: 4,
    },
    value: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 2,
    },
    change: {
        fontSize: 12,
        fontWeight: '500',
    },
    changeIncrease: {
        color: '#10B981',
    },
    changeDecrease: {
        color: '#EF4444',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
