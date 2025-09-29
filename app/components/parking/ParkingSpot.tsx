import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type SpotStatus = "livre" | "ocupada" | "reservada" | "manutencao";

interface ParkingSpotProps {
  id: string;
  status: SpotStatus;
  style?: any;
}

const statusStyles: Record<SpotStatus, { 
  bg: string; 
  border: string; 
  text: string; 
  label: string;
  icon: string;
}> = {
  livre: { 
    bg: '#DCFCE7', 
    border: '#22C55E', 
    text: '#166534', 
    label: 'Livre',
    icon: 'car-outline'
  },
  ocupada: { 
    bg: '#FEE2E2', 
    border: '#EF4444', 
    text: '#991B1B', 
    label: 'Ocupada',
    icon: 'car'
  },
  reservada: { 
    bg: '#FEF3C7', 
    border: '#EAB308', 
    text: '#92400E', 
    label: 'Reservada',
    icon: 'time-outline'
  },
  manutencao: { 
    bg: '#F3F4F6', 
    border: '#9CA3AF', 
    text: '#374151', 
    label: 'Manutenção',
    icon: 'construct-outline'
  },
};

export default function ParkingSpot({ id, status, style }: ParkingSpotProps) {
  const styles = statusStyles[status];

  return (
    <View style={[parkingSpotStyles.container, { backgroundColor: styles.bg, borderColor: styles.border }, style]}>
      {/* ID Badge */}
      <View style={parkingSpotStyles.idBadge}>
        <Text style={parkingSpotStyles.idText}>{id}</Text>
      </View>

      {/* Icon */}
      <View style={parkingSpotStyles.iconContainer}>
        <Ionicons 
          name={styles.icon as any} 
          size={32} 
          color={styles.text} 
        />
      </View>

      {/* Status Label */}
      <View style={[parkingSpotStyles.statusBadge, { backgroundColor: '#FFFFFF' }]}>
        <Text style={[parkingSpotStyles.statusText, { color: styles.text }]}>
          {styles.label}
        </Text>
      </View>
    </View>
  );
}

const parkingSpotStyles = StyleSheet.create({
  container: {
    width: 120,
    height: 80,
    borderWidth: 2,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  idBadge: {
    position: 'absolute',
    top: -8,
    left: -8,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  idText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBadge: {
    position: 'absolute',
    bottom: -8,
    left: '50%',
    marginLeft: -30,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    minWidth: 60,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
});
