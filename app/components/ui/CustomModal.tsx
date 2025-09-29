import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

interface CustomModalProps {
    visible: boolean;
    title: string;
    children: React.ReactNode;
    onClose: () => void;
}

export default function CustomModal({ visible, title, children, onClose }: CustomModalProps) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>{title}</Text>
                        <TouchableOpacity
                            style={styles.modalCloseButton}
                            onPress={onClose}
                            activeOpacity={0.7}
                        >
                            <Ionicons name="close" size={24} color="#6B7280" />
                        </TouchableOpacity>
                    </View>
                    
                    {children}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        margin: 20,
        maxHeight: '80%',
        width: '90%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937',
        flex: 1,
    },
    modalCloseButton: {
        padding: 4,
    },
}); 