import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarScreen = ({ navigation }) => {
  const today = new Date().toISOString().split('T')[0];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendário</Text>
      <Calendar
        markedDates={{
          [today]: { selected: true, marked: true, selectedColor: 'blue' },
        }}
        onDayPress={(day) => {
          console.log('Selected day', day);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default CalendarScreen;
