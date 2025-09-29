import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../ui/Button';

export default function CTASection() {
  return (
    <LinearGradient
      colors={['#3B82F6', '#1E40AF']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>
          Pronto para o Futuro dos Estacionamentos?
        </Text>
        <Text style={styles.description}>
          Junte-se à revolução do estacionamento inteligente e ofereça a melhor experiência aos seus usuários
        </Text>
        <View style={styles.buttonContainer}>
          <Button variant="secondary" size="lg" icon="arrow" style={styles.button}>
            Solicitar Demonstração
          </Button>
          <Button variant="outline" size="lg" style={styles.button}>
            Falar com Especialista
          </Button>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  content: {
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 40,
  },
  description: {
    fontSize: 18,
    color: '#DBEAFE',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 32,
    maxWidth: 600,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  button: {
    minWidth: 200,
  },
});
