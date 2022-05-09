import config from "../config/config.json";

import Invoice from "../interfaces/invoice.ts";
import storage from "./storage.ts";

import orderModel from "./orders.ts";

const invoicesModel = {
    getInvoices: async function getInvoices(): Promise<Invoice> {
        const tokenObject: any = await storage.readToken();
        const response = await fetch(`${config.base_url}/invoices?api_key=${config.api_key}`, {
            headers: {
                "x-access-token": tokenObject.token
            },
        });
        const result = await response.json();
        return result.data;
    },

    createInvoice: async function createInvoice(invoiceObject:
        Partial<Invoice>) {

            let order = await orderModel.getOrder(invoiceObject.order_id);

            let changedOrder = {
              id: order.id,
              name: order.name,
              status_id: 600,
              api_key: config.api_key,
            };
            orderModel.updateOrder(changedOrder);

            let totalPrice = order.order_items.reduce((price, item) => {
                return price + item.amount * item.price;
            }, 0);

            let dueDate = new Date(invoiceObject.creation_date);
            dueDate.setDate(dueDate.getDate() + 30);

            invoiceObject.due_date = dueDate.toLocaleDateString('se-SV');
            invoiceObject.total_price = totalPrice;
            invoiceObject.api_key = config.api_key

            const tokenObject: any = await storage.readToken();

            const response = await fetch(`${config.base_url}/invoices`, {
                body: JSON.stringify(invoiceObject),
                headers: {
                    "content-type": "application/json",
                    "x-access-token": tokenObject.token
                },
                method: "POST"
            });

            const result = await response.json();

            if (result.data.creation_date === null) {
                return {
                    message: "Information saknas",
                    description: "Du måste fylla i order och fakturadatum",
                    title: "danger"
                }
            } else {
                return {
                        message: "Registrerad",
                        description: "Fakturan är registrerad",
                        title: "success"
                    };
            }
        },
};

export default invoicesModel;
