import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Card from '../ui/Card';

interface AppInfoCardProps {
    appInfo: {
        name: string;
        version: string;
        build: string;
        description: string;
    };
}

export default function AppInfoCard({ appInfo }: AppInfoCardProps) {
    return (
        <Card style={styles.appInfoCard}>
            <View style={styles.appIconContainer}>
                <View style={styles.appIcon}>
                    <Ionicons name="car-sport" size={48} color="#3B82F6" />
                </View>
            </View>
            
            <View style={styles.appInfo}>
                <Text style={styles.appName}>{appInfo.name}</Text>
                <Text style={styles.appVersion}>Versão {appInfo.version}</Text>
                <Text style={styles.appBuild}>Build {appInfo.build}</Text>
                <Text style={styles.appDescription}>{appInfo.description}</Text>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    appInfoCard: {
        marginHorizontal: 20,
        marginBottom: 20,
        padding: 24,
        alignItems: 'center',
    },
    appIconContainer: {
        marginBottom: 16,
    },
    appIcon: {
        width: 80,
        height: 80,
        borderRadius: 20,
        backgroundColor: '#EFF6FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    appInfo: {
        alignItems: 'center',
        marginBottom: 20,
    },
    appName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 4,
    },
    appVersion: {
        fontSize: 16,
        color: '#3B82F6',
        fontWeight: '500',
        marginBottom: 2,
    },
    appBuild: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 12,
    },
    appDescription: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 20,
    },
}); 