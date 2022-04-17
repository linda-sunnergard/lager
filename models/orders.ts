import config from "../config/config.json";
import productModel from "./products.ts";
import Order from "../interfaces/order.ts";
import OrderItem from "../interfaces/order_item";

const orderModel = {
    getOrders: async function getOrders() {
        const response = await fetch(`${config.base_url}/orders?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },
    pickOrder: async function pickOrder(order: Partial<Order>) {
      try {
        await Promise.all(order.order_items.map(async (order_item: Partial<OrderItem>) => {
          let changedProduct = {
            id: order_item.product_id,
            name: order_item.name,
            stock: order_item.stock - order_item.amount,
            api_key: config.api_key,
          };

          await productModel.updateProduct(changedProduct)
        }));

        let changedOrder = {
          id: order.id,
          name: order.name,
          status_id: 200,
          api_key: config.api_key,
        };

        await orderModel.updateOrder(changedOrder);
      } catch (error) {
        console.log("Could not update order items " + error.message);
      }
    },
    updateOrder: async function updateOrder(order: Partial<Order>) {
      try {
        await fetch(`${config.base_url}/orders?api_key=${config.api_key}`, {
          body: JSON.stringify(order),
          headers: {
              'content-type': 'application/json'
          },
          method: 'PUT'
        });
      } catch (error) {
          console.log("Could not update order");
      }
    }
};

export default orderModel;
