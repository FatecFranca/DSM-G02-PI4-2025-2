import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../ui/Button';

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    setIsLoaded(true);
    
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <LinearGradient
      colors={['#3B82F6', '#1E40AF', '#1E3A8A']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.titleContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.title}>
            Smart <Text style={styles.highlight}>Parking</Text>
          </Text>
        </Animated.View>
        
        <Animated.Text
          style={[
            styles.subtitle,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          Sistema inteligente de estacionamento com IoT, Arduino e sensores IR. 
          Monitore vagas em tempo real, reserve sua vaga e pague online.
        </Animated.Text>
        
        <Animated.View
          style={[
            styles.buttonContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Button variant="secondary" size="lg" icon="play" style={styles.button}>
            Ver Demonstração
          </Button>
          <Button variant="outline" size="lg" icon="arrow" style={styles.button}>
            Saiba Mais
          </Button>
        </Animated.View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    paddingBottom: 60,
    paddingHorizontal: 20,
  },
  content: {
    alignItems: 'center',
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },
  titleContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 56,
  },
  highlight: {
    color: '#BFDBFE',
  },
  subtitle: {
    fontSize: 20,
    color: '#DBEAFE',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 40,
    maxWidth: 600,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  button: {
    minWidth: 180,
  },
});
