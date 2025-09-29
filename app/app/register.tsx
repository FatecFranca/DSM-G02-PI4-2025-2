import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/ui/Button';

const { width, height } = Dimensions.get('window');

interface RegisterForm {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
}

export default function RegisterPage() {
    const [form, setForm] = useState<RegisterForm>({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const updateForm = (field: keyof RegisterForm, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const validateForm = () => {
        if (!form.name.trim()) {
            Alert.alert('Erro', 'Por favor, digite seu nome completo.');
            return false;
        }

        if (!form.email.trim()) {
            Alert.alert('Erro', 'Por favor, digite seu email.');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            Alert.alert('Erro', 'Por favor, digite um email válido.');
            return false;
        }

        if (!form.phone.trim()) {
            Alert.alert('Erro', 'Por favor, digite seu telefone.');
            return false;
        }

        if (form.password.length < 6) {
            Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
            return false;
        }

        if (form.password !== form.confirmPassword) {
            Alert.alert('Erro', 'As senhas não coincidem.');
            return false;
        }

        return true;
    };

    const handleRegister = async () => {
        if (!validateForm()) return;

        setIsLoading(true);
        
        // Simular registro
        setTimeout(() => {
            setIsLoading(false);
            Alert.alert(
                'Sucesso!', 
                'Conta criada com sucesso! Faça login para continuar.',
                [
                    {
                        text: 'OK',
                        onPress: () => router.back()
                    }
                ]
            );
        }, 2000);
    };

    const handleBackToLogin = () => {
        router.back();
    };

    const formatPhone = (text: string) => {
        // Remove tudo que não é número
        const numbers = text.replace(/\D/g, '');
        
        // Aplica máscara (XX) XXXXX-XXXX
        if (numbers.length <= 2) {
            return numbers;
        } else if (numbers.length <= 7) {
            return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
        } else {
            return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                style={styles.keyboardView}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView 
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={handleBackToLogin} style={styles.backButton}>
                            <Ionicons name="arrow-back" size={24} color="#6B7280" />
                        </TouchableOpacity>
                        <View style={styles.logoContainer}>
                            <View style={styles.logo}>
                                <Ionicons name="car-sport" size={40} color="#3B82F6" />
                            </View>
                            <Text style={styles.appName}>SmartParking</Text>
                        </View>
                    </View>

                    {/* Form */}
                    <View style={styles.formContainer}>
                        <View style={styles.formHeader}>
                            <Text style={styles.title}>Criar Conta</Text>
                            <Text style={styles.subtitle}>Preencha os dados para se cadastrar</Text>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Nome Completo *</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons name="person" size={20} color="#6B7280" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    value={form.name}
                                    onChangeText={(value) => updateForm('name', value)}
                                    placeholder="Digite seu nome completo"
                                    autoCapitalize="words"
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email *</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons name="mail" size={20} color="#6B7280" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    value={form.email}
                                    onChangeText={(value) => updateForm('email', value)}
                                    placeholder="Digite seu email"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Telefone *</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons name="call" size={20} color="#6B7280" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    value={form.phone}
                                    onChangeText={(value) => updateForm('phone', formatPhone(value))}
                                    placeholder="(11) 99999-9999"
                                    keyboardType="phone-pad"
                                    maxLength={15}
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Senha *</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons name="lock-closed" size={20} color="#6B7280" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    value={form.password}
                                    onChangeText={(value) => updateForm('password', value)}
                                    placeholder="Digite sua senha"
                                    secureTextEntry={!showPassword}
                                    autoCapitalize="none"
                                />
                                <TouchableOpacity 
                                    onPress={() => setShowPassword(!showPassword)}
                                    style={styles.eyeIcon}
                                >
                                    <Ionicons 
                                        name={showPassword ? "eye-off" : "eye"} 
                                        size={20} 
                                        color="#6B7280" 
                                    />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.helperText}>Mínimo 6 caracteres</Text>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Confirmar Senha *</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons name="lock-closed" size={20} color="#6B7280" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    value={form.confirmPassword}
                                    onChangeText={(value) => updateForm('confirmPassword', value)}
                                    placeholder="Confirme sua senha"
                                    secureTextEntry={!showConfirmPassword}
                                    autoCapitalize="none"
                                />
                                <TouchableOpacity 
                                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                    style={styles.eyeIcon}
                                >
                                    <Ionicons 
                                        name={showConfirmPassword ? "eye-off" : "eye"} 
                                        size={20} 
                                        color="#6B7280" 
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Button 
                            variant="primary" 
                            size="lg" 
                            onPress={handleRegister}
                            disabled={isLoading}
                            style={styles.registerButton}
                        >
                            {isLoading ? 'Criando conta...' : 'Criar Conta'}
                        </Button>

                        <View style={styles.loginLink}>
                            <Text style={styles.loginText}>Já tem uma conta? </Text>
                            <TouchableOpacity onPress={handleBackToLogin}>
                                <Text style={styles.linkText}>Fazer login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>
                            Ao criar uma conta, você concorda com nossos{' '}
                            <Text style={styles.linkText}>Termos de Uso</Text> e{' '}
                            <Text style={styles.linkText}>Política de Privacidade</Text>
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: height * 0.04,
        paddingBottom: height * 0.02,
        paddingHorizontal: 24,
    },
    backButton: {
        padding: 8,
        marginRight: 16,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#EFF6FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        shadowColor: '#3B82F6',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    appName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    formContainer: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 24,
        borderRadius: 20,
        padding: 32,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    formHeader: {
        alignItems: 'center',
        marginBottom: 32,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: '#FFFFFF',
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#1F2937',
    },
    eyeIcon: {
        padding: 4,
    },
    helperText: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 4,
        marginLeft: 4,
    },
    registerButton: {
        marginTop: 8,
        marginBottom: 24,
    },
    loginLink: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginText: {
        fontSize: 14,
        color: '#6B7280',
    },
    linkText: {
        color: '#3B82F6',
        fontWeight: '500',
    },
    footer: {
        paddingHorizontal: 24,
        paddingTop: 32,
    },
    footerText: {
        fontSize: 12,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 18,
    },
});
