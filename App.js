import React from 'react';
import  CartContextProvider   from './src/context/CartContext';
import Nav from './src/Nav';
import 'react-native-gesture-handler';
import { StatusBar, Text, View, StyleSheet } from 'react-native';

export default function App() {
    return (
        <CartContextProvider>
            <View style={{ flex: 1 }}>
                <StatusBar style="auto" />
                <Nav />
            </View>
        </CartContextProvider>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
