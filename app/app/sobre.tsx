import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AboutSectionsCard from '../components/sections/AboutSectionsCard';
import AppInfoCard from '../components/sections/AppInfoCard';
import DeveloperCard from '../components/sections/DeveloperCard';
import TechnologiesCard from '../components/sections/TechnologiesCard';
import CustomModal from '../components/ui/CustomModal';

interface AppInfo {
    name: string;
    version: string;
    build: string;
    description: string;
    developer: string;
    website: string;
    email: string;
}

interface AboutSection {
    id: string;
    title: string;
    description: string;
    icon: keyof typeof Ionicons.glyphMap;
    action: () => void;
}

interface Technology {
    name: string;
    version: string;
}

const appInfo: AppInfo = {
    name: "Smart Parking",
    version: "1.0.0",
    build: "2024.1.0",
    description: "Aplicativo inteligente para gerenciamento de estacionamentos e reservas de vagas.",
    developer: "FATEC - DSM 4º Semestre",
    website: "https://smartparking.com.br",
    email: "contato@smartparking.com.br"
};

const technologies: Technology[] = [
    { name: "React Native", version: "0.72.0" },
    { name: "Expo", version: "49.0.0" },
    { name: "TypeScript", version: "5.0.0" },
    { name: "React Navigation", version: "6.0.0" },
];

