import API_URL from '../../appsettings-dev';

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      if (response.status === 401) { //resposta da api caso login esteja incorreto
        return { success: false, message: 'E-mail ou senha incorretos.' };
      }
      const errorData = await response.json();
      return { success: false, message: errorData.message };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const signup = async (name, email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message };
    }

    return { success: true, message: 'Conta criada com sucesso!' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
