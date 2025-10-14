import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

interface ReservationStatsProps {
  total: number;
  active: number;
  completed: number;
  pending: number;
  cancelled: number;
}

export default function ReservationStats({
  total,
  active,
  completed,
  pending,
  cancelled,
}: ReservationStatsProps) {
  const stats = [
    { label: 'Total', value: total, color: '#6B7280', icon: 'list' as keyof typeof Ionicons.glyphMap },
    { label: 'Ativas', value: active, color: '#10B981', icon: 'checkmark-circle' as keyof typeof Ionicons.glyphMap },
    { label: 'Concluídas', value: completed, color: '#3B82F6', icon: 'checkmark-done' as keyof typeof Ionicons.glyphMap },
    { label: 'Pendentes', value: pending, color: '#F59E0B', icon: 'time' as keyof typeof Ionicons.glyphMap },
    { label: 'Canceladas', value: cancelled, color: '#EF4444', icon: 'close-circle' as keyof typeof Ionicons.glyphMap },
  ];

  return (
    <View style={styles.container}>
      {stats.map((stat, index) => (
        <View key={index} style={styles.statCard}>
          <View style={styles.statContent}>
            <View style={styles.statInfo}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
            <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
              <Ionicons name={stat.icon} size={20} color={stat.color} />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 16 * 2 - 12) / 2; // 2 por linha com padding lateral

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  statCard: {
    width: cardWidth,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  statContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statInfo: {
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
