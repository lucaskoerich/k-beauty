let clients = [
  { id: 1, name: 'João Silva', phone: '123456789', gender: 'Masculino' },
  { id: 2, name: 'Maria Oliveira', phone: '987654321', gender: 'Feminino' },
  { id: 3, name: 'Carlos Souza', phone: '456789123', gender: 'Masculino' },
  { id: 4, name: 'Ana Costa', phone: '321654987', gender: 'Feminino' },
];

export const getClients = async () => {
  try {
    return { success: true, data: clients };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const addClient = async (name, phone, gender) => {
  try {
    const newClientId = clients.length > 0 ? clients[clients.length - 1].id + 1 : 1;

    const newClient = { id: newClientId, name, phone, gender };
    clients.push(newClient);

    return { success: true, message: 'Cliente adicionado com sucesso!' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const deleteClient = async (clientId) => {
  try {
    clients = clients.filter(client => client.id !== clientId);
    return { success: true, message: 'Cliente deletado com sucesso!' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
