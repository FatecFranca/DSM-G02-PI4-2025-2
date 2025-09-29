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
import CustomModal from '../components/ui/CustomModal';

interface HelpSection {
    id: string;
    title: string;
    description: string;
    icon: keyof typeof Ionicons.glyphMap;
    action: () => void;
}

interface FAQItem {
    id: string;
    question: string;
    answer: string;
}

const faqItems: FAQItem[] = [
    {
        id: "1",
        question: "Como fazer uma reserva de vaga?",
        answer: "Acesse a aba 'Reservar', selecione a data e horário desejados, escolha uma vaga disponível e confirme a reserva. O pagamento será processado automaticamente."
    },
    {
        id: "2",
        question: "Posso cancelar uma reserva?",
        answer: "Sim! Acesse 'Minhas Reservas', encontre a reserva desejada e toque em 'Cancelar'. Cancelamentos com até 2 horas de antecedência são gratuitos."
    },
    {
        id: "3",
        question: "Como funciona o sistema de pagamento?",
        answer: "Aceitamos cartões de crédito, débito e PIX. O pagamento é processado no momento da reserva e você receberá um comprovante por email."
    },
    {
        id: "4",
        question: "O que significa cada cor das vagas?",
        answer: "🟢 Verde: Vaga livre | 🔴 Vermelho: Vaga ocupada | 🟡 Amarelo: Vaga reservada | ⚫ Cinza: Vaga em manutenção"
    },
    {
        id: "5",
        question: "Como alterar meus dados pessoais?",
        answer: "Acesse 'Perfil' > 'Editar Perfil' e modifique as informações desejadas. As alterações são salvas automaticamente."
    },
    {
        id: "6",
        question: "O app funciona offline?",
        answer: "Não, o Smart Parking requer conexão com a internet para sincronizar dados em tempo real e processar reservas."
    },
    {
        id: "7",
        question: "Como reportar um problema?",
        answer: "Entre em contato conosco através do suporte técnico em 'Perfil' > 'Ajuda e Suporte' ou envie um email diretamente."
    },
    {
        id: "8",
        question: "Posso reservar para outra pessoa?",
        answer: "Sim, mas você será responsável pelo pagamento e pela vaga. Certifique-se de que a pessoa autorizada estará no local no horário da reserva."
    }
];

