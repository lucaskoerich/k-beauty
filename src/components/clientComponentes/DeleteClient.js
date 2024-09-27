import React from 'react';
import { View, Modal, Button, Pressable, StyleSheet, Text } from 'react-native';
import { deleteClient } from '../../services/ClientsService';


const DeleteClient = ({ client, visible, onClose, selectedClient, fetchClients }) => {

  const handleDeleteClient = async (id) => {
    const result = await deleteClient(client.id);
    if (result.success) {
        onClose();
        fetchClients();
    } else {
        console.error(result.message);
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
          <Text style={styles.modalTitle}>Detalhes do Cliente</Text>

          <View style={styles.detailContainer}>
            <Text style={styles.label}>Nome:</Text>
            <Text style={styles.detailText}>{selectedClient?.name}</Text>
          </View>

          <View style={styles.detailContainer}>
            <Text style={styles.label}>Telefone:</Text>
            <Text style={styles.detailText}>{selectedClient?.phone}</Text>
          </View>

          <View style={styles.detailContainer}>
            <Text style={styles.label}>Gênero:</Text>
            <Text style={styles.detailText}>{selectedClient?.gender}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Cancelar" onPress={onClose} />
            <Button title="Deletar" onPress={handleDeleteClient} color="red" />
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

export default DeleteClient;
