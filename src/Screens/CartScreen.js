import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useCart } from '../context/CartContext';
import { collection, query, where, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const CartScreen = () => {
    const { state, dispatch } = useCart();

    const getCartItemDocRef = async (id) => {
        const q = query(collection(db, 'cartItems'), where('id', '==', id));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            return doc(db, 'cartItems', querySnapshot.docs[0].id);
        } else {
            throw new Error('No document found with the provided id');
        }
    };

    const removeFromCart = async (id) => {
        try {
            const docRef = await getCartItemDocRef(id);
            await deleteDoc(docRef);
            dispatch({ type: 'REMOVE_ITEM', payload: { id } });
            console.log('Document successfully deleted!');
        } catch (error) {
            console.error('Error removing item: ', error);
        }
    };

    const updateQuantity = async (id, delta) => {
        try {
            const item = state.items.find(item => item.id === id);
            if (!item) return;
            const updatedQuantity = item.quantity + delta;
            if (updatedQuantity > 0) {
                const docRef = await getCartItemDocRef(id);
                await updateDoc(docRef, { quantity: updatedQuantity });
                dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: updatedQuantity } });
                console.log('Quantity successfully updated!');
            } else {
                removeFromCart(id);
            }
        } catch (error) {
            console.error('Error updating quantity: ', error);
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
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <View style={styles.detailsContainer}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                        </View>
                        <View style={styles.quantityContainer}>
                            <TouchableOpacity onPress={() => updateQuantity(item.id, -1)} style={styles.button}>
                                <Text style={styles.buttonText}> - </Text>
                            </TouchableOpacity>
                            <Text style={styles.quantity}>{item.quantity}</Text>
                            <TouchableOpacity onPress={() => updateQuantity(item.id, 1)} style={styles.button}>
                                <Text style={styles.buttonText}> + </Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeButton}>
                            <Text style={styles.removeButtonText}>REMOVE</Text>
                        </TouchableOpacity>
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
        padding: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
    },
    image: {
        width: 60,
        height: 60,
        marginRight: 10,
    },
    detailsContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
    },
    price: {
        fontSize: 14,
        color: '#888',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantity: {
        marginHorizontal: 10,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 5,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    removeButton: {
        backgroundColor: '#FF6347',
        padding: 5,
        borderRadius: 5,
    },
    removeButtonText: {
        color: 'white',
        fontSize: 16,
    },
    totalContainer: {
        paddingVertical: 10,
    },
    total: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default CartScreen;