export default function AjudaPage() {
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

    const helpSections: HelpSection[] = [
        {
            id: "inicio",
            title: "Tela Inicial",
            description: "Visão geral e funcionalidades principais",
            icon: "home",
            action: () => {
                showModal("Tela Inicial", (
                    <ScrollView style={styles.modalContent}>
                        <Text style={styles.modalText}>
                            <Text style={styles.modalBold}>🏠 Tela Inicial</Text>{'\n\n'}
                            A tela inicial é o ponto de partida do Smart Parking, oferecendo:{'\n\n'}
                            <Text style={styles.modalBold}>• Dashboard Resumido:</Text>{'\n'}
                            - Próximas reservas{'\n'}
                            - Vagas disponíveis próximas{'\n'}
                            - Notificações importantes{'\n\n'}
                            <Text style={styles.modalBold}>• Acesso Rápido:</Text>{'\n'}
                            - Botão para nova reserva{'\n'}
                            - Visualização de reservas ativas{'\n'}
                            - Status do estacionamento{'\n\n'}
                            <Text style={styles.modalBold}>• Navegação:</Text>{'\n'}
                            - Menu inferior para todas as telas{'\n'}
                            - Notificações em tempo real{'\n'}
                            - Atualizações automáticas
                        </Text>
                    </ScrollView>
                ));
            }
        },
        {
            id: "vagas",
            title: "Gestão de Vagas",
            description: "Como visualizar e gerenciar vagas",
            icon: "car",
            action: () => {
                showModal("Gestão de Vagas", (
                    <ScrollView style={styles.modalContent}>
                        <Text style={styles.modalText}>
                            <Text style={styles.modalBold}>🚗 Gestão de Vagas</Text>{'\n\n'}
                            Esta tela permite visualizar e gerenciar todas as vagas:{'\n\n'}
                            <Text style={styles.modalBold}>• Visualização por Setores:</Text>{'\n'}
                            - Setor A e Setor B organizados{'\n'}
                            - Layout em grid com vagas numeradas{'\n'}
                            - Cores indicando status{'\n\n'}
                            <Text style={styles.modalBold}>• Filtros Disponíveis:</Text>{'\n'}
                            - Por status (Livre, Ocupada, Reservada, Manutenção){'\n'}
                            - Por setor (A, B ou Todos){'\n'}
                            - Busca por número da vaga{'\n\n'}
                            <Text style={styles.modalBold}>• Estatísticas:</Text>{'\n'}
                            - Total de vagas{'\n'}
                            - Vagas livres{'\n'}
                            - Vagas ocupadas{'\n'}
                            - Vagas em manutenção{'\n\n'}
                            <Text style={styles.modalBold}>• Ações:</Text>{'\n'}
                            - Atualizar dados (pull-to-refresh){'\n'}
                            - Adicionar nova vaga{'\n'}
                            - Visualizar detalhes
                        </Text>
                    </ScrollView>
                ));
            }
        },
        {
            id: "reserva",
            title: "Fazer Reserva",
            description: "Como reservar uma vaga",
            icon: "calendar",
            action: () => {
                showModal("Fazer Reserva", (
                    <ScrollView style={styles.modalContent}>
                        <Text style={styles.modalText}>
                            <Text style={styles.modalBold}>📅 Fazer Reserva</Text>{'\n\n'}
                            Processo completo para reservar uma vaga:{'\n\n'}
                            <Text style={styles.modalBold}>• Seleção de Data e Horário:</Text>{'\n'}
                            - Calendário interativo{'\n'}
                            - Horários disponíveis{'\n'}
                            - Duração da reserva{'\n\n'}
                            <Text style={styles.modalBold}>• Escolha da Vaga:</Text>{'\n'}
                            - Visualização em tempo real{'\n'}
                            - Filtros por setor{'\n'}
                            - Informações da vaga{'\n\n'}
                            <Text style={styles.modalBold}>• Confirmação:</Text>{'\n'}
                            - Revisão dos dados{'\n'}
                            - Seleção do método de pagamento{'\n'}
                            - Confirmação final{'\n\n'}
                            <Text style={styles.modalBold}>• Após a Reserva:</Text>{'\n'}
                            - Comprovante enviado por email{'\n'}
                            - Notificação de confirmação{'\n'}
                            - Acesso à reserva em 'Minhas Reservas'
                        </Text>
                    </ScrollView>
                ));
            }
        },
        {
            id: "minhas-reservas",
            title: "Minhas Reservas",
            description: "Gerenciar reservas ativas e históricas",
            icon: "calendar",
            action: () => {
                showModal("Minhas Reservas", (
                    <ScrollView style={styles.modalContent}>
                        <Text style={styles.modalText}>
                            <Text style={styles.modalBold}>📋 Minhas Reservas</Text>{'\n\n'}
                            Central para gerenciar todas as suas reservas:{'\n\n'}
                            <Text style={styles.modalBold}>• Reservas Ativas:</Text>{'\n'}
                            - Próximas reservas{'\n'}
                            - Status em tempo real{'\n'}
                            - Horário de chegada{'\n\n'}
                            <Text style={styles.modalBold}>• Histórico:</Text>{'\n'}
                            - Reservas passadas{'\n'}
                            - Comprovantes{'\n'}
                            - Valores pagos{'\n\n'}
                            <Text style={styles.modalBold}>• Ações Disponíveis:</Text>{'\n'}
                            - Cancelar reserva{'\n'}
                            - Renovar reserva{'\n'}
                            - Ver detalhes{'\n'}
                            - Baixar comprovante{'\n\n'}
                            <Text style={styles.modalBold}>• Filtros:</Text>{'\n'}
                            - Por status{'\n'}
                            - Por período{'\n'}
                            - Por setor
                        </Text>
                    </ScrollView>
                ));
            }
        },
        {
            id: "perfil",
            title: "Perfil e Configurações",
            description: "Gerenciar conta e preferências",
            icon: "person",
            action: () => {
                showModal("Perfil e Configurações", (
                    <ScrollView style={styles.modalContent}>
                        <Text style={styles.modalText}>
                            <Text style={styles.modalBold}>👤 Perfil e Configurações</Text>{'\n\n'}
                            Área para gerenciar sua conta e preferências:{'\n\n'}
                            <Text style={styles.modalBold}>• Informações Pessoais:</Text>{'\n'}
                            - Nome e email{'\n'}
                            - Telefone de contato{'\n'}
                            - Foto de perfil{'\n\n'}
                            <Text style={styles.modalBold}>• Dados do Veículo:</Text>{'\n'}
                            - Placa do veículo{'\n'}
                            - Modelo e ano{'\n'}
                            - Cor do veículo{'\n\n'}
                            <Text style={styles.modalBold}>• Estatísticas:</Text>{'\n'}
                            - Total de reservas{'\n'}
                            - Valor total gasto{'\n'}
                            - Tempo de uso{'\n\n'}
                            <Text style={styles.modalBold}>• Configurações:</Text>{'\n'}
                            - Notificações{'\n'}
                            - Privacidade{'\n'}
                            - Segurança{'\n'}
                            - Preferências de pagamento
                        </Text>
                    </ScrollView>
                ));
            }
        },
        {
            id: "faq",
            title: "Perguntas Frequentes",
            description: "Respostas para dúvidas comuns",
            icon: "help-circle",
            action: () => {
                showModal("Perguntas Frequentes", (
                    <ScrollView style={styles.modalContent}>
                        <Text style={styles.modalText}>
                            <Text style={styles.modalBold}>❓ Perguntas Frequentes</Text>{'\n\n'}
                            {faqItems.map((item, index) => (
                                <View key={item.id}>
                                    <Text style={styles.modalBold}>{index + 1}. {item.question}</Text>{'\n'}
                                    <Text style={styles.modalAnswer}>{item.answer}</Text>{'\n\n'}
                                </View>
                            ))}
                        </Text>
                    </ScrollView>
                ));
            }
        },
        {
            id: "contato",
            title: "Contato e Suporte",
            description: "Como entrar em contato conosco",
            icon: "call",
            action: () => {
                showModal("Contato e Suporte", (
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>
                            <Text style={styles.modalBold}>📞 Contato e Suporte</Text>{'\n\n'}
                            Entre em contato conosco:{'\n\n'}
                            <Text style={styles.modalBold}>📧 Email:</Text>{'\n'}
                            gabriel.pessoni@fatec.sp.gov.br{'\n'}
                            luis.fernando@fatec.sp.gov.br{'\n\n'}
                            <Text style={styles.modalBold}>📱 Telefone:</Text>{'\n'}
                            (16) 99998-0213{'\n\n'}
                            <Text style={styles.modalBold}>⏰ Horário de Atendimento:</Text>{'\n'}
                            Segunda a Sexta: 8h às 18h{'\n'}
                            Sábado: 8h às 12h{'\n\n'}
                            <Text style={styles.modalBold}>📋 Tipos de Suporte:</Text>{'\n'}
                            • Dúvidas sobre reservas{'\n'}
                            • Problemas técnicos{'\n'}
                            • Sugestões de melhorias{'\n'}
                            • Reportar bugs{'\n'}
                            • Solicitar reembolso
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
                        <Text style={styles.title}>Ajuda e Suporte</Text>
                        <Text style={styles.subtitle}>Tire suas dúvidas e aprenda a usar o app</Text>
                    </View>
                </View>

                {/* Quick Help */}
                <View style={styles.quickHelpContainer}>
                    <View style={styles.quickHelpCard}>
                        <Ionicons name="bulb" size={32} color="#F59E0B" />
                        <Text style={styles.quickHelpTitle}>Dica Rápida</Text>
                        <Text style={styles.quickHelpText}>
                            Use os filtros na tela de vagas para encontrar rapidamente o que você precisa!
                        </Text>
                    </View>
                </View>

                {/* Help Sections */}
                <View style={styles.sectionsContainer}>
                    <Text style={styles.sectionsTitle}>Guias de Uso</Text>

                    {helpSections.map((section, index) => (
                        <TouchableOpacity
                            key={section.id}
                            style={[
                                styles.sectionItem,
                                index === helpSections.length - 1 && styles.lastSectionItem
                            ]}
                            onPress={section.action}
                            activeOpacity={0.7}
                        >
                            <View style={styles.sectionLeft}>
                                <View style={styles.sectionIcon}>
                                    <Ionicons name={section.icon} size={24} color="#3B82F6" />
                                </View>
                                <View style={styles.sectionContent}>
                                    <Text style={styles.sectionTitle}>{section.title}</Text>
                                    <Text style={styles.sectionDescription}>{section.description}</Text>
                                </View>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Quick Actions */}
                <View style={styles.quickActionsContainer}>
                    <Text style={styles.quickActionsTitle}>Ações Rápidas</Text>

                    <View style={styles.quickActionsGrid}>
                        <TouchableOpacity
                            style={styles.quickActionButton}
                            onPress={() => router.push("/reserva")}
                            activeOpacity={0.7}
                        >
                            <Ionicons name="calendar" size={24} color="#3B82F6" />
                            <Text style={styles.quickActionText}>Nova Reserva</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.quickActionButton}
                            onPress={() => router.push("/(tabs)/minhas-reservas")}
                            activeOpacity={0.7}
                        >
                            <Ionicons name="calendar" size={24} color="#10B981" />
                            <Text style={styles.quickActionText}>Minhas Reservas</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.quickActionButton}
                            onPress={() => router.push("/(tabs)/vagas")}
                            activeOpacity={0.7}
                        >
                            <Ionicons name="car" size={24} color="#F59E0B" />
                            <Text style={styles.quickActionText}>Ver Vagas</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.quickActionButton}
                            onPress={() => router.push("/sobre")}
                            activeOpacity={0.7}
                        >
                            <Ionicons name="information-circle" size={24} color="#8B5CF6" />
                            <Text style={styles.quickActionText}>Sobre o App</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Emergency Contact */}
                <View style={styles.emergencyContainer}>
                    <View style={styles.emergencyCard}>
                        <Ionicons name="warning" size={32} color="#EF4444" />
                        <Text style={styles.emergencyTitle}>Problema Urgente?</Text>
                        <Text style={styles.emergencyText}>
                            Entre em contato imediatamente pelo telefone
                        </Text>
                        <TouchableOpacity
                            style={styles.emergencyButton}
                            onPress={() => Linking.openURL('tel:16999980213')}
                            activeOpacity={0.7}
                        >
                            <Ionicons name="call" size={20} color="#FFFFFF" />
                            <Text style={styles.emergencyButtonText}>Ligar Agora</Text>
                        </TouchableOpacity>
                    </View>
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
    quickHelpContainer: {
        marginHorizontal: 20,
        marginBottom: 24,
    },
    quickHelpCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    quickHelpTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
        marginTop: 12,
        marginBottom: 8,
    },
    quickHelpText: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 20,
    },
    sectionsContainer: {
        marginHorizontal: 20,
        marginBottom: 24,
    },
    sectionsTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 16,
    },
    sectionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    lastSectionItem: {
        marginBottom: 0,
    },
    sectionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    sectionIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#EFF6FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    sectionContent: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 4,
    },
    sectionDescription: {
        fontSize: 14,
        color: '#6B7280',
    },
    quickActionsContainer: {
        marginHorizontal: 20,
        marginBottom: 24,
    },
    quickActionsTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 16,
    },
    quickActionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    quickActionButton: {
        flex: 1,
        minWidth: '45%',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    quickActionText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#1F2937',
        marginTop: 8,
        textAlign: 'center',
    },
    emergencyContainer: {
        marginHorizontal: 20,
        marginBottom: 24,
    },
    emergencyCard: {
        backgroundColor: '#FEF2F2',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FECACA',
    },
    emergencyTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#991B1B',
        marginTop: 12,
        marginBottom: 8,
    },
    emergencyText: {
        fontSize: 14,
        color: '#7F1D1D',
        textAlign: 'center',
        marginBottom: 16,
    },
    emergencyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EF4444',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        gap: 8,
    },
    emergencyButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 14,
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
    modalAnswer: {
        fontSize: 14,
        color: '#6B7280',
        marginLeft: 8,
        marginBottom: 16,
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