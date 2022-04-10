import OrderItem from "./order_item.ts";

export default interface Order {
  id: number,
  name: string,
  adress: string,
  zip: number,
  city: string,
  country: string,
  status: string,
  status_id: number,
  order_items: Array<OrderItem>,
};
