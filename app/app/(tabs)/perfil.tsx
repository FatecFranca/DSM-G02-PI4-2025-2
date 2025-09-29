import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

interface UserProfile {
    name: string;
    email: string;
    phone: string;
    vehiclePlate: string;
    vehicleModel: string;
    memberSince: string;
    totalReservations: number;
    totalSpent: number;
    avatar?: string;
}

const mockUserProfile: UserProfile = {
    name: "João Silva",
    email: "joao.silva@email.com",
    phone: "(11) 99999-9999",
    vehiclePlate: "ABC-1234",
    vehicleModel: "Toyota Corolla 2022",
    memberSince: "Janeiro 2024",
    totalReservations: 15,
    totalSpent: 450.00,
    avatar: undefined
};

interface MenuItem {
    id: string;
    title: string;
    subtitle?: string;
    icon: keyof typeof Ionicons.glyphMap;
    action: () => void;
    showBadge?: boolean;
    badgeValue?: string;
}

export default function PerfilPage() {
    const [userProfile, setUserProfile] = useState<UserProfile>(mockUserProfile);
    const [isEditing, setIsEditing] = useState(false);

    const handleLogout = () => {
        Alert.alert(
            "Sair da Conta",
            "Tem certeza que deseja sair?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Sair",
                    style: "destructive",
                    onPress: () => {
                        // Aqui você implementaria a lógica de logout
                        router.replace("/login");
                    }
                }
            ]
        );
    };

    const handleEditProfile = () => {
        setIsEditing(true);
        // Aqui você implementaria a navegação para a tela de edição
        Alert.alert("Editar Perfil", "Funcionalidade de edição será implementada em breve!");
        setIsEditing(false);
    };

    const handleChangePassword = () => {
        Alert.alert("Alterar Senha", "Funcionalidade será implementada em breve!");
    };

    const handleNotifications = () => {
        Alert.alert("Notificações", "Configurações de notificação serão implementadas em breve!");
    };

    const handlePrivacy = () => {
        router.push("/privacidade");
    };

    const handleHelp = () => {
        router.push("/ajuda");
    };

    const handleAbout = () => {
        router.push("/sobre");
    };

    const menuItems: MenuItem[] = [
        {
            id: "edit",
            title: "Editar Perfil",
            subtitle: "Alterar informações pessoais",
            icon: "person-outline",
            action: handleEditProfile
        },
        {
            id: "password",
            title: "Alterar Senha",
            subtitle: "Modificar senha de acesso",
            icon: "lock-closed-outline",
            action: handleChangePassword
        },
        {
            id: "notifications",
            title: "Notificações",
            subtitle: "Configurar alertas",
            icon: "notifications-outline",
            action: handleNotifications,
            showBadge: true,
            badgeValue: "3"
        },
        {
            id: "privacy",
            title: "Privacidade",
            subtitle: "Privacidade e segurança",
            icon: "shield-outline",
            action: handlePrivacy
        },
        {
            id: "help",
            title: "Ajuda e Suporte",
            subtitle: "Central de ajuda",
            icon: "help-circle-outline",
            action: handleHelp
        },
        {
            id: "about",
            title: "Sobre o App",
            subtitle: "Versão 1.0.0",
            icon: "information-circle-outline",
            action: handleAbout
        }
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Perfil</Text>
                    <Text style={styles.subtitle}>Gerencie sua conta e configurações</Text>
                </View>

                {/* Profile Card */}
                <Card style={styles.profileCard}>
                    <View style={styles.profileHeader}>
                        <View style={styles.avatarContainer}>
                            {userProfile.avatar ? (
                                <Image source={{ uri: userProfile.avatar }} style={styles.avatar} />
                            ) : (
                                <View style={styles.avatarPlaceholder}>
                                    <Ionicons name="person" size={40} color="#6B7280" />
                                </View>
                            )}
                        </View>
                        <View style={styles.profileInfo}>
                            <Text style={styles.userName}>{userProfile.name}</Text>
                            <Text style={styles.userEmail}>{userProfile.email}</Text>
                            <Text style={styles.memberSince}>Membro desde {userProfile.memberSince}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.editButton}
                            onPress={handleEditProfile}
                            activeOpacity={0.7}
                        >
                            <Ionicons name="pencil" size={16} color="#3B82F6" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.profileDetails}>
                        <View style={styles.detailRow}>
                            <Ionicons name="call-outline" size={16} color="#6B7280" />
                            <Text style={styles.detailText}>{userProfile.phone}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Ionicons name="car-outline" size={16} color="#6B7280" />
                            <Text style={styles.detailText}>{userProfile.vehiclePlate}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Ionicons name="car-sport-outline" size={16} color="#6B7280" />
                            <Text style={styles.detailText}>{userProfile.vehicleModel}</Text>
                        </View>
                    </View>
                </Card>

                {/* Stats Cards */}
                <View style={styles.statsContainer}>
                    <Card style={styles.statCard}>
                        <View style={styles.statContent}>
                            <Ionicons name="calendar" size={24} color="#3B82F6" />
                            <Text style={styles.statValue}>{userProfile.totalReservations}</Text>
                            <Text style={styles.statLabel}>Reservas</Text>
                        </View>
                    </Card>
                    <Card style={styles.statCard}>
                        <View style={styles.statContent}>
                            <Ionicons name="wallet" size={24} color="#10B981" />
                            <Text style={styles.statValue}>R$ {userProfile.totalSpent.toFixed(2)}</Text>
                            <Text style={styles.statLabel}>Total Gasto</Text>
                        </View>
                    </Card>
                </View>

                {/* Menu Items */}
                <Card style={styles.menuCard}>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity
                            key={item.id}
                            style={[
                                styles.menuItem,
                                index === menuItems.length - 1 && styles.lastMenuItem
                            ]}
                            onPress={item.action}
                            activeOpacity={0.7}
                        >
                            <View style={styles.menuItemLeft}>
                                <View style={styles.menuIconContainer}>
                                    <Ionicons name={item.icon} size={20} color="#6B7280" />
                                </View>
                                <View style={styles.menuTextContainer}>
                                    <Text style={styles.menuTitle}>{item.title}</Text>
                                    {item.subtitle && (
                                        <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                                    )}
                                </View>
                            </View>
                            <View style={styles.menuItemRight}>
                                {item.showBadge && (
                                    <View style={styles.badge}>
                                        <Text style={styles.badgeText}>{item.badgeValue}</Text>
                                    </View>
                                )}
                                <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
                            </View>
                        </TouchableOpacity>
                    ))}
                </Card>

                {/* Logout Button */}
                <View style={styles.logoutContainer}>
                    <Button
                        variant="secondary"
                        size="lg"
                        onPress={handleLogout}
                        style={styles.logoutButton}
                    >
                        <Ionicons name="log-out-outline" size={20} color="#EF4444" />
                        <Text style={styles.logoutText}>Sair da Conta</Text>
                    </Button>
                </View>
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
        padding: 20,
        paddingBottom: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 16,
        color: '#6B7280',
    },
    profileCard: {
        marginHorizontal: 20,
        marginBottom: 20,
        padding: 20,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    avatarContainer: {
        marginRight: 16,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    avatarPlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#E5E7EB',
    },
    profileInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 2,
    },
    memberSince: {
        fontSize: 12,
        color: '#9CA3AF',
    },
    editButton: {
        padding: 8,
        backgroundColor: '#EFF6FF',
        borderRadius: 8,
    },
    profileDetails: {
        gap: 12,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    detailText: {
        fontSize: 14,
        color: '#374151',
    },
    statsContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginBottom: 20,
        gap: 12,
    },
    statCard: {
        flex: 1,
        padding: 16,
    },
    statContent: {
        alignItems: 'center',
        gap: 8,
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    statLabel: {
        fontSize: 12,
        color: '#6B7280',
        textAlign: 'center',
    },
    menuCard: {
        marginHorizontal: 20,
        marginBottom: 20,
        padding: 0,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    lastMenuItem: {
        borderBottomWidth: 0,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    menuIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    menuTextContainer: {
        flex: 1,
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1F2937',
        marginBottom: 2,
    },
    menuSubtitle: {
        fontSize: 14,
        color: '#6B7280',
    },
    menuItemRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    badge: {
        backgroundColor: '#EF4444',
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 2,
        minWidth: 20,
        alignItems: 'center',
    },
    badgeText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    logoutContainer: {
        marginHorizontal: 20,
        marginBottom: 20,
    },
    logoutButton: {
        backgroundColor: '#FEF2F2',
        borderColor: '#FECACA',
    },
    logoutText: {
        color: '#EF4444',
        fontWeight: '600',
        marginLeft: 8,
    },
}); 