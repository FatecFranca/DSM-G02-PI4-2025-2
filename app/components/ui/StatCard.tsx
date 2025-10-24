import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface StatCardProps {
  label: string;
  value: number;
  color: string;
  bgColor: string;
}

export default function StatCard({ label, value, color, bgColor }: StatCardProps) {
  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={[styles.value, { color }]}>{value}</Text>
      <Text style={[styles.label, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 70,
    minWidth: 60,
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    opacity: 0.8,
    textAlign: 'center',
  },
});
