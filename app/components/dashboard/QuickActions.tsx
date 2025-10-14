import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface QuickAction {
    id: string;
    title: string;
    icon: keyof typeof Ionicons.glyphMap;
    color: 'primary' | 'secondary';
    onPress: () => void;
}

interface QuickActionsProps {
    actions: QuickAction[];
}

export default function QuickActions({ actions }: QuickActionsProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ações Rápidas</Text>
            <View style={styles.actionsGrid}>
                {actions.map((action) => (
                    <TouchableOpacity
                        key={action.id}
                        style={[
                            styles.actionButton,
                            action.color === 'primary' ? styles.primaryButton : styles.secondaryButton
                        ]}
                        onPress={action.onPress}
                    >
                        <Ionicons
                            name={action.icon}
                            size={20}
                            color={action.color === 'primary' ? '#3B82F6' : '#6B7280'}
                        />
                        <Text style={[
                            styles.actionText,
                            action.color === 'primary' ? styles.primaryText : styles.secondaryText
                        ]}>
                            {action.title}
                        </Text>
                    </TouchableOpacity>
                ))}
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
    actionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    actionButton: {
        flex: 1,
        minWidth: '45%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
    },
    primaryButton: {
        backgroundColor: '#EFF6FF',
        borderWidth: 1,
        borderColor: '#BFDBFE',
    },
    secondaryButton: {
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    actionText: {
        fontSize: 12,
        fontWeight: '500',
    },
    primaryText: {
        color: '#1E40AF',
    },
    secondaryText: {
        color: '#374151',
    },
});
