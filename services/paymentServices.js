let dataBase = [];

const addInvoice = (params) => {
  dataBase = [...dataBase, params];
  console.log('dataBase ', dataBase);
};

const getDataBase = () => {
  return dataBase;
};

module.exports = {
  addInvoice,
  getDataBase,
};
