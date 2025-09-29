import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/ui/Button';

const { width } = Dimensions.get('window');

interface ReservationForm {
    user: string;
    vehicle: string;
    spot: string;
    startDate: Date | null;
    endDate: Date | null;
    price: string;
    notes: string;
}

export default function ReservaPage() {
    const [form, setForm] = useState<ReservationForm>({
        user: '',
        vehicle: '',
        spot: '',
        startDate: null,
        endDate: null,
        price: '0,00',
        notes: ''
    });

    const [showSpotSelector, setShowSpotSelector] = useState(false);
    const [selectedSpot, setSelectedSpot] = useState('');
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);

    // Dados simulados de vagas disponíveis
    const availableSpots = [
        { id: "A01", sector: "A", status: "livre" },
        { id: "A04", sector: "A", status: "livre" },
        { id: "B01", sector: "B", status: "livre" },
        { id: "B04", sector: "B", status: "livre" },
        { id: "C01", sector: "C", status: "livre" },
        { id: "C02", sector: "C", status: "livre" },
    ];

    const updateForm = (field: keyof ReservationForm, value: any) => {
        setForm(prev => ({ ...prev, [field]: value }));
        
        // Recalcular preço quando as datas mudam
        if (field === 'startDate' || field === 'endDate') {
            setTimeout(() => calculatePrice(), 100);
        }
    };

    const selectSpot = (spotId: string) => {
        setSelectedSpot(spotId);
        updateForm('spot', spotId);
        setShowSpotSelector(false);
    };

    const calculatePrice = () => {
        if (!form.startDate || !form.endDate) {
            updateForm('price', '0,00');
            return;
        }

        const start = new Date(form.startDate);
        const end = new Date(form.endDate);
        
        // Verificar se a data final é posterior à inicial
        if (end <= start) {
            updateForm('price', '0,00');
            return;
        }

        const diffInMs = end.getTime() - start.getTime();
        const diffInHours = diffInMs / (1000 * 60 * 60);
        
        const pricePerHour = 5; // R$ 5,00 por hora
        const total = diffInHours * pricePerHour;
        
        updateForm('price', total.toFixed(2).replace('.', ','));
    };

    const formatDate = (date: Date | null) => {
        if (!date) return '';
        return date.toLocaleDateString('pt-BR');
    };

    const formatTime = (date: Date | null) => {
        if (!date) return '';
        return date.toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    };

    const handleStartDateChange = (event: any, selectedDate?: Date) => {
        setShowStartPicker(Platform.OS === 'ios');
        if (selectedDate) {
            updateForm('startDate', selectedDate);
        }
    };

    const handleEndDateChange = (event: any, selectedDate?: Date) => {
        setShowEndPicker(Platform.OS === 'ios');
        if (selectedDate) {
            updateForm('endDate', selectedDate);
        }
    };

    const handleSubmit = () => {
        // Validação básica
        if (!form.user || !form.vehicle || !form.spot || !form.startDate || !form.endDate) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        if (form.endDate <= form.startDate!) {
            Alert.alert('Erro', 'A data/hora de fim deve ser posterior à data/hora de início.');
            return;
        }

        // Simular criação da reserva
        Alert.alert(
            'Reserva Criada',
            `Reserva criada com sucesso!\n\nVaga: ${form.spot}\nUsuário: ${form.user}\nVeículo: ${form.vehicle}\nPreço: R$ ${form.price}`,
            [
                {
                    text: 'OK',
                    onPress: () => {
                        // Limpar formulário
                        setForm({
                            user: '',
                            vehicle: '',
                            spot: '',
                            startDate: null,
                            endDate: null,
                            price: '0,00',
                            notes: ''
                        });
                        setSelectedSpot('');
                    }
                }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView 
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Nova Reserva</Text>
                    <Text style={styles.subtitle}>Crie uma nova reserva de vaga</Text>
                </View>

                {/* Vehicle Info Card */}
                <View style={styles.vehicleCard}>
                    <View style={styles.vehicleInfo}>
                        <Ionicons name="car" size={24} color="#3B82F6" />
                        <Text style={styles.vehicleText}>ABC-1234</Text>
                    </View>
                </View>

                {/* Form Sections */}
                <View style={styles.formContainer}>
                    {/* Seleção de Vaga */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Seleção de Vaga</Text>
                        <Text style={styles.requiredLabel}>Vaga *</Text>
                        <TouchableOpacity
                            style={styles.spotSelector}
                            onPress={() => setShowSpotSelector(true)}
                        >
                            <View style={styles.inputContainer}>
                                <Ionicons name="location" size={20} color="#6B7280" style={styles.inputIcon} />
                                <Text style={[styles.inputText, !selectedSpot && styles.placeholder]}>
                                    {selectedSpot || 'Selecione uma vaga'}
                                </Text>
                            </View>
                            <Ionicons name="chevron-down" size={20} color="#6B7280" />
                        </TouchableOpacity>
                    </View>

                    {/* Data e Hora */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Data e Hora</Text>
                        
                        <View style={styles.dateTimeContainer}>
                            <View style={styles.dateTimeField}>
                                <Text style={styles.requiredLabel}>Data e Hora de Início *</Text>
                                <TouchableOpacity
                                    style={styles.dateTimeSelector}
                                    onPress={() => setShowStartPicker(true)}
                                >
                                    <View style={styles.inputContainer}>
                                        <Ionicons name="calendar" size={20} color="#6B7280" style={styles.inputIcon} />
                                        <Text style={[styles.inputText, !form.startDate && styles.placeholder]}>
                                            {form.startDate ? `${formatDate(form.startDate)} ${formatTime(form.startDate)}` : 'Selecione data e hora'}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.dateTimeField}>
                                <Text style={styles.requiredLabel}>Data e Hora de Fim *</Text>
                                <TouchableOpacity
                                    style={styles.dateTimeSelector}
                                    onPress={() => setShowEndPicker(true)}
                                >
                                    <View style={styles.inputContainer}>
                                        <Ionicons name="time" size={20} color="#6B7280" style={styles.inputIcon} />
                                        <Text style={[styles.inputText, !form.endDate && styles.placeholder]}>
                                            {form.endDate ? `${formatDate(form.endDate)} ${formatTime(form.endDate)}` : 'Selecione data e hora'}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Preço */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Preço</Text>
                        <Text style={styles.priceLabel}>Valor Total (Calculado automaticamente)</Text>
                        <View style={styles.priceContainer}>
                            <Text style={styles.priceDisplay}>R$ {form.price}</Text>
                        </View>
                    </View>

                    {/* Observações */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Observações</Text>
                        <Text style={styles.notesLabel}>Notas Adicionais</Text>
                        <TextInput
                            style={styles.textArea}
                            value={form.notes}
                            onChangeText={(value) => updateForm('notes', value)}
                            placeholder="Digite observações adicionais..."
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                        />
                    </View>

                    {/* Botões */}
                    <View style={styles.buttonContainer}>
                        <Button variant="outline" size="lg" onPress={() => Alert.alert('Cancelado', 'Operação cancelada')}>
                            Cancelar
                        </Button>
                        <Button variant="primary" size="lg" onPress={handleSubmit}>
                            Criar Reserva
                        </Button>
                    </View>
                </View>
            </ScrollView>

            {/* Modal de Seleção de Vaga */}
            <Modal
                visible={showSpotSelector}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowSpotSelector(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Selecionar Vaga</Text>
                            <TouchableOpacity onPress={() => setShowSpotSelector(false)}>
                                <Ionicons name="close" size={24} color="#6B7280" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.spotsList}>
                            {availableSpots.map((spot) => (
                                <TouchableOpacity
                                    key={spot.id}
                                    style={styles.spotItem}
                                    onPress={() => selectSpot(spot.id)}
                                >
                                    <View style={styles.spotInfo}>
                                        <Ionicons name="location" size={20} color="#3B82F6" />
                                        <Text style={styles.spotText}>{spot.id}</Text>
                                        <Text style={styles.sectorText}>Setor {spot.sector}</Text>
                                    </View>
                                    <View style={styles.spotStatus}>
                                        <View style={styles.statusDot} />
                                        <Text style={styles.statusText}>Livre</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>

            {/* DateTime Pickers */}
            {showStartPicker && (
                <DateTimePicker
                    value={form.startDate || new Date()}
                    mode="datetime"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleStartDateChange}
                    minimumDate={new Date()}
                />
            )}

            {showEndPicker && (
                <DateTimePicker
                    value={form.endDate || new Date()}
                    mode="datetime"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleEndDateChange}
                    minimumDate={form.startDate || new Date()}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    header: {
        padding: 24,
        paddingBottom: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#6B7280',
        lineHeight: 24,
    },
    vehicleCard: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 24,
        marginBottom: 20,
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
    },
    vehicleInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    vehicleText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
    },
    formContainer: {
        paddingHorizontal: 24,
    },
    section: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 24,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 16,
    },
    requiredLabel: {
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
        flex: 1,
    },
    inputIcon: {
        marginRight: 12,
    },
    inputText: {
        flex: 1,
        fontSize: 16,
        color: '#1F2937',
    },
    placeholder: {
        color: '#9CA3AF',
    },
    spotSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    dateTimeContainer: {
        gap: 16,
    },
    dateTimeField: {
        width: '100%',
    },
    dateTimeSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    priceLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },
    priceContainer: {
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: '#F8FAFC',
    },
    priceDisplay: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#3B82F6',
        textAlign: 'center',
    },
    notesLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },
    textArea: {
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: '#FFFFFF',
        fontSize: 16,
        color: '#1F2937',
        minHeight: 120,
        textAlignVertical: 'top',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 24,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        maxHeight: '70%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    spotsList: {
        padding: 24,
    },
    spotItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    spotInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    spotText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
    },
    sectorText: {
        fontSize: 14,
        color: '#6B7280',
    },
    spotStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#22C55E',
    },
    statusText: {
        fontSize: 14,
        color: '#22C55E',
        fontWeight: '500',
    },
});
