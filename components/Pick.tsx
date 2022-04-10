import { Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OrderList from './OrderList.tsx';
import PickList from './PickList.tsx';
import { Base, Typography } from '../styles'

const Stack = createNativeStackNavigator();

export default function Pick(props) {
    return (
        <Stack.Navigator initialRouteName="List" screenOptions={({
          headerShown: false,
        })}>
            <Stack.Screen name="List" component={OrderList} />
            <Stack.Screen name="Details">
            {(screenProps) => <PickList {...screenProps} products = {props.products} setProducts={props.setProducts} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}
