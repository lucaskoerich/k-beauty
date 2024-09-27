import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';

const SearchBar = ({ searchQuery, setSearchQuery, onAddPress }) => {
    return (
        <View style={styles.searchContainer}>
            <TextInput
                placeholder="Pesquisar procedimentos..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={styles.searchInput}
                placeholderTextColor="#888"
            />
            <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
                <Fontisto name="plus-a" size={25} color="#000" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 24,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderRadius: 5,
    },
    addButton: {
        backgroundColor: 'transparent',
    },
});

export default SearchBar;
