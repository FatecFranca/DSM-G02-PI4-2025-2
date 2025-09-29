import React from 'react';
import { View, StyleSheet } from 'react-native';
import StatCounter from '../ui/StatCounter';

export default function StatsSection() {
  const stats = [
    { number: 99, label: "Precisão dos Sensores", suffix: "%" },
    { number: 24, label: "Monitoramento", suffix: "h" },
    { number: 150, label: "Vagas Gerenciadas", suffix: "+" },
    { number: 98, label: "Satisfação dos Usuários", suffix: "%" }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {stats.map((stat, index) => (
          <StatCounter
            key={index}
            number={stat.number}
            label={stat.label}
            suffix={stat.suffix}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E3A8A',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },
});
