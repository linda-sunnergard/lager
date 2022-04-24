import { useState } from "react";
import { View, Text, Button } from "react-native";

import productModel from "../models/products.ts";
import orderModel from "../models/orders.ts";
import config from "../config/config.json"
import { Base, Typography } from '../styles';

export default function PickList({ route, navigation, products, setProducts }) {
    const { order } = route.params;

    async function pick() {
          await orderModel.pickOrder(order);
          fetch(`${config.base_url}/products?api_key=${config.api_key}`)
            .then(response => response.json())
            .then(result => setProducts(result.data));
          navigation.navigate("List", {reload: true});
    }

    function CanPick() {
      let canPick = true;

      order.order_items.forEach(item => {
        let product = products.find( productFromList => {
          return productFromList.id === item.product_id;
        })
        if (product !== undefined && product.stock < item.amount) {
          canPick = false;
        }
      });

      if(canPick) {
        return <Button title="Plocka order" onPress={pick} />
      } else {
        return <Text style={{...Base.warning}}>Det finns inte tillräckligt med produkter i lager</Text>
      }
    }

    const orderItemsList = order.order_items.map((item, index) => {
        return <Text
                key={index}
                >
                    {item.name} - {item.amount} - {item.location}
                </Text>
                ;
    });

    return (
        <View style={{...Base.base}}>
            <Text>{order.name}</Text>
            <Text>{order.address}</Text>
            <Text>{order.zip} {order.city}</Text>

            <Text>Produkter:</Text>

            {orderItemsList}
            <CanPick/>
        </View>
    )
};
