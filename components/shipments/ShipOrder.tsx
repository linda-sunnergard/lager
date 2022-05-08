import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";

import { Base, Typography } from '../../styles';
import orderModel from "../../models/orders";
import getCoordinates from "../../models/nominatim";

export default function ShipOrder ({ route }) {
    const { order } = route.params;
    const [message, setMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [currentLocationMarker, setCurrentLocationMarker] = useState(null)
    const [isLoaded, setIsLoaded] = useState(null)
    const [packageCoordinates, setPackageCoordinates] = useState(null)

    useEffect(() => {
        (async () => {
            setMessage("Loading...")
            const result = await getCoordinates(`${order.address}, ${order.city}`);
            if(result.length > 0) {
                setPackageCoordinates(result);
                setIsLoaded(true);
            } else {
                setMessage("Failed to find address")
            }
        })();
    }, [])

    useEffect(() => {
        (async () => {
            const {status} = await Location.requestForegroundPermissionsAsync();
            if(status !== "granted") {
                setErrorMessage("Permission to access location was denied");
            }
            const currentLocation = await Location.getCurrentPositionAsync({});
            setCurrentLocationMarker(<Marker
                coordinate={{latitude: currentLocation.coords.latitude,
                             longitude: currentLocation.coords.longitude}}
                title="Min plats"
                pinColor="blue"
            />);
        })();
    }, []);

    const orderItemsList = order.order_items.map((item, index) => {
        return <Text key={index}>
                    {item.name} - {item.amount}
                </Text>;
    });

    return (
        <View style={mapStyle.container}>
            <Text style={{...Typography.header2}}>Skicka order</Text>
            <Text style={{...Typography.header3}}>{order.name}</Text>
            <Text>{order.address}</Text>
            <Text>{order.zip} {order.city}</Text>
            <Text style={{...Typography.header3}}>Produkter:</Text>
            {orderItemsList}

            <View style={mapStyle.container}>
                {!isLoaded && <Text style={{...Base.warning}}>{message}</Text>}
                {isLoaded &&
                    <MapView
                        style={mapStyle.map}
                        initialRegion={{
                            latitude: parseFloat(packageCoordinates[0].lat),
                            longitude: parseFloat(packageCoordinates[0].lon),
                            latitudeDelta: 0.1,
                            longitudeDelta: 0.1
                        }}>
                        <Marker
                            coordinate = {{
                                latitude: parseFloat(packageCoordinates[0].lat),
                                longitude: parseFloat(packageCoordinates[0].lon)
                            }}
                            title = { packageCoordinates[0].display_name }
                        />
                        {currentLocationMarker}
                    </MapView>
                }
            </View>
        </View>
    );
};

const mapStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#80A06B',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
