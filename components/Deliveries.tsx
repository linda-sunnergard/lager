import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';

import DeliveriesList from './DeliveriesList.tsx';
import DeliveriesForm from './DeliveriesForm.tsx';

const Stack = createNativeStackNavigator();

export default function Deliveries(props) {
    const [delivery, setDelivery] = useState<Partial<Delivery>>({});

    return (
      <Stack.Navigator initialRouteName="List" screenOptions={({
        headerShown: false,
      })}>
          <Stack.Screen name="List">
          {(screenProps) => <DeliveriesList {...screenProps} deliveries = {props.deliveries} setDeliveries={props.setDeliveries}/>}
          </Stack.Screen>
          <Stack.Screen name="Form">
          {(screenProps) => <DeliveriesForm {...screenProps} deliveries = {props.deliveries} setDeliveries={props.setDeliveries}  delivery={delivery} setDelivery={setDelivery} />}
          </Stack.Screen>
      </Stack.Navigator>
    );
};
