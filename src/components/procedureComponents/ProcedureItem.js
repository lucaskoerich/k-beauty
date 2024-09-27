import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ProcedureItem = ({ procedure, onPress }) => {
    const formattedValue = procedure.value.toString().replace('.', ',');

    return (
        <TouchableOpacity style={styles.procedureItem} onPress={onPress}>
            <Text style={styles.procedureName}>{procedure.name}</Text>
            <Text style={styles.procedureDuration}>Duração: {procedure.duration} minutos</Text>
            <Text style={styles.procedurePrice}>Valor: R${formattedValue}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    procedureItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    procedureName: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
    },
    procedureDuration: {
        fontSize: 14,
        color: '#555',
    },
    procedurePrice: {
        fontSize: 14,
        color: '#555',
    },
});

export default ProcedureItem;
