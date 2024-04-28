const { client } = require("../redis-config/client");

// The product Data
const productList = [
  {
    ID: 1,
    title: "Laptop",
    price: 999.99,
    ratings: 4.5,
    description:
      "Powerful laptop with high-resolution display, fast processor, and long battery life.",
  },
  {
    ID: 2,
    title: "Smartphone",
    price: 699.99,
    ratings: 4.8,
    description:
      "Cutting-edge smartphone with advanced camera features, sleek design, and high-speed performance.",
  },
  {
    ID: 3,
    title: "Headphones",
    price: 149.99,
    ratings: 4.3,
    description:
      "Premium headphones with noise-canceling technology, comfortable fit, and immersive sound quality.",
  },
  {
    ID: 4,
    title: "Smartwatch",
    price: 249.99,
    ratings: 4.6,
    description:
      "Feature-rich smartwatch with health monitoring capabilities, customizable watch faces, and waterproof design.",
  },
  {
    ID: 5,
    title: "Camera",
    price: 799.99,
    ratings: 4.7,
    description:
      "Professional-grade camera with high-resolution sensor, interchangeable lenses, and 4K video recording.",
  },
];

const getProductListController = async () => {
  const productData = await client.get("productData");
  if (productData) {
    return JSON.parse(productData);
  }
  await client.set("productData", JSON.stringify(productList));
  // Introduced a delay of 5secs if data is not present in cache
  return await new Promise((resolve) => {
    setTimeout(() => resolve(productList), 5000);
  });
};

module.exports = {
  getProductListController,
};
