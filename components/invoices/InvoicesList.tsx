import { ScrollView, Text, Button, FlatList } from "react-native";
import { DataTable } from "react-native-paper";
import { useState, useEffect } from 'react';

import Invoice from "../../interfaces/invoice.ts"
import invoiceModel from "../../models/invoices.ts";
import { Base, Typography } from "../../styles";
import authModel from "../../models/auth.ts";

export default function InvoicesList({ route, navigation, invoices, setInvoices, setIsLoggedIn}) {
    const {reload} = route.params || false;
    const [allInvoices, setAllInvoices] = useState<Invoice[]>([]);

    async function reloadInvoices() {
        setAllInvoices(await invoiceModel.getInvoices());
    }

    if (reload) {
        reloadInvoices();
    }

    useEffect(() => {
        reloadInvoices();
    }, []);

    async function logOut() {
        authModel.logout();
        setIsLoggedIn(false);
    }

    const invoicesRow = allInvoices.map((invoice, index) => {
        return (
        <DataTable.Row key={index}>
            <DataTable.Cell>{invoice.name}</DataTable.Cell>
            <DataTable.Cell> {invoice.total_price}</DataTable.Cell>
            <DataTable.Cell> {invoice.due_date}</DataTable.Cell>
        </DataTable.Row>)
    });

    return (
        <ScrollView style={{...Base.base}}>
            <Text style={{...Typography.header2}}>Fakturor</Text>

            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Namn</DataTable.Title>
                    <DataTable.Title>Totalt Pris</DataTable.Title>
                    <DataTable.Title>Förfallodatum</DataTable.Title>
                </DataTable.Header>
                {invoicesRow}
            </DataTable>

        <Button
            title="Skapa ny faktura"
            onPress={() => {
                navigation.navigate("Form");
            }}
        />
        <Button
            title="Logga ut"
            onPress={async () => {
                await logOut()
            }}
        />
        </ScrollView>
    );
}
