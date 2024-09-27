import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import ProcedureItem from './ProcedureItem';

const ProcedureList = ({ procedures, onProcedurePress, loading, onRefresh }) => {
    return (
        <View style={styles.container}>
            <View style={styles.procedureListContainer}>
                <FlatList
                    data={procedures}
                    renderItem={({ item }) => (
                        <ProcedureItem procedure={item} onPress={() => onProcedurePress(item)} />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    nestedScrollEnabled={true}
                    scrollEnabled={procedures.length > 0}
                    showsVerticalScrollIndicator={false}
                    initialNumToRender={procedures.length}
                    refreshing={loading}
                    onRefresh={onRefresh}
                    ListEmptyComponent={
                        <Text style={styles.emptyMessage}>Nenhum procedimento encontrado.</Text>
                    }
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        flex: 1
    },
    procedureListContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        height: 'auto'

    },
    emptyMessage: {
        textAlign: 'center',
        marginVertical: 16,
        fontSize: 16,
        color: 'gray',
    }
});

export default ProcedureList;
