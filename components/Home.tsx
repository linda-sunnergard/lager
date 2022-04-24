import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import plants from '../assets/plants.jpg';
import Stock from './Stock.tsx';
import { Base, Typography } from '../styles'

export default function Home(props) {

  return (
    <SafeAreaView style={{...Base.container}}>
      <View style={{...Base.home}}>
        <Text style={{...Base.text}}>Frö-Appen</Text>
        <Image source={plants} style={{ width: 415, height: 240 }} />
        <Stock products={props.products} setProducts={props.setProducts}/>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}
