import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Home from "./components/Home.tsx";
import Pick from "./components/Pick.tsx";
import productModel from './models/products.ts';
import { Base, Typography } from './styles'

const Tab = createBottomTabNavigator();

export default function App() {
  const [products, setProducts] = useState([]);

  return (
    <SafeAreaView style={{...Base.container}}>
      <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = routeIcons[route.name] || "alert";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'grey',
        headerShown: false,
        tabBarActiveBackgroundColor: '#80A06B',
        tabBarInactiveBackgroundColor: '#80A06B',
      })}
      >
      <Tab.Screen name="Lager" style={{...Base.base}}>
        {() => <Home products={products} setProducts={setProducts}
        />}
      </Tab.Screen>
      <Tab.Screen name="Plock" style={{...Base.base}}>
        {() => <Pick products={products} setProducts={setProducts} />}
      </Tab.Screen>
    </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const routeIcons = {
  "Lager": "leaf",
  "Plock": "gift",
};

      // <Tab.Screen name="Plock" component={Pick} style={{...Base.base}} />
