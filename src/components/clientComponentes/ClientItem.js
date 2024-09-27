import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ClientItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.clientItem} onPress={() => onPress(item)}>
      <Text style={styles.clientName}>{item.name}</Text>
      <Text style={styles.clientPhone}>{item.phone}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  clientItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  clientName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,

  },
  clientPhone: {
    fontSize: 14,
    color: '#aaa', 
  }
});

export default ClientItem;