export default function SobrePage() {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState<{
        title: string;
        content: React.ReactNode;
    } | null>(null);

    const showModal = (title: string, content: React.ReactNode) => {
        setModalContent({ title, content });
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
        setModalContent(null);
    };

    const aboutSections: AboutSection[] = [
        {
            id: "features",
            title: "Funcionalidades",
            description: "Conheça todas as funcionalidades do app",
            icon: "star",
            action: () => {
                showModal("Funcionalidades do Smart Parking", (
                    <ScrollView style={styles.modalContent}>
                        <Text style={styles.modalText}>
                            <Text style={styles.modalBold}>• Gestão de Vagas:</Text> Visualize e gerencie todas as vagas dos estacionamentos{'\n\n'}
                            <Text style={styles.modalBold}>• Sistema de Reservas:</Text> Faça reservas de vagas com data e horário específicos{'\n\n'}
                            <Text style={styles.modalBold}>• Minhas Reservas:</Text> Acompanhe todas as suas reservas ativas e históricas{'\n\n'}
                            <Text style={styles.modalBold}>• Filtros e Busca:</Text> Encontre vagas por status, setor ou número{'\n\n'}
                            <Text style={styles.modalBold}>• Perfil Completo:</Text> Gerencie suas informações pessoais e veículo{'\n\n'}
                            <Text style={styles.modalBold}>• Autenticação Segura:</Text> Login com email e senha{'\n\n'}
                            <Text style={styles.modalBold}>• Interface Intuitiva:</Text> Design moderno e fácil de usar
                        </Text>
                    </ScrollView>
                ));
            }
        },
        {
            id: "changelog",
            title: "Histórico de Versões",
            description: "Veja as mudanças em cada versão",
            icon: "git-branch",
            action: () => {
                showModal("Histórico de Versões", (
                    <ScrollView style={styles.modalContent}>
                        <Text style={styles.modalText}>
                            <Text style={styles.modalBold}>Versão 1.0.0 (Agosto 2025)</Text>{'\n'}
                            • Lançamento inicial do app{'\n'}
                            • Sistema de gestão de vagas{'\n'}
                            • Funcionalidade de reservas{'\n'}
                            • Perfil do usuário{'\n'}
                            • Interface responsiva{'\n\n'}
                            <Text style={styles.modalBold}>Versão 1.0.1 (Setembro 2025)</Text>{'\n'}
                            • Correções de bugs{'\n'}
                            • Melhorias na performance{'\n'}
                            • Atualizações de segurança{'\n\n'}
                            <Text style={styles.modalBold}>Versão 1.1.0 (Outubro 2025)</Text>{'\n'}
                            • Novos filtros de busca{'\n'}
                            • Melhorias na interface
                        </Text>
                    </ScrollView>
                ));
            }
        },
        {
            id: "terms",
            title: "Termos de Uso",
            description: "Leia os termos e condições de uso",
            icon: "document-text",
            action: () => {
                showModal("Termos de Uso", (
                    <ScrollView style={styles.modalContent}>
                        <Text style={styles.modalText}>
                            <Text style={styles.modalBold}>1. ACEITAÇÃO DOS TERMOS</Text>{'\n'}
                            Ao usar o Smart Parking, você concorda com estes termos.{'\n\n'}
                            <Text style={styles.modalBold}>2. USO DO SERVIÇO</Text>{'\n'}
                            • Use o app apenas para reservar vagas de estacionamento{'\n'}
                            • Não use para atividades ilegais{'\n'}
                            • Mantenha suas credenciais seguras{'\n\n'}
                            <Text style={styles.modalBold}>3. RESERVAS</Text>{'\n'}
                            • As reservas são válidas apenas no horário especificado{'\n'}
                            • Cancelamentos devem ser feitos com antecedência{'\n'}
                            • Pagamentos são processados conforme política do estacionamento{'\n\n'}
                            <Text style={styles.modalBold}>4. RESPONSABILIDADES</Text>{'\n'}
                            • O usuário é responsável por seu veículo{'\n'}
                            • O app não se responsabiliza por danos ou roubos{'\n\n'}
                            <Text style={styles.modalBold}>5. MODIFICAÇÕES</Text>{'\n'}
                            Estes termos podem ser alterados a qualquer momento.
                        </Text>
                    </ScrollView>
                ));
            }
        },
        {
            id: "privacy",
            title: "Política de Privacidade",
            description: "Nossa política de privacidade",
            icon: "shield-checkmark",
            action: () => router.push("/privacidade" as any)
        },
        {
            id: "support",
            title: "Suporte Técnico",
            description: "Entre em contato com nosso suporte",
            icon: "help-circle",
            action: () => {
                showModal("Suporte Técnico", (
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>
                            Entre em contato conosco:{'\n\n'}
                            <Text style={styles.modalBold}>📧 Gabriel Pessoni:</Text>{'\n'}
                            gabriel.pessoni@fatec.sp.gov.br{'\n\n'}
                            <Text style={styles.modalBold}>📧 Luis Fernando:</Text>{'\n'}
                            luis.fernando@fatec.sp.gov.br{'\n\n'}
                            <Text style={styles.modalBold}>📞 Telefone:</Text>{'\n'}
                            (16) 99998-0213{'\n\n'}
                            <Text style={styles.modalBold}>⏰ Horário de Atendimento:</Text>{'\n'}
                            Segunda a Sexta: 8h às 18h{'\n'}
                            Sábado: 8h às 12h{'\n\n'}
                            <Text style={styles.modalBold}>Tempo de resposta:</Text> até 24 horas
                        </Text>
                        
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={() => {
                                    Alert.alert("Copiado", "Email copiado para a área de transferência!");
                                }}
                            >
                                <Ionicons name="copy" size={16} color="#FFFFFF" />
                                <Text style={styles.modalButtonText}>Copiar Email</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity
                                style={[styles.modalButton, styles.modalButtonSecondary]}
                                onPress={() => {
                                    Linking.openURL('tel:16999980213');
                                }}
                            >
                                <Ionicons name="call" size={16} color="#3B82F6" />
                                <Text style={styles.modalButtonTextSecondary}>Ligar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ));
            }
        }
    ];

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
                        <Text style={styles.title}>Sobre o App</Text>
                        <Text style={styles.subtitle}>Informações sobre o Smart Parking</Text>
                    </View>
                </View>

                {/* App Info Card */}
                <AppInfoCard appInfo={appInfo} />

                {/* Developer Info */}
                <DeveloperCard 
                    developer={{
                        name: appInfo.developer,
                        website: appInfo.website,
                        email: appInfo.email
                    }}
                    description="Projeto desenvolvido pelos alunos Gabriel Pessoni e Luis Fernando do 4º semestre do curso de Desenvolvimento de Software Multiplataforma da FATEC."
                />

                {/* About Sections */}
                <AboutSectionsCard sections={aboutSections} />

                {/* Technologies */}
                <TechnologiesCard technologies={technologies} />

                {/* Copyright */}
                <View style={styles.copyright}>
                    <Text style={styles.copyrightText}>
                        © 2024 Smart Parking. Todos os direitos reservados.
                    </Text>
                    <Text style={styles.copyrightText}>
                        Desenvolvido com ❤️ pela equipe FATEC DSM
                    </Text>
                </View>
            </ScrollView>

            {/* Custom Modal */}
            <CustomModal
                visible={modalVisible}
                title={modalContent?.title || ""}
                onClose={hideModal}
            >
                {modalContent?.content}
            </CustomModal>
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
    copyright: {
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    copyrightText: {
        fontSize: 12,
        color: '#9CA3AF',
        textAlign: 'center',
        marginBottom: 4,
    },
    // Modal Content Styles
    modalContent: {
        padding: 20,
        flex: 1,
    },
    modalText: {
        fontSize: 14,
        color: '#374151',
        lineHeight: 20,
    },
    modalBold: {
        fontWeight: 'bold',
        color: '#1F2937',
    },
    modalButtons: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 20,
    },
    modalButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3B82F6',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        gap: 8,
    },
    modalButtonSecondary: {
        backgroundColor: '#EFF6FF',
        borderWidth: 1,
        borderColor: '#3B82F6',
    },
    modalButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 14,
    },
    modalButtonTextSecondary: {
        color: '#3B82F6',
        fontWeight: '600',
        fontSize: 14,
    },
}); 