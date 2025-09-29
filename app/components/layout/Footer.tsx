import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <View style={styles.container}>
        <View style={styles.section}>
          <View style={styles.logo}>
            <Ionicons name="car" size={24} color="#3B82F6" />
            <Text style={styles.logoText}>Smart Parking</Text>
          </View>
          <Text style={styles.description}>
            Sistema inteligente de estacionamento com tecnologia IoT
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contato</Text>
          <Text style={styles.contactText}>contato@smartparking.com</Text>
          <Text style={styles.contactText}>+55 (11) 99999-9999</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Redes Sociais</Text>
          <View style={styles.socialLinks}>
            <Ionicons name="logo-facebook" size={24} color="#6B7280" />
            <Ionicons name="logo-twitter" size={24} color="#6B7280" />
            <Ionicons name="logo-linkedin" size={24} color="#6B7280" />
          </View>
        </View>
      </View>
      
      <View style={styles.bottom}>
        <Text style={styles.copyright}>
          © 2024 Smart Parking. Todos os direitos reservados.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#1F2937',
    paddingTop: 40,
    paddingBottom: 20,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  section: {
    flex: 1,
    marginRight: 20,
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  description: {
    color: '#9CA3AF',
    fontSize: 14,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  contactText: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 4,
  },
  socialLinks: {
    flexDirection: 'row',
    gap: 16,
  },
  bottom: {
    borderTopWidth: 1,
    borderTopColor: '#374151',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  copyright: {
    color: '#9CA3AF',
    fontSize: 14,
    textAlign: 'center',
  },
});
