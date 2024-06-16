const buildList = list => {
  return {
    quantity: list.length,
    data: list,
  };
};

module.exports = { buildList };
