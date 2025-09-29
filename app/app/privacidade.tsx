import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

interface SecuritySetting {
    id: string;
    title: string;
    description: string;
    icon: keyof typeof Ionicons.glyphMap;
    enabled: boolean;
    onToggle: (value: boolean) => void;
}

interface PrivacySection {
    id: string;
    title: string;
    description: string;
    icon: keyof typeof Ionicons.glyphMap;
    action: () => void;
}

export default function PrivacidadePage() {
    const [securitySettings, setSecuritySettings] = useState<SecuritySetting[]>([
        {
            id: "biometric",
            title: "Autenticação Biométrica",
            description: "Usar impressão digital ou Face ID para login",
            icon: "finger-print",
            enabled: true,
            onToggle: (value) => {
                setSecuritySettings(prev => 
                    prev.map(setting => 
                        setting.id === "biometric" 
                            ? { ...setting, enabled: value }
                            : setting
                    )
                );
            }
        },
        {
            id: "notifications",
            title: "Notificações de Segurança",
            description: "Receber alertas sobre atividades suspeitas",
            icon: "shield-checkmark",
            enabled: true,
            onToggle: (value) => {
                setSecuritySettings(prev => 
                    prev.map(setting => 
                        setting.id === "notifications" 
                            ? { ...setting, enabled: value }
                            : setting
                    )
                );
            }
        },
        {
            id: "location",
            title: "Compartilhamento de Localização",
            description: "Permitir acesso à localização para melhor experiência",
            icon: "location",
            enabled: false,
            onToggle: (value) => {
                setSecuritySettings(prev => 
                    prev.map(setting => 
                        setting.id === "location" 
                            ? { ...setting, enabled: value }
                            : setting
                    )
                );
            }
        },
        {
            id: "analytics",
            title: "Análise de Dados",
            description: "Compartilhar dados anônimos para melhorias",
            icon: "analytics",
            enabled: true,
            onToggle: (value) => {
                setSecuritySettings(prev => 
                    prev.map(setting => 
                        setting.id === "analytics" 
                            ? { ...setting, enabled: value }
                            : setting
                    )
                );
            }
        }
    ]);

    const privacySections: PrivacySection[] = [
        {
            id: "data-collection",
            title: "Coleta de Dados",
            description: "Saiba quais dados coletamos e como os usamos",
            icon: "document-text",
            action: () => Alert.alert("Coleta de Dados", "Informações sobre coleta de dados serão exibidas aqui.")
        },
        {
            id: "data-sharing",
            title: "Compartilhamento de Dados",
            description: "Entenda como seus dados são compartilhados",
            icon: "share-social",
            action: () => Alert.alert("Compartilhamento", "Política de compartilhamento será exibida aqui.")
        },
        {
            id: "data-retention",
            title: "Retenção de Dados",
            description: "Por quanto tempo mantemos seus dados",
            icon: "time",
            action: () => Alert.alert("Retenção", "Política de retenção será exibida aqui.")
        },
        {
            id: "your-rights",
            title: "Seus Direitos",
            description: "Conheça seus direitos sobre seus dados pessoais",
            icon: "person-circle",
            action: () => Alert.alert("Seus Direitos", "Informações sobre seus direitos serão exibidas aqui.")
        }
    ];

    const handleDeleteAccount = () => {
        Alert.alert(
            "Excluir Conta",
            "Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: () => {
                        Alert.alert("Conta Excluída", "Sua conta foi excluída com sucesso.");
                        router.replace("/login");
                    }
                }
            ]
        );
    };

    const handleExportData = () => {
        Alert.alert("Exportar Dados", "Seus dados serão exportados e enviados para seu email em até 24 horas.");
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="arrow-back" size={24} color="#3B82F6" />
                    </TouchableOpacity>
                    <View style={styles.headerContent}>
                        <Text style={styles.title}>Privacidade e Segurança</Text>
                        <Text style={styles.subtitle}>Gerencie suas configurações de privacidade</Text>
                    </View>
                </View>

                {/* Security Settings */}
                <Card style={styles.sectionCard}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="shield" size={24} color="#3B82F6" />
                        <Text style={styles.sectionTitle}>Configurações de Segurança</Text>
                    </View>
                    
                    {securitySettings.map((setting, index) => (
                        <View
                            key={setting.id}
                            style={[
                                styles.settingItem,
                                index === securitySettings.length - 1 && styles.lastSettingItem
                            ]}
                        >
                            <View style={styles.settingLeft}>
                                <View style={styles.settingIcon}>
                                    <Ionicons name={setting.icon} size={20} color="#6B7280" />
                                </View>
                                <View style={styles.settingContent}>
                                    <Text style={styles.settingTitle}>{setting.title}</Text>
                                    <Text style={styles.settingDescription}>{setting.description}</Text>
                                </View>
                            </View>
                            <Switch
                                value={setting.enabled}
                                onValueChange={setting.onToggle}
                                trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
                                thumbColor={setting.enabled ? '#FFFFFF' : '#FFFFFF'}
                            />
                        </View>
                    ))}
                </Card>

                {/* Privacy Information */}
                <Card style={styles.sectionCard}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="document-text" size={24} color="#10B981" />
                        <Text style={styles.sectionTitle}>Informações de Privacidade</Text>
                    </View>
                    
                    {privacySections.map((section, index) => (
                        <TouchableOpacity
                            key={section.id}
                            style={[
                                styles.privacyItem,
                                index === privacySections.length - 1 && styles.lastPrivacyItem
                            ]}
                            onPress={section.action}
                            activeOpacity={0.7}
                        >
                            <View style={styles.privacyLeft}>
                                <View style={styles.privacyIcon}>
                                    <Ionicons name={section.icon} size={20} color="#6B7280" />
                                </View>
                                <View style={styles.privacyContent}>
                                    <Text style={styles.privacyTitle}>{section.title}</Text>
                                    <Text style={styles.privacyDescription}>{section.description}</Text>
                                </View>
                            </View>
                            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
                        </TouchableOpacity>
                    ))}
                </Card>

                {/* Data Management */}
                <Card style={styles.sectionCard}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="settings" size={24} color="#F59E0B" />
                        <Text style={styles.sectionTitle}>Gerenciamento de Dados</Text>
                    </View>
                    
                    <View style={styles.dataActions}>
                        <Button
                            variant="secondary"
                            size="md"
                            onPress={handleExportData}
                            style={styles.dataButton}
                        >
                            <Ionicons name="download" size={16} color="#3B82F6" />
                            <Text style={styles.dataButtonText}>Exportar Meus Dados</Text>
                        </Button>
                        
                        <Button
                            variant="secondary"
                            size="md"
                            onPress={handleDeleteAccount}
                            style={{ ...styles.dataButton, ...styles.deleteButton }}
                        >
                            <Ionicons name="trash" size={16} color="#EF4444" />
                            <Text style={[styles.dataButtonText, styles.deleteButtonText]}>
                                Excluir Conta
                            </Text>
                        </Button>
                    </View>
                </Card>

                {/* Privacy Policy Link */}
                <Card style={styles.policyCard}>
                    <View style={styles.policyContent}>
                        <Ionicons name="document" size={24} color="#6B7280" />
                        <View style={styles.policyText}>
                            <Text style={styles.policyTitle}>Política de Privacidade</Text>
                            <Text style={styles.policyDescription}>
                                Leia nossa política de privacidade completa
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={styles.policyButton}
                            onPress={() => Alert.alert("Política", "Política de privacidade será exibida aqui.")}
                            activeOpacity={0.7}
                        >
                            <Ionicons name="open" size={16} color="#3B82F6" />
                        </TouchableOpacity>
                    </View>
                </Card>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    scrollView: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        paddingBottom: 16,
    },
    backButton: {
        padding: 8,
        marginRight: 12,
    },
    headerContent: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#6B7280',
    },
    sectionCard: {
        marginHorizontal: 20,
        marginBottom: 20,
        padding: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    lastSettingItem: {
        borderBottomWidth: 0,
        paddingBottom: 0,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    settingIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    settingContent: {
        flex: 1,
    },
    settingTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1F2937',
        marginBottom: 2,
    },
    settingDescription: {
        fontSize: 14,
        color: '#6B7280',
    },
    privacyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    lastPrivacyItem: {
        borderBottomWidth: 0,
        paddingBottom: 0,
    },
    privacyLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    privacyIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    privacyContent: {
        flex: 1,
    },
    privacyTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1F2937',
        marginBottom: 2,
    },
    privacyDescription: {
        fontSize: 14,
        color: '#6B7280',
    },
    dataActions: {
        gap: 12,
    },
    dataButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    dataButtonText: {
        color: '#3B82F6',
        fontWeight: '500',
    },
    deleteButton: {
        backgroundColor: '#FEF2F2',
        borderColor: '#FECACA',
    },
    deleteButtonText: {
        color: '#EF4444',
    },
    policyCard: {
        marginHorizontal: 20,
        marginBottom: 20,
        padding: 20,
    },
    policyContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    policyText: {
        flex: 1,
        marginLeft: 12,
    },
    policyTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1F2937',
        marginBottom: 2,
    },
    policyDescription: {
        fontSize: 14,
        color: '#6B7280',
    },
    policyButton: {
        padding: 8,
        backgroundColor: '#EFF6FF',
        borderRadius: 8,
    },
}); 