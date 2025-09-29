import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../ui/Card';

export default function FeaturesSection() {
  const features = [
    {
      icon: 'location',
      title: "Monitoramento em Tempo Real",
      description: "Veja a disponibilidade de vagas instantaneamente através de sensores IR conectados",
      delay: 0
    },
    {
      icon: 'phone-portrait',
      title: "Reserva pelo App",
      description: "Reserve sua vaga antecipadamente através do aplicativo mobile ou web",
      delay: 200
    },
    {
      icon: 'shield-checkmark',
      title: "Painel Administrativo",
      description: "Controle completo do estacionamento com relatórios e configurações avançadas",
      delay: 400
    },
    {
      icon: 'card',
      title: "Pagamentos Online",
      description: "Integração com sistemas de pagamento para transações seguras e rápidas",
      delay: 600
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Funcionalidades <Text style={styles.highlight}>Principais</Text>
        </Text>
        <Text style={styles.subtitle}>
          Recursos avançados que tornam o gerenciamento de estacionamento mais eficiente e conveniente
        </Text>
      </View>

      <View style={styles.featuresGrid}>
        {features.map((feature, index) => (
          <Card key={index} variant="feature" delay={feature.delay} style={styles.card}>
            <View style={styles.iconContainer}>
              <Ionicons name={feature.icon as any} size={32} color="#3B82F6" />
            </View>
            <Text style={styles.featureTitle}>{feature.title}</Text>
            <Text style={styles.featureDescription}>{feature.description}</Text>
          </Card>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9FAFB',
    borderRadius: 24,
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginVertical: 20,
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
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 24,
  },
  card: {
    flex: 1,
    minWidth: 200,
    maxWidth: 280,
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    backgroundColor: '#DBEAFE',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});
