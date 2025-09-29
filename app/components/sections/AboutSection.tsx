import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../ui/Card';

export default function AboutSection() {
  const features = [
    {
      icon: 'flash',
      title: "Tecnologia IoT",
      description: "Sensores inteligentes conectados que monitoram cada vaga em tempo real"
    },
    {
      icon: 'phone-portrait',
      title: "App Intuitivo",
      description: "Interface moderna e fácil de usar para web e dispositivos móveis"
    },
    {
      icon: 'bar-chart',
      title: "Analytics",
      description: "Relatórios detalhados e insights sobre o uso do estacionamento"
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          Sobre o <Text style={styles.highlight}>Smart Parking</Text>
        </Text>
        <Text style={styles.description}>
          O Smart Parking é um sistema revolucionário que utiliza tecnologia IoT para transformar 
          a experiência de estacionamento. Através da integração de Arduino, sensores infravermelhos 
          e aplicações web/mobile, oferecemos uma solução completa e inteligente.
        </Text>
        
        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <Card key={index} variant="default" delay={index * 200} style={styles.card}>
              <View style={styles.iconContainer}>
                <Ionicons name={feature.icon as any} size={24} color="#3B82F6" />
              </View>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </Card>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  content: {
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
    alignItems: 'center',
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
  description: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 48,
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
    maxWidth: 250,
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#DBEAFE',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});
