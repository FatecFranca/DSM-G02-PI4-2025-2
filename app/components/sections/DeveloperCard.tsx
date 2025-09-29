import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Card from '../ui/Card';

interface DeveloperCardProps {
    developer: {
        name: string;
        website: string;
        email: string;
    };
    description: string;
}

export default function DeveloperCard({ developer, description }: DeveloperCardProps) {
    const handleWebsite = async () => {
        try {
            await Linking.openURL(developer.website);
        } catch (error) {
            console.error('Erro ao abrir website:', error);
        }
    };

    const handleEmail = async () => {
        try {
            await Linking.openURL(`mailto:${developer.email}`);
        } catch (error) {
            console.error('Erro ao abrir email:', error);
        }
    };

    return (
        <Card style={styles.developerCard}>
            <View style={styles.developerHeader}>
                <Ionicons name="people" size={24} color="#10B981" />
                <Text style={styles.developerTitle}>Desenvolvimento</Text>
            </View>
            
            <View style={styles.developerInfo}>
                <Text style={styles.developerName}>{developer.name}</Text>
                <Text style={styles.developerDescription}>{description}</Text>
            </View>

            <View style={styles.contactInfo}>
                <TouchableOpacity
                    style={styles.contactItem}
                    onPress={handleWebsite}
                    activeOpacity={0.7}
                >
                    <Ionicons name="globe" size={16} color="#3B82F6" />
                    <Text style={styles.contactText}>{developer.website}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                    style={styles.contactItem}
                    onPress={handleEmail}
                    activeOpacity={0.7}
                >
                    <Ionicons name="mail" size={16} color="#3B82F6" />
                    <Text style={styles.contactText}>{developer.email}</Text>
                </TouchableOpacity>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    developerCard: {
        marginHorizontal: 20,
        marginBottom: 20,
        padding: 20,
    },
    developerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 12,
    },
    developerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
    },
    developerInfo: {
        marginBottom: 16,
    },
    developerName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 8,
    },
    developerDescription: {
        fontSize: 14,
        color: '#6B7280',
        lineHeight: 20,
    },
    contactInfo: {
        gap: 8,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    contactText: {
        fontSize: 14,
        color: '#3B82F6',
        textDecorationLine: 'underline',
    },
}); 