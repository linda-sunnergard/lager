import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InvoicesList from "./InvoicesList.tsx";
import InvoicesForm from "./InvoicesForm.tsx";

const Stack = createNativeStackNavigator();

export default function Invoices(props) {
    return (
      <Stack.Navigator initialRouteName="List" screenOptions={({
        headerShown: false,
      })}>
          <Stack.Screen name="List">
              {(screenProps) => <InvoicesList {...screenProps} invoices = {props.invoices} setInvoices={props.setInvoices}
              setIsLoggedIn = {props.setIsLoggedIn} />}
          </Stack.Screen>
          <Stack.Screen name="Form">
              {(screenProps) => <InvoicesForm {...screenProps} invoices = {props.invoices} setInvoices={props.setInvoices} />}
          </Stack.Screen>
      </Stack.Navigator>
    );
};
