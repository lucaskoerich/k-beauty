import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { getProcedures } from '../services/ProceduresService';
import AddProcedure from '../components/procedureComponents/AddProcedure';
import DeleteProcedure from '../components/procedureComponents/DeleteProcedure';
import SearchBar from '../components/procedureComponents/ProcedureSearchBar';
import ProcedureList from '../components/procedureComponents/ProcedureList';

const ProcedureScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [procedures, setProcedures] = useState([]);
    const [selectedProcedure, setSelectedProcedure] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchProcedures = async () => {
        setLoading(true);
        const result = await getProcedures();
        if (result.success) {
            setProcedures(result.data);
        } else {
            console.error(result.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProcedures();
    }, []);

    const filteredProcedures = procedures.filter(procedure =>
        procedure.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onAddPress={() => setModalVisible(true)}
            />

            <ProcedureList
                procedures={filteredProcedures}
                onProcedurePress={(procedure) => {
                    setSelectedProcedure(procedure);
                    setDeleteModalVisible(true);
                }}
                loading={loading}
                onRefresh={fetchProcedures}
            />

            <AddProcedure
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                fetchProcedures={fetchProcedures}
            />

            <DeleteProcedure
                visible={deleteModalVisible}
                onClose={() => setDeleteModalVisible(false)}
                procedure={selectedProcedure}
                fetchProcedures={fetchProcedures}
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

export default ProcedureScreen;
