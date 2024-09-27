import React from 'react';
import { View, Modal, Button, Pressable, StyleSheet, Text } from 'react-native';
import { deleteProcedure } from '../../services/ProceduresService';

const DeleteProcedure = ({ visible, onClose, procedure, fetchProcedures }) => {

    const handleDelete = async () => {
        if (procedure) {
            const result = await deleteProcedure(procedure.id);
            if (result.success) {
                onClose();
                fetchProcedures();
            } else {
                console.error(result.message);
            }
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <Pressable style={styles.modalOverlay} onPress={onClose}>
                <Pressable style={styles.modalView}>
                    <Text style={styles.modalTitle}>Detalhes do Procedimento</Text>

                    <View style={styles.detailContainer}>
                        <Text style={styles.label}>Nome:</Text>
                        <Text style={styles.detailText}>{procedure?.name}</Text>
                    </View>

                    <View style={styles.detailContainer}>
                        <Text style={styles.label}>Duração:</Text>
                        <Text style={styles.detailText}>{procedure?.duration} minutos</Text>
                    </View>

                    <View style={styles.detailContainer}>
                        <Text style={styles.label}>Preço:</Text>
                        <Text style={styles.detailText}>R${procedure?.value}</Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button title="Cancelar" onPress={onClose} />
                        <Button title="Deletar" onPress={handleDelete} color="red" />
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
    detailContainer: {
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 4,
    },
    detailText: {
        fontSize: 16,
        marginBottom: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default DeleteProcedure;
