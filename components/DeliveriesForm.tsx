import { useState, useEffect } from 'react';
import { ScrollView, Text, TextInput, Button, View, Platform } from "react-native";
import { Base, Typography, Forms } from '../styles';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { showMessage } from "react-native-flash-message";

import Delivery from '../interfaces/delivery.ts';
import deliveryModel from "../models/deliveries.ts";
import productModel from "../models/products.ts";

export default function DeliveriesForm({ route, navigation, deliveries, setDeliveries }) {
    const [delivery, setDelivery] = useState<Partial<Delivery>>({});
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});

    async function addDelivery () {
        delivery.delivery_date = delivery.delivery_date || new Date().toLocaleDateString('se-SV');

        const result = await deliveryModel.addDelivery(delivery);

        const updatedProduct = {
            ... currentProduct,
            stock : (currentProduct.stock || 0 ) + (delivery.amount || 0 )
        };

        await productModel.updateProduct (updatedProduct);

        if (result.title === "success") {
            showMessage(result)
            navigation.navigate ( "List" , { reload : true });
            setDeliveries(await deliveryModel.getDeliveries());
        } else if (result.title === "danger") {
            showMessage(result)
        }
    }

    return (
        <ScrollView style={{ ...Base.base }}>
            <Text style={{ ...Typography.header2 }}>Ny inleverans</Text>

            <DateDropDown style={{ ...Typography.normal }}
              delivery={delivery}
              setDelivery={setDelivery}
            />

            <Text style={{ ...Typography.normal }}>Produkt</Text>
            <ProductDropDown
                delivery={delivery}
                setDelivery={setDelivery}
                setCurrentProduct={setCurrentProduct}
            />

            <Text style={{ ...Typography.normal }}>Antal</Text>
            <TextInput
                style={{ ...Forms.input }}
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, amount: parseInt(content) })
                }}
                value={delivery?.amount?.toString()}
                keyboardType="numeric"
            />

            <Text style={{ ...Typography.normal }}>Kommentar</Text>
            <TextInput
                style={{ ...Forms.input }}
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, comment: content })
                }}
                value={delivery?.comment}
            />


            <Button
                title="Gör inleverans"
                onPress={() => {
                    addDelivery();
                }}
            />
        </ScrollView>
    );
};

function ProductDropDown(props) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(async () => {
      setProducts(await productModel.getProducts());
  }, []);

  const itemsList = products.map((prod, index) => {
      return <Picker.Item key={index} label={prod.name} value={prod.id} />;
  });

  return (
      <Picker
          selectedValue={props.delivery?.product_id}
          onValueChange={(itemValue, itemIndex) => {
              props.setDelivery({ ...props.delivery, product_id: itemValue })
              props.setCurrentProduct(products.find(product => itemValue == product.id))
          }}>
          {itemsList}
      </Picker>
  );
};

function DateDropDown(props) {
  const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
  const [show, setShow] = useState<Boolean>(false);

  const showDatePicker = () => {
      setShow(true);
  };

    return (
        <View>
            {Platform.OS === "android" && (
                <Button onPress={showDatePicker} title="Visa datumväljare" />
            )}
            {(show || Platform.OS === "ios") && (
                <DateTimePicker
                    onChange={(event, date) => {
                        setDropDownDate(date);

                        props.setDelivery({
                            ...props.delivery,
                            delivery_date: date.toLocaleDateString('se-SV'),
                        });

                        setShow(false);
                    }}
                    value={new Date()}
                />
            )}
        </View>
    );
};
