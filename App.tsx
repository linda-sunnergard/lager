import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import plants from './assets/plants.jpg';
import Stock from './components/Stock.tsx';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.base}>
        <Text style={styles.text}>Frö-Appen</Text>
        <Image source={plants} style={{ width: 415, height: 240 }} />
        <Stock />
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  base: {
    flex: 1,
    backgroundColor: '#80A06B',
    paddingLeft: 12,
    paddingRight: 12,
  },
  text: {
    color: '#000000',
    fontSize: 42,
    marginTop:10,
    marginBottom: 10,
    paddingLeft: 100,
  },
});
