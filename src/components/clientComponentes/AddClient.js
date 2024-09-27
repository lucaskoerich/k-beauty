import React, { useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, TouchableOpacity, Text, Pressable, FlatList, Keyboard } from 'react-native';
import { addClient } from '../../services/ClientsService';

const AddClient = ({ visible, onClose, fetchClients  }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('Selecione o gênero');
  const [showPickerModal, setShowPickerModal] = useState(false);
  const [genders] = useState(['Masculino', 'Feminino', 'Não-binário', 'Trans', 'Gênero Fluido', 'Outros']);
  const [keyboardOpened, setKeyboardOpened] = useState(false);

  const handleAddClient = async () => {
    if (name && phone && gender) {
      const result = await addClient(name.trim(), phone.trim(), gender);
      if (result.success) {
        setName('');
        setPhone('');
        setGender('Selecione o gênero');
        onClose();
        fetchClients();
      } else {
        console.error(result.message);
      }
    }
  };

  const handleModalPress = () => {
    if (keyboardOpened) {
      Keyboard.dismiss();
    } else {
      onClose(); // Chame a função onClose aqui
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
          <Text style={styles.modalTitle}>Adicionar Cliente</Text>

          <Text style={styles.label}>Nome:</Text>
          <TextInput
            placeholder="Ex: Karolyne Lins"
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholderTextColor="#888"
            onFocus={() => setKeyboardOpened(true)}
            onBlur={() => setKeyboardOpened(false)}
          />

          <Text style={styles.label}>Telefone:</Text>
          <TextInput
            placeholder="Ex: 4898503166"
            value={phone}
            onChangeText={setPhone}
            keyboardType="numeric"
            style={styles.input}
            placeholderTextColor="#888"
            onFocus={() => setKeyboardOpened(true)}
            onBlur={() => setKeyboardOpened(false)}
          />

          <Text style={styles.label}>Gênero:</Text>
          <TouchableOpacity
            style={styles.genderDropdown}
            onPress={() => setShowPickerModal(true)}
          >
            <Text style={styles.genderText}>{gender || "Selecione o gênero"}</Text>
          </TouchableOpacity>

          <Modal
            animationType="fade"
            transparent={true}
            visible={showPickerModal}
            onRequestClose={() => setShowPickerModal(false)}
          >
            <Pressable style={styles.pickerOverlay} onPress={() => setShowPickerModal(false)}>
              <View style={styles.pickerContainer}>
                <FlatList
                  data={genders}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.genderItem}
                      onPress={() => {
                        setGender(item);
                        setShowPickerModal(false);
                      }}
                    >
                      <Text style={styles.genderItemText}>{item}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </Pressable>
          </Modal>

          <View style={styles.buttonContainer}>
            <Button title="Cancelar" onPress={onClose} color="red" />
            <Button title="Adicionar" onPress={handleAddClient} />
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
  label: {
    fontWeight: '600',
    fontSize: 16,
    paddingRight: 4
  },
  genderDropdown: {
    borderRadius: 5,
    backgroundColor: '#f2f2f2',
    height: 40,
    marginTop: 8,
    marginBottom: 16

  },
  genderText: {
    padding: 10,
    fontSize: 14,
    color: '#333',
  },
  pickerOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '80%',
    padding: 16,
  },
  genderItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  genderItemText: {
    fontSize: 16,
    color: '#555',
  },
});

export default AddClient;
