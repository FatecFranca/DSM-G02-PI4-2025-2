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
import { useAuth } from '../contexts/AuthContext';

const { width, height } = Dimensions.get('window');

interface LoginForm {
    email: string;
    password: string;
}

export default function LoginPage() {
    const { login, isLoading } = useAuth();
    const [form, setForm] = useState<LoginForm>({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    const updateForm = (field: keyof LoginForm, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleLogin = async () => {
        if (!form.email || !form.password) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        const success = await login(form.email, form.password);
        
        if (!success) {
            Alert.alert('Erro', 'Email ou senha incorretos.');
        }
        // Se o login for bem-sucedido, o usuário será automaticamente redirecionado
        // devido ao controle de navegação no _layout.tsx
    };

    const handleRegister = () => {
        router.push('/register');
    };

    const handleForgotPassword = () => {
        Alert.alert('Recuperar Senha', 'Funcionalidade em desenvolvimento');
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
                        <View style={styles.logoContainer}>
                            <View style={styles.logo}>
                                <Ionicons name="car-sport" size={48} color="#3B82F6" />
                            </View>
                            <Text style={styles.appName}>SmartParking</Text>
                            <Text style={styles.tagline}>Estacionamento Inteligente</Text>
                        </View>
                    </View>

                    {/* Form */}
                    <View style={styles.formContainer}>
                        <View style={styles.formHeader}>
                            <Text style={styles.title}>Bem-vindo de volta!</Text>
                            <Text style={styles.subtitle}>Faça login para continuar</Text>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email</Text>
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
                            <Text style={styles.label}>Senha</Text>
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
                        </View>

                        <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPassword}>
                            <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
                        </TouchableOpacity>

                        <Button 
                            variant="primary" 
                            size="lg" 
                            onPress={handleLogin}
                            disabled={isLoading}
                            style={styles.loginButton}
                        >
                            {isLoading ? 'Entrando...' : 'Entrar'}
                        </Button>

                        <View style={styles.divider}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>ou</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        <Button 
                            variant="outline" 
                            size="lg" 
                            onPress={handleRegister}
                            style={styles.registerButton}
                        >
                            Criar conta
                        </Button>
                    </View>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>
                            Ao continuar, você concorda com nossos{' '}
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
        alignItems: 'center',
        paddingTop: height * 0.08,
        paddingBottom: height * 0.04,
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
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 4,
    },
    tagline: {
        fontSize: 16,
        color: '#6B7280',
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
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 24,
    },
    forgotPasswordText: {
        fontSize: 14,
        color: '#3B82F6',
        fontWeight: '500',
    },
    loginButton: {
        marginBottom: 24,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E5E7EB',
    },
    dividerText: {
        marginHorizontal: 16,
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '500',
    },
    registerButton: {
        marginBottom: 8,
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
    linkText: {
        color: '#3B82F6',
        fontWeight: '500',
    },
});
