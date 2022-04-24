import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Home from "./components/Home.tsx";
import Pick from "./components/Pick.tsx";
import Deliveries from "./components/Deliveries.tsx";
import Auth from "./components/auth/Auth.tsx";
import Invoices from "./components/invoices/Invoices.tsx";

import authModel from "./models/auth.ts";
import { Base, Typography } from './styles';

const Tab = createBottomTabNavigator();

export default function App() {
  const [products, setProducts] = useState([]);
  const [deliveries, setDeliveries] = useState<Partial<Delivery>>({});
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const [invoices, setInvoices] = useState([]);

  useEffect(async () => {
    setIsLoggedIn(await authModel.loggedIn());
  }, []);

  return (
    <SafeAreaView style={{...Base.container}}>
      <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = routeIcons[route.name] || "alert";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#D8D8D8',
        tabBarInactiveTintColor: '#4D563A',
        headerShown: false,
        tabBarActiveBackgroundColor: '#5D894B',
        tabBarInactiveBackgroundColor: '#5D894B',
      })}
      >
      <Tab.Screen name="Lager" style={{...Base.base}}>
        {() => <Home products={products} setProducts={setProducts}
        />}
      </Tab.Screen>
      <Tab.Screen name="Plock" style={{...Base.base}}>
        {() => <Pick products={products} setProducts={setProducts} />}
      </Tab.Screen>
      <Tab.Screen name="Leveranser" style={{...Base.base}}>
        {() => <Deliveries deliveries={deliveries} setDeliveries={setDeliveries} />}
      </Tab.Screen>
      {isLoggedIn ?
         <Tab.Screen name="Faktura" style={{...Base.base}}>
            {() => <Invoices invoices={invoices} setInvoices={setInvoices}
            setIsLoggedIn = {setIsLoggedIn} />}
          </Tab.Screen> :
        <Tab.Screen name="Logga in" style={{...Base.base}}>
          {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
        </Tab.Screen>
      }
    </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const routeIcons = {
  "Lager": "leaf",
  "Plock": "gift",
  "Leveranser": "file-tray-full",
  "Logga in": "lock-open",
  "Faktura": "document-text-sharp"
};
