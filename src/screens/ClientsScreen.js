import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { getClients } from '../services/ClientsService';
import AddClient from '../components/clientComponentes/AddClient';
import DeleteClient from '../components/clientComponentes/DeleteClient';
import ClientList from '../components/clientComponentes/ClientList';
import SearchBar from '../components/clientComponentes/ClientSearchBar';

const ClientsScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [clientName, setClientName] = useState('');
    const [clientPhone, setClientPhone] = useState('');
    const [clientGender, setClientGender] = useState('Selecione o gênero');
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchClients = async () => {
        setLoading(true);
        const result = await getClients();
        if (result.success) {
            setClients(result.data);
            setLoading(false);
        } else {
            console.error(result.message);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onAddPress={() => setModalVisible(true)}
            />

            <ClientList
                clients={filteredClients}
                onClientPress={(client) => {
                    setSelectedClient(client);
                    setDeleteModalVisible(true);
                }}
                loading={loading}
                onRefresh={fetchClients}
            />

            <AddClient
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                clientName={clientName}
                setClientName={setClientName}
                clientPhone={clientPhone}
                setClientPhone={setClientPhone}
                clientGender={clientGender}
                setClientGender={setClientGender}
                fetchClients={fetchClients}
            />

            <DeleteClient
                visible={deleteModalVisible}
                client={selectedClient}
                onClose={() => setDeleteModalVisible(false)}
                selectedClient={selectedClient}
                fetchClients = {fetchClients}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});

export default ClientsScreen;
