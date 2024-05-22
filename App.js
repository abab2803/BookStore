import React from 'react';
import CartContextProvider from './src/context/CartContext';
import UserProvider from './src/context/UserContext';
import Nav from './src/Nav';
import 'react-native-gesture-handler';
import { StatusBar, View, StyleSheet } from 'react-native';

export default function App() {
    return (
        <UserProvider>
            <CartContextProvider>
                <View style={{ flex: 1 }}>
                    <StatusBar style="auto" />
                    <Nav />
                </View>
            </CartContextProvider>
        </UserProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
