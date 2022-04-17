import { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { Base, Typography } from '../styles';
import productModel from '../models/products.ts';


export default function StockList({products, setProducts}) {
  useEffect(async () => {
      setProducts(await productModel.getProducts());
  }, []);

  const list = products.map((product, index) => <Text style={{...Base.stock}} key={index}>{ product.name } - { product.stock }</Text>);

  return (
      <View>
        {list}
      </View>
    );
}
