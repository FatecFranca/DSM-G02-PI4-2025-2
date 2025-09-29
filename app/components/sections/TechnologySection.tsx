import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../ui/Card';

export default function TechnologySection() {
  const technologies = [
    {
      title: "Arduino & Sensores IR",
      description: "Hardware confiável para detecção precisa de veículos"
    },
    {
      title: "Next.js & React",
      description: "Interface moderna e responsiva para web e mobile"
    },
    {
      title: "Conectividade IoT",
      description: "Comunicação em tempo real entre dispositivos"
    },
    {
      title: "Cloud Integration",
      description: "Armazenamento seguro e sincronização de dados"
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          <Text style={styles.highlight}>Tecnologia</Text> Avançada
        </Text>
        <Text style={styles.subtitle}>
          Stack moderno e confiável para garantir performance e escalabilidade
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.technologiesList}>
          {technologies.map((tech, index) => (
            <View key={index} style={styles.techItem}>
              <View style={styles.techIcon}>
                <Ionicons name="checkmark-circle" size={24} color="#3B82F6" />
              </View>
              <View style={styles.techContent}>
                <Text style={styles.techTitle}>{tech.title}</Text>
                <Text style={styles.techDescription}>{tech.description}</Text>
              </View>
            </View>
          ))}
        </View>
        
        <Card variant="tech" style={styles.techCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="wifi" size={64} color="#FFFFFF" />
            <Text style={styles.cardTitle}>Sistema Conectado</Text>
            <Text style={styles.cardDescription}>
              Todos os componentes trabalham em harmonia para oferecer uma experiência perfeita
            </Text>
          </View>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>99.9%</Text>
              <Text style={styles.statLabel}>Uptime</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>&lt;1s</Text>
              <Text style={styles.statLabel}>Resposta</Text>
            </View>
          </View>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 24,
  },
  highlight: {
    color: '#3B82F6',
  },
  subtitle: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 28,
    maxWidth: 600,
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 48,
    justifyContent: 'center',
  },
  technologiesList: {
    flex: 1,
    minWidth: 300,
    maxWidth: 500,
  },
  techItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  techIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#DBEAFE',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  techContent: {
    flex: 1,
  },
  techTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  techDescription: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  techCard: {
    flex: 1,
    minWidth: 300,
    maxWidth: 400,
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 16,
    color: '#BFDBFE',
    textAlign: 'center',
    lineHeight: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#BFDBFE',
  },
});
