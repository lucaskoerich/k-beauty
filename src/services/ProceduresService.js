import API_URL from '../../appsettings-dev';

export const getProcedures = async () => {
  try {
    const response = await fetch(`${API_URL}/procedures`, {
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

export const addProcedure = async (name, price, duration) => {
    try {
      const formattedPrice = price.toString().replace(',', '.');
  
      const response = await fetch(`${API_URL}/procedures`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, value: formattedPrice, duration }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        return { success: false, message: errorData.message };
      }
  
      return { success: true, message: 'Procedimento adicionado com sucesso!' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };
  
  export const deleteProcedure = async (id) => {
    try {
      const response = await fetch(`${API_URL}/procedures/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        return { success: false, message: errorData.message };
      }
  
      return { success: true, message: 'Procedimento deletado com sucesso!' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };
  
