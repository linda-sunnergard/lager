import config from "../config/config.json";
import deliveries from "../interfaces/deliveries.ts";

const deliveryModel = {
    getDeliveries: async function getDeliveries() {
        return fetch(`${config.base_url}/deliveries?api_key=${config.api_key}`)
        .then(response => response.json())
        .then(result => result.data);
    },

    addDelivery: async function addDelivery(delivery: Partial<Delivery>) {
        delivery.api_key = config.api_key;

        const response = await fetch(`${config.base_url}/deliveries`, {
            body: JSON.stringify(delivery),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        });

    const result = await response.json();

    if (Object.prototype.hasOwnProperty.call(result, "errors")) {
        return {
            message: "Information saknas",
            description: "Du måste fylla i datum, produkt och antal",
            title: "danger"
            }
        }

    return {
        message: "Registrerad",
        description: "Leveransen är registrerad",
        title: "success"
        };
    },
};

export default deliveryModel;
