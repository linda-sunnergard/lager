import { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { Base, Typography } from '../styles';
import productModel from '../models/products.ts';


export default function StockList({products, setProducts}) {
    async function reloadStockList() {
        setProducts(await productModel.getProducts());
    }
    
    useEffect(() => {
      reloadStockList();
    }, []);



  const list = products.map((product, index) => <Text style={{...Base.stock}} key={index}>{ product.name } - { product.stock }</Text>);

  return (
      <View>
        {list}
      </View>
    );
}
