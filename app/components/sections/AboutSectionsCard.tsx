import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Card from '../ui/Card';

interface AboutSection {
    id: string;
    title: string;
    description: string;
    icon: keyof typeof Ionicons.glyphMap;
    action: () => void;
}

interface AboutSectionsCardProps {
    sections: AboutSection[];
}

export default function AboutSectionsCard({ sections }: AboutSectionsCardProps) {
    return (
        <Card style={styles.sectionsCard}>
            <View style={styles.sectionsHeader}>
                <Ionicons name="information-circle" size={24} color="#F59E0B" />
                <Text style={styles.sectionsTitle}>Informações</Text>
            </View>
            
            {sections.map((section, index) => (
                <TouchableOpacity
                    key={section.id}
                    style={[
                        styles.sectionItem,
                        index === sections.length - 1 && styles.lastSectionItem
                    ]}
                    onPress={section.action}
                    activeOpacity={0.7}
                >
                    <View style={styles.sectionLeft}>
                        <View style={styles.sectionIcon}>
                            <Ionicons name={section.icon} size={20} color="#6B7280" />
                        </View>
                        <View style={styles.sectionContent}>
                            <Text style={styles.sectionTitle}>{section.title}</Text>
                            <Text style={styles.sectionDescription}>{section.description}</Text>
                        </View>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
                </TouchableOpacity>
            ))}
        </Card>
    );
}

const styles = StyleSheet.create({
    sectionsCard: {
        marginHorizontal: 20,
        marginBottom: 20,
        padding: 20,
    },
    sectionsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 12,
    },
    sectionsTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
    },
    sectionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    lastSectionItem: {
        borderBottomWidth: 0,
        paddingBottom: 0,
    },
    sectionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    sectionIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    sectionContent: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1F2937',
        marginBottom: 2,
    },
    sectionDescription: {
        fontSize: 14,
        color: '#6B7280',
    },
}); 