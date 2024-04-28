const { client } = require("../redis-config/client");

const {
  getProductListController,
} = require("../Controllers/productController");

const getProductsRoute = async (req, res) => {
  const results = await getProductListController();
  res.json({
    productResults: results,
  });
};

module.exports = {
  getProductsRoute,
};
