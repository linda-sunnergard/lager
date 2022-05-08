import { View, Text, Button, FlatList } from "react-native";
import { useState, useEffect } from 'react';

import { Base, Typography } from "../styles";
import config from "./../config/config.json";
import deliveryModel from "../models/deliveries.ts";
import productModel from "../models/products.ts";

export default function DeliveriesList({ route, navigation, deliveries, setDeliveries }) {
    async function reloadDeliveriesList() {
        let prevDeliveries = await deliveryModel.getDeliveries()
        if(prevDeliveries.length > 0) {
          setDeliveries(prevDeliveries)
        }
    }

  useEffect(() => {
      reloadDeliveriesList();
  }, []);

  function ListOrWarn() {
    if(deliveries.length > 0) {
        return <FlatList
          data={deliveries}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => {
            return (
              <View>
                <Text style={{...Typography.header3}}>Produkt: { item.product_name } </Text>
                <Text>Antal: { item.amount }</Text>
                <Text>Leveransdatum: { item.delivery_date }</Text>
                <Text>Kommentar: {item.comment}</Text>
              </View>)}}
          extraData={deliveries}
        />
    } else {
      return <Text style={{...Base.warning}}>Det finns inga tidigare leveranser</Text>
    }
  }


  return (
      <View style={{ ...Base.base}}>
          <Text style={{ ...Typography.header2}}>Inleveranser</Text>
          <ListOrWarn/>
          <Button
              title="Skapa ny inleverans"
              onPress={() => {
                  navigation.navigate('Form');
              }}
          />
      </View>
  );
}
