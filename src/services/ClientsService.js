import API_URL from '../../appsettings-dev';

export const addClient = async (name, phone, gender) => {
  try {
    const response = await fetch(`${API_URL}/clients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, phone, gender }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message };
    }

    return { success: true, message: 'Cliente adicionado com sucesso!' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const getClients = async () => {
  try {
    const response = await fetch(`${API_URL}/clients`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const deleteClient = async (clientId) => {
  try {
    const response = await fetch(`${API_URL}/clients/${clientId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message };
    }

    return { success: true, message: 'Cliente deletado com sucesso!' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
