import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet, Text } from 'react-native';

const ClientsScreen = () => {
  const [clientName, setClientName] = useState('');
  const [clients, setClients] = useState([]);

  const addClient = () => {
    if (clientName.trim()) {
      setClients([...clients, clientName.trim()]);
      setClientName('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Cliente</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Cliente"
        value={clientName}
        onChangeText={setClientName}
      />
      <Button title="Adicionar" onPress={addClient} />

      <FlatList
        data={clients}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.client}>{item}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  client: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
});

export default ClientsScreen;
