import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import ClientItem from './ClientItem';

const ClientList = ({ clients, onClientPress, loading, onRefresh }) => {
    return (
        <View style={styles.container}>
            <View style={styles.clientListContainer}>
                <FlatList
                    data={clients}
                    renderItem={({ item }) => (
                        <ClientItem item={item} onPress={() => onClientPress(item)} />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    nestedScrollEnabled={true}
                    scrollEnabled={clients.length > 0}
                    showsVerticalScrollIndicator={false}
                    initialNumToRender={clients.length}
                    refreshing={loading}
                    onRefresh={onRefresh}
                    ListEmptyComponent={
                        <Text style={styles.emptyMessage}>Nenhum cliente encontrado.</Text>
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
    clientListContainer: {
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

export default ClientList;
