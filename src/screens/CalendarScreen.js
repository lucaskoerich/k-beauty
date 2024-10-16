import React, { useState, useEffect } from 'react';
import { View, Modal, TextInput, Button, StyleSheet, TouchableOpacity, Text, Pressable, Keyboard } from 'react-native';
import { Calendar } from 'react-native-big-calendar';
import DateTimePicker from '@react-native-community/datetimepicker';
import { GestureHandlerRootView, PinchGestureHandler } from 'react-native-gesture-handler';
import { Dropdown } from 'react-native-element-dropdown'; 
import { getClients } from '../services/ClientsService'; 
import { getProcedures } from '../services/ProceduresService'; 

const CalendarScreen = () => {
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newEvent, setNewEvent] = useState({ client: '', start: new Date(), end: new Date(new Date().getTime() + 60 * 60 * 1000), client: '', procedure: '' });
  const [editingEventIndex, setEditingEventIndex] = useState(null);
  const [viewMode, setViewMode] = useState('week');
  const [keyboardOpened, setKeyboardOpened] = useState(false);

  const [clients, setClients] = useState([]);
  const [procedures, setProcedures] = useState([]);

  const loadClients = async () => {
    const response = await getClients();
    if (response.success) {
      setClients(response.data.map(client => ({ label: client.name, value: client.id })));
    }
  };

  const loadProcedures = async () => {
    const response = await getProcedures();
    if (response.success) {
      setProcedures(response.data.map(procedure => ({ label: procedure.name, value: procedure.id })));
    }
  };

  useEffect(() => {
    loadClients();
    loadProcedures();
  }, []);

  const openModal = (date, index) => {

    loadClients();
    loadProcedures();

    if (index !== undefined) {
      setEditingEventIndex(index);
      setNewEvent(events[index]);
    } else {
      setEditingEventIndex(null);
      setNewEvent({ title: '', start: date, end: new Date(date.getTime() + 60 * 60 * 1000), client: '', procedure: '' });
    }
    setModalVisible(true);
  };

  const saveEvent = () => {
    const updatedEvents = [...events];
    const clientName = clients.find(client => client.value === newEvent.client)?.label || '';
    const procedure = procedures.find(procedure => procedure.value === newEvent.procedure)?.label || '';

    const updatedEvent = {
      ...newEvent,
      title: `${clientName} - ${procedure}` ,
      id: newEvent.id || Date.now(),
    };

    if (editingEventIndex !== null) {
      updatedEvents[editingEventIndex] = updatedEvent;
    } else {
      updatedEvents.push(updatedEvent);
    }

    setEvents(updatedEvents);
    setModalVisible(false);
    setNewEvent({ title: '', start: new Date(), end: new Date(new Date().getTime() + 60 * 60 * 1000), client: '', procedure: '' });
  };

  const deleteEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
    setModalVisible(false);
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
            onPressEvent={(event) => {
              const index = events.findIndex(e => e.id === event.id);  
              if (index === -1) {
                console.log("Evento não encontrado no índice");
                return;
              }
              openModal(event.start, index);  // Abre a modal com as opções de editar ou excluir
            }}
          />

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => handleModalPress()}
          >
            <Pressable style={styles.modalOverlay} onPress={handleModalPress}>
              <Pressable style={styles.modalView} onPress={() => { }}>
                <Text style={styles.modalTitle}>{editingEventIndex !== null ? 'Editar Procedimento' : 'Agendar Novo Procedimento'}</Text>

                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  data={clients}
                  search
                  searchPlaceholder="Pesquisar cliente..."
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Selecionar Cliente"
                  value={newEvent.client}
                  onChange={item => {
                    setNewEvent({ ...newEvent, client: item.value });
                  }}
                />

                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  data={procedures}
                  search
                  searchPlaceholder="Pesquisar procedimento..."
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Selecionar Procedimento"
                  value={newEvent.procedure}
                  onChange={item => {
                    setNewEvent({ ...newEvent, procedure: item.value });
                  }}
                />

                <View style={styles.dateTimeContainer}>
                  <View style={styles.dateTimeRow}>
                    <Text style={styles.label}>Início:</Text>
                    <DateTimePicker
                      value={newEvent.start}
                      mode="time"
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
                      mode="time"
                      is24Hour={true}
                      display="default"
                      onChange={onChangeEnd}
                    />
                  </View>
                </View>

                <View style={styles.buttonContainer}>
                  {editingEventIndex !== null ? (
                    <>
                      <Button title="Excluir" onPress={() => deleteEvent(editingEventIndex)} color="red" />
                      <Button title="Salvar Alterações" onPress={saveEvent} />
                    </>
                  ) : (
                    <>
                    <Button title="Cancelar" onPress={handleModalPress} color="red" />
                    <Button title="Adicionar" onPress={saveEvent} />
                    </>
                  )}
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
    justifyContent: 'space-between'
  },
  monthYearText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginVertical: 10,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default CalendarScreen;
