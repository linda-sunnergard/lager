import config from "../config/config.json";
import deliveries from "../interfaces/deliveries.ts";

const deliveryModel = {
  getDeliveries: async function getDeliveries() {
    return fetch(`${config.base_url}/deliveries?api_key=${config.api_key}`)
      .then(response => response.json())
      .then(result => result.data);
  },

  addDelivery: async function addDelivery(delivery: Partial<Delivery>) {
    try {
      delivery.api_key = config.api_key;

      await fetch(`${config.base_url}/deliveries`, {
        body: JSON.stringify(delivery),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST'
      });
    } catch (error) {
        console.log("Could not update delivery");
        console.log(error);

    }
  },
};

export default deliveryModel;
