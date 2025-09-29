import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.container}>
        <View style={styles.logo}>
          <Ionicons name="car" size={24} color="#3B82F6" />
          <Text style={styles.logoText}>Smart Parking</Text>
        </View>
        
        <View style={styles.nav}>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText}>Início</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText}>Sobre</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText}>Funcionalidades</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText}>Contato</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingTop: 50,
    paddingBottom: 16,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginLeft: 8,
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navItem: {
    marginLeft: 24,
  },
  navText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
});
