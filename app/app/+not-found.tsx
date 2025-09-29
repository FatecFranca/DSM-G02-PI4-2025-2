import { Ionicons } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                <Ionicons name="car-sport" size={48} color="#3B82F6" />
              </View>
              <Text style={styles.appName}>SmartParking</Text>
            </View>
          </View>

          {/* Main Content */}
          <View style={styles.mainContent}>
            <View style={styles.errorContainer}>

              <Text style={styles.errorTitle}>Página não encontrada</Text>
              <Text style={styles.errorSubtitle}>
                A página que você está procurando não existe ou foi movida.
              </Text>

              <View style={styles.errorCode}>
                <Text style={styles.errorCodeText}>404</Text>
              </View>
            </View>

            {/* Actions */}
            <View style={styles.actions}>
              <Link href="/(tabs)" asChild>
                <TouchableOpacity style={styles.primaryButton}>
                  <Ionicons name="home" size={20} color="#FFFFFF" style={styles.buttonIcon} />
                  <Text style={styles.buttonText}>Ir para o Início</Text>
                </TouchableOpacity>
              </Link>

              <Link href="/" asChild>
                <TouchableOpacity style={styles.secondaryButton}>
                  <Ionicons name="arrow-back" size={20} color="#3B82F6" style={styles.buttonIcon} />
                  <Text style={styles.secondaryButtonText}>Voltar</Text>
                </TouchableOpacity>
              </Link>
            </View>

            {/* Help Section */}
            <View style={styles.helpSection}>
              <Text style={styles.helpTitle}>Precisa de ajuda?</Text>
              <Text style={styles.helpText}>
                Entre em contato conosco se você acredita que isso é um erro.
              </Text>

              <View style={styles.contactButtons}>
                <TouchableOpacity style={styles.contactButton}>
                  <Ionicons name="mail" size={20} color="#3B82F6" />
                  <Text style={styles.contactButtonText}>Email</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.contactButton}>
                  <Ionicons name="call" size={20} color="#3B82F6" />
                  <Text style={styles.contactButtonText}>Telefone</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    paddingTop: height * 0.04,
    paddingBottom: height * 0.06,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#3B82F6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
  },
  errorContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  errorIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  errorTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  errorSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  errorCode: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#3B82F6',
  },
  errorCodeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  actions: {
    marginBottom: 48,
  },
  primaryButton: {
    backgroundColor: '#3B82F6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: 16,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderColor: '#3B82F6',
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  secondaryButtonText: {
    color: '#3B82F6',
    fontWeight: '600',
    fontSize: 16,
  },
  helpSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  helpText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  contactButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  contactButtonText: {
    color: '#3B82F6',
    fontWeight: '500',
    marginLeft: 8,
  },
});
