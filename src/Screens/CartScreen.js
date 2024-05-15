import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useCart } from '../context/CartContext';

const CartScreen = () => {
    const { state, dispatch } = useCart();

    const removeFromCart = id => {
        dispatch({ type: 'REMOVE_ITEM', payload: { id } });
    };

    const updateQuantity = (id, delta) => {
        const item = state.items.find(item => item.id === id);
        const updatedQuantity = item.quantity + delta;
        if (updatedQuantity > 0) {
            dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: updatedQuantity } });
        } else {
            removeFromCart(id);  // Optionally remove the item if quantity reaches 0
        }
    };

    const calculateTotal = () => {
        return state.items.reduce((total, item) => total + item.quantity * item.price, 0);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={state.items}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text>{item.title} - Qty:</Text>
                        <Button title=" - " onPress={() => updateQuantity(item.id, -1)} />
                        <Text>{item.quantity}</Text>
                        <Button title=" + " onPress={() => updateQuantity(item.id, 1)} />
                        <Text> - ${item.price.toFixed(2)} each</Text>
                        <Button title="Remove" onPress={() => removeFromCart(item.id)} />
                    </View>
                )}
            />
            <View style={styles.totalContainer}>
                <Text style={styles.total}>Total: ${calculateTotal().toFixed(2)}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#f8f8f8'
    },
    totalContainer: {
        paddingVertical: 10
    },
    total: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20
    }
});

export default CartScreen;
