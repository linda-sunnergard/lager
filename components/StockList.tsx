import { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import config from "../config/config.json";
import { Base, Typography } from '../styles';
import productModel from '../models/products.ts';


export default function StockList({products, setProducts}) {
  useEffect(() => {
    fetch(`${config.base_url}/products?api_key=${config.api_key}`)
      .then(response => response.json())
      .then(result => setProducts(result.data));
  }, []);

  const list = products.map((product, index) => <Text style={{...Base.stock}} key={index}>{ product.name } - { product.stock }</Text>);

  return (
      <View>
        {list}
      </View>
    );
}
