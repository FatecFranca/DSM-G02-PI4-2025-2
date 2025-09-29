import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Card from '../ui/Card';

interface Technology {
    name: string;
    version: string;
}

interface TechnologiesCardProps {
    technologies: Technology[];
}

export default function TechnologiesCard({ technologies }: TechnologiesCardProps) {
    return (
        <Card style={styles.techCard}>
            <View style={styles.techHeader}>
                <Ionicons name="code-slash" size={24} color="#8B5CF6" />
                <Text style={styles.techTitle}>Tecnologias Utilizadas</Text>
            </View>
            
            <View style={styles.techList}>
                {technologies.map((tech, index) => (
                    <View key={index} style={styles.techItem}>
                        <Text style={styles.techName}>{tech.name}</Text>
                        <Text style={styles.techVersion}>{tech.version}</Text>
                    </View>
                ))}
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    techCard: {
        marginHorizontal: 20,
        marginBottom: 20,
        padding: 20,
    },
    techHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 12,
    },
    techTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
    },
    techList: {
        gap: 12,
    },
    techItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    techName: {
        fontSize: 14,
        fontWeight: '500',
        color: '#1F2937',
    },
    techVersion: {
        fontSize: 14,
        color: '#6B7280',
    },
}); 