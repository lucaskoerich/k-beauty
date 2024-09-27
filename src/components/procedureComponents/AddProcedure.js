import React, { useState } from 'react';
import { View, Modal, TextInput, Button, Pressable, StyleSheet, Text, Keyboard } from 'react-native';
import { addProcedure } from '../../services/ProceduresService';

const AddProcedure = ({ visible, onClose, fetchProcedures }) => {
    const [procedureName, setProcedureName] = useState('');
    const [procedureDuration, setProcedureDuration] = useState('');
    const [procedurePrice, setProcedurePrice] = useState('');
    const [keyboardOpened, setKeyboardOpened] = useState(false);

    const handleAddProcedure = async () => {
        if (procedureName.trim() && procedureDuration.trim() && procedurePrice.trim()) {
            const result = await addProcedure(procedureName.trim(), procedurePrice.trim(), procedureDuration.trim());
            if (result.success) {
                onClose();
                setProcedureName('');
                setProcedureDuration('');
                setProcedurePrice('');
                fetchProcedures();  // Chama a função para atualizar a lista de procedimentos
            } else {
                console.error(result.message);
            }
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    };

    const handleModalPress = () => {
        if (keyboardOpened) {
            Keyboard.dismiss();
        } else {
            onClose();
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={handleModalPress}
        >
            <Pressable style={styles.modalOverlay} onPress={handleModalPress}>
                <Pressable style={styles.modalView} onPress={() => { }}>
                    <Text style={styles.modalTitle}>Adicionar Procedimento</Text>

                    <Text style={styles.label}>Nome:</Text>
                    <TextInput
                        placeholder="Ex: Limpeza de Pele"
                        value={procedureName}
                        onChangeText={setProcedureName}
                        style={styles.input}
                        placeholderTextColor="#888"
                        onFocus={() => setKeyboardOpened(true)}
                        onBlur={() => setKeyboardOpened(false)}
                    />

                    <Text style={styles.label}>Duração:</Text>
                    <TextInput
                        placeholder="Ex: 60"
                        value={procedureDuration}
                        onChangeText={setProcedureDuration}
                        keyboardType="numeric"
                        style={styles.input}
                        placeholderTextColor="#888"
                        onFocus={() => setKeyboardOpened(true)}
                        onBlur={() => setKeyboardOpened(false)}
                    />

                    <Text style={styles.label}>Preço:</Text>
                    <TextInput
                        placeholder="Ex: 250"
                        value={procedurePrice}
                        onChangeText={setProcedurePrice}
                        keyboardType="numeric"
                        style={styles.input}
                        placeholderTextColor="#888"
                        onFocus={() => setKeyboardOpened(true)}
                        onBlur={() => setKeyboardOpened(false)}
                    />

                    <View style={styles.buttonContainer}>
                        <Button title="Cancelar" onPress={onClose} color="red" />
                        <Button title="Adicionar" onPress={handleAddProcedure} />
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalView: {
        backgroundColor: 'white',
        width: '85%',
        borderRadius: 10,
        padding: 24,
        elevation: 5,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        alignSelf: 'center',
    },
    input: {
        width: '100%',
        height: 40,
        backgroundColor: '#f2f2f2',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default AddProcedure;
