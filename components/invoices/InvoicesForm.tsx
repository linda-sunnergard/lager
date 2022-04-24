import { useState, useEffect } from 'react';
import { ScrollView, Text, TextInput, Button, View, Platform } from "react-native";
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Base, Typography, Forms } from "../../styles";

import invoiceModel from "../../models/invoices";
import ordersModel from "../../models/orders";

import Invoice from "../../interfaces/invoice";
import Order from "../../interfaces/order";

export default function InvoicesForm({ navigation }) {
    const [invoice, setInvoice] = useState<Partial<Invoice>>({});

    async function createInvoice() {
        await invoiceModel.createInvoice(invoice);

        navigation.navigate("List", { reload: true});
    }

    return (
        <ScrollView style={{...Base.base}}>
            <Text style={{...Typography.header2}}>Ny faktura</Text>

            <Text style={{...Typography.header2}}>Order</Text>
            <OrderDropDown
                invoice={invoice}
                setInvoice={setInvoice}
            />

            <Text style={{...Typography.header2}}>Fakturadatum</Text>
            <DateDropDown
                invoice={invoice}
                setInvoice={setInvoice}
            />

            <Button
                title="Skapa faktura"
                onPress={() => {
                    createInvoice();
                }}
            />
        </ScrollView>
    );
};

function OrderDropDown(props) {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(async () => {
        setOrders(await ordersModel.getOrders());
    }, []);

    const ordersList = orders.filter(order => order.status_id === 200).map((order, index) => {
        return <Picker.Item key={index} label={order.name} value={order.id} />;
    });

    return (
        <Picker
            selectedValue={props.invoice?.order_id}
            onValueChange={(itemValue, itemIndex) => {
                props.setInvoice({...props.invoice, order_id:
                itemValue });
            }}>
            {ordersList}
        </Picker>
    )
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

                        props.setInvoice({
                            ...props.invoice,
                            creation_date: formatDate(date),
                        });

                        setShow(false);
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    );
};

function zeroPad(number: number): string {
    if (number < 10) {
        return "0" + number
    }
    return "" + number
};

function formatDate(date: Date): string {

    return `${date.getFullYear()}-${zeroPad(date.getMonth())}-${zeroPad(date.getDate())}`
};
