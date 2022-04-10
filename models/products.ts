import config from "../config/config.json";

const productModel = {
  getProducts: async function getProducts() {
    return fetch(`${config.base_url}/products?api_key=${config.api_key}`)
      .then(response => response.json())
      .then(result => result.data);
  },
  updateProduct: async function updateProduct(product) {
    try {
      product.api_key = config.api_key;

      await fetch(`${config.base_url}/products`, {
        body: JSON.stringify(product),
        headers: {
          'content-type': 'application/json'
        },
        method: 'PUT'
      });
    } catch (error) {
        console.log("Could not update product: ", error);
    }
  },
};

export default productModel;
