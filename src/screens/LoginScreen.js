import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { login } from '../services/AuthService';

const colors = {
  primary: '#FF69B4',
  secondary: '#FF1493',
  background: '#FFF0F5',
  text: '#000',
};

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const result = await login(email, password);
      if (!result.success) {
        Alert.alert('Erro', result.message); 
      } else {
        navigation.replace('Home');
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {errorMessage.length > 0 && <Text style={styles.error}>{errorMessage}</Text>}
        <Button title="Login" onPress={handleLogin} color={colors.primary} />
        <Button title="Criar Conta" onPress={() => navigation.navigate('SignUp')} color={colors.secondary} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loginBox: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: colors.secondary,
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
});

export default LoginScreen;
