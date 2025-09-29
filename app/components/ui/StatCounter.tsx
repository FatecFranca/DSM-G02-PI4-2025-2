import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

interface StatCounterProps {
  number: number;
  label: string;
  suffix?: string;
}

export default function StatCounter({ number, label, suffix = '' }: StatCounterProps) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: number,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }, [number]);

  return (
    <View style={styles.container}>
      <View style={styles.numberContainer}>
        <Animated.Text style={styles.number}>
          {animatedValue.interpolate({
            inputRange: [0, number],
            outputRange: [0, number],
          })}
        </Animated.Text>
        <Text style={styles.suffix}>{suffix}</Text>
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  number: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  suffix: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  label: {
    fontSize: 16,
    color: '#E5E7EB',
    textAlign: 'center',
    fontWeight: '500',
  },
});
