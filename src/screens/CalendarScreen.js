import React, { useState } from 'react';
import { View, Modal, TextInput, Button, StyleSheet, TouchableOpacity, Text, Pressable, Keyboard } from 'react-native';
import { Calendar } from 'react-native-big-calendar';
import DateTimePicker from '@react-native-community/datetimepicker';
import { GestureHandlerRootView, PinchGestureHandler } from 'react-native-gesture-handler';


const CalendarScreen = () => {
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', start: new Date(), end: new Date(new Date().getTime() + 60 * 60 * 1000) });
  const [editingEventIndex, setEditingEventIndex] = useState(null);
  const [viewMode, setViewMode] = useState('week');
  const [keyboardOpened, setKeyboardOpened] = useState(false);

  const openModal = (date, index) => {
    if (index !== undefined) {
      setEditingEventIndex(index);
      setNewEvent(events[index]);
    } else {
      setEditingEventIndex(null);
      setNewEvent({ title: '', start: date, end: new Date(date.getTime() + 60 * 60 * 1000) });
    }
    setModalVisible(true);
  };

  const saveEvent = () => {
    const updatedEvents = [...events];
    if (editingEventIndex !== null) {
      updatedEvents[editingEventIndex] = newEvent;
    } else {
      updatedEvents.push(newEvent);
    }
    setEvents(updatedEvents);
    setModalVisible(false);
    setNewEvent({ title: '', start: new Date(), end: new Date(new Date().getTime() + 60 * 60 * 1000) });
  };

  const onChangeStart = (event, selectedDate) => {
    if (selectedDate) {
      setNewEvent({ ...newEvent, start: selectedDate, end: new Date(selectedDate.getTime() + 60 * 60 * 1000) });
    }
  };

  const onChangeEnd = (event, selectedDate) => {
    if (selectedDate) {
      setNewEvent({ ...newEvent, end: selectedDate });
    }
  };

  const handleModalPress = () => {
    if (keyboardOpened) {
      Keyboard.dismiss();
    } else {
      setModalVisible(false);
    }
  };

  const onPinchEvent = (event) => {
    if (event.nativeEvent.scale < 1) {
      setViewMode('month');
    } else if (event.nativeEvent.scale > 1) {
      setViewMode('week');
    }
  };

  const getCurrentMonthYear = () => {
    const currentDate = new Date();
    return currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  };


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PinchGestureHandler onGestureEvent={onPinchEvent}>
        <View style={{ flex: 1 }}>
          <Text style={styles.monthYearText}>{getCurrentMonthYear()}</Text>

          <Calendar
            events={events}
            height={600}
            mode={viewMode}
            onPressCell={(date) => openModal(date)}
            onPressEvent={(event, index) => openModal(event.start, index)}
          />

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => handleModalPress()}
          >
            <Pressable style={styles.modalOverlay} onPress={handleModalPress}>
              <Pressable style={styles.modalView} onPress={() => { }}>
                <Text style={styles.modalTitle}>Adicionar Procedimento</Text>
                <TextInput
                  placeholder="Nome do evento"
                  value={newEvent.title}
                  onChangeText={(text) => setNewEvent({ ...newEvent, title: text })}
                  style={styles.input}
                  placeholderTextColor="#888"
                  returnKeyType="done"
                  onFocus={() => setKeyboardOpened(true)}
                  onBlur={() => setKeyboardOpened(false)}
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                  }}
                />

                <View style={styles.dateTimeContainer}>
                  <View style={styles.dateTimeRow}>
                    <Text style={styles.label}>Início:</Text>
                    <DateTimePicker
                      value={newEvent.start}
                      mode="datetime"
                      is24Hour={true}
                      display="default"
                      onChange={onChangeStart}
                    />
                  </View>
                </View>

                <View style={styles.dateTimeContainer}>
                  <View style={styles.dateTimeRow}>
                    <Text style={styles.label}>Fim:</Text>
                    <DateTimePicker
                      value={newEvent.end}
                      mode="datetime"
                      is24Hour={true}
                      display="default"
                      onChange={onChangeEnd}
                    />
                  </View>
                </View>

                <View style={styles.buttonContainer}>
                  <Button title="Cancelar" onPress={handleModalPress} color="red" />
                  <Button title={editingEventIndex !== null ? "Salvar Alterações" : "Adicionar"} onPress={saveEvent} />
                </View>
              </Pressable>
            </Pressable>
          </Modal>
        </View>
      </PinchGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  dateTimeContainer: {
    marginVertical: 10,
  },
  dateTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    marginRight: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  monthYearText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default CalendarScreen;
