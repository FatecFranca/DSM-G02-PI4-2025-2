import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ViewStyle, Animated } from 'react-native';

interface CardProps {
  variant?: 'default' | 'feature' | 'tech';
  delay?: number;
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function Card({ variant = 'default', delay = 0, children, style }: CardProps) {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, fadeAnim, scaleAnim]);

  const cardStyle = [
    styles.card,
    styles[variant],
    style
  ];

  return (
    <Animated.View 
      style={[
        cardStyle,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }
      ]}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  default: {
    backgroundColor: '#FFFFFF',
  },
  feature: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  tech: {
    backgroundColor: '#1E40AF',
  },
});
