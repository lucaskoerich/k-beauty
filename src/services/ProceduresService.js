let procedures = [
  { id: 1, name: 'Limpeza de Pele', value: 150.00, duration: 60 },
  { id: 2, name: 'Hidratação', value: 80.00, duration: 30 },
  { id: 3, name: 'Massagem Relaxante', value: 120.00, duration: 90 },
  { id: 4, name: 'Pele de Bebê', value: 200.00, duration: 120 },
];

export const getProcedures = async () => {
  try {
    return { success: true, data: procedures };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const addProcedure = async (name, price, duration) => {
  try {
    const formattedPrice = price.toString().replace(',', '.');

    const newProcedure = {
      id: procedures.length + 1,
      name,
      value: parseFloat(formattedPrice),
      duration,
    };

    procedures.push(newProcedure);
    return { success: true, message: 'Procedimento adicionado com sucesso!' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const deleteProcedure = async (id) => {
  try {
    procedures = procedures.filter(procedure => procedure.id !== id);
    return { success: true, message: 'Procedimento deletado com sucesso!' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};