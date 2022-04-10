import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { Base, Typography } from '../styles';
import StockList from "./StockList.tsx"


export default function Stock(props) {
  return (
    <View style={{...Base.stockMain}}>
      <Text style={{...Base.stockText}}>Lagerförteckning</Text>
      <StockList products={props.products} setProducts={props.setProducts}/>
    </View>
  );
}
