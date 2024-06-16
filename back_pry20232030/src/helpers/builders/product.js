const buildProduct = productData => ({
  id: productData.id,
  name: productData.name,
  userId: productData.userId,
});

module.exports = {
  buildProduct,
};
