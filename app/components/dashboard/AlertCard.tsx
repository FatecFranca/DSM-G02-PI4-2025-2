import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Alert {
    id: number;
    type: 'warning' | 'info' | 'error' | 'success';
    message: string;
    time: string;
}

interface AlertCardProps {
    alerts: Alert[];
}

export default function AlertCard({ alerts }: AlertCardProps) {
    const getAlertIcon = (type: string) => {
        switch (type) {
            case 'warning':
                return 'warning' as keyof typeof Ionicons.glyphMap;
            case 'error':
                return 'close-circle' as keyof typeof Ionicons.glyphMap;
            case 'success':
                return 'checkmark-circle' as keyof typeof Ionicons.glyphMap;
            default:
                return 'information-circle' as keyof typeof Ionicons.glyphMap;
        }
    };

    const getAlertColors = (type: string) => {
        switch (type) {
            case 'warning':
                return { bg: '#FFFBEB', border: '#FCD34D', text: '#92400E', icon: '#F59E0B' };
            case 'error':
                return { bg: '#FEF2F2', border: '#FCA5A5', text: '#991B1B', icon: '#EF4444' };
            case 'success':
                return { bg: '#F0FDF4', border: '#86EFAC', text: '#166534', icon: '#10B981' };
            default:
                return { bg: '#EFF6FF', border: '#93C5FD', text: '#1E40AF', icon: '#3B82F6' };
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Alertas</Text>
            <View style={styles.alertsContainer}>
                {alerts.map((alert) => {
                    const colors = getAlertColors(alert.type);
                    return (
                        <View key={alert.id} style={[styles.alert, { backgroundColor: colors.bg, borderColor: colors.border }]}>
                            <Ionicons name={getAlertIcon(alert.type)} size={20} color={colors.icon} style={styles.alertIcon} />
                            <View style={styles.alertContent}>
                                <Text style={[styles.alertMessage, { color: colors.text }]}>{alert.message}</Text>
                                <Text style={[styles.alertTime, { color: colors.icon }]}>{alert.time}</Text>
                            </View>
                        </View>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
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
    alertsContainer: {
        // gap: 12, // Removido para compatibilidade
    },
    alert: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        marginBottom: 12,
    },
    alertIcon: {
        marginRight: 12,
        marginTop: 2,
    },
    alertContent: {
        flex: 1,
    },
    alertMessage: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 4,
    },
    alertTime: {
        fontSize: 12,
        opacity: 0.8,
    },
});
