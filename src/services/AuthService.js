let users = [
  { id: 1, name: 'Admin', email: 'admin', password: 'admin' },
];

export const login = async (email, password) => {
  try {
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return { success: false, message: 'E-mail ou senha incorretos.' };
    }

    return { success: true, data: user };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const signup = async (name, email, password) => {
  try {

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return { success: false, message: 'E-mail já cadastrado.' };
    }

    const newUserId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

    const newUser = { id: newUserId, name, email, password };
    users.push(newUser);

    return { success: true, message: 'Conta criada com sucesso!' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
