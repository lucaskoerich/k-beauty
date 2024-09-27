import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CalendarScreen from '../screens/CalendarScreen';
import ClientsScreen from '../screens/ClientsScreen';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerItem } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProcedureScreen from '../screens/ProceduresScreen';

const Drawer = createDrawerNavigator();

const LogoutComponent = ({ navigation }) => {
  useEffect(() => {
    navigation.replace('Login');
  }, [navigation]);

  return null;
};

const CustomDrawerContent = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>KBeauty</Text>
      <View style={styles.divider} />

      <DrawerItem
        label="Agenda"
        onPress={() => props.navigation.navigate('Agenda')}
        icon={() => <MaterialIcons name="calendar-today" size={24} color="#5dc1b9" />}
        labelStyle={styles.drawerLabel}
      />

      <DrawerItem
        label="Clientes"
        onPress={() => props.navigation.navigate('Clientes')}
        icon={() => <MaterialIcons name="people" size={24} color="#5dc1b9" />}
        labelStyle={styles.drawerLabel}
      />

      <DrawerItem
        label="Procedimentos"
        onPress={() => props.navigation.navigate('Procedimentos')}
        icon={() => <MaterialIcons name="face" size={24} color="#5dc1b9" />}
        labelStyle={styles.drawerLabel}
      />

      <View style={styles.divider} />

      <DrawerItem
        label="Logout"
        onPress={() => props.navigation.navigate('Logout')}
        icon={() => <MaterialIcons name="exit-to-app" size={24} color="#5dc1b9" />}
        labelStyle={styles.drawerLabel}
      />
    </SafeAreaView>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Calendar"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#ffffff',
        },
      }}
    >
      <Drawer.Screen name="Agenda" component={CalendarScreen} />
      <Drawer.Screen name="Clientes" component={ClientsScreen} />
      <Drawer.Screen name="Procedimentos" component={ProcedureScreen} />
      <Drawer.Screen
        name="Logout"
        component={LogoutComponent}
        options={{
          drawerLabel: 'Logout',
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: -8, // ajusta o padding top do drawer
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: 16,
    paddingLeft: 8,
    color: '#c594aa',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E4E8',
    marginVertical: 8,
  },
  drawerLabel: {
    color: '#005954',
  },
});

export default DrawerNavigator;
