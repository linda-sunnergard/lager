import { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import config from "../config/config.json";
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

function StockList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${config.base_url}/products?api_key=${config.api_key}`)
      .then(response => response.json())
      .then(result => setProducts(result.data));
  }, []);

  const list = products.map((product, index) => <Text style={styles.stock} key={index}>{ product.name } - { product.stock }</Text>);

  return (
    <View>
      {list}
    </View>
  );
}

export default function Stock() {
  return (
    <View style={styles.main}>
      <Text style={styles.text}>Lagerförteckning</Text>
      <StockList />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    paddingLeft: 110,
  },
  text: {
    color: '#000000',
    fontSize: 24,
    marginTop: 15,
    marginBottom: 5,
  },
  stock: {
    fontSize: 15,
    lineHeight: 15,
    marginBottom: 10,
    marginTop: 0,
    },
});
