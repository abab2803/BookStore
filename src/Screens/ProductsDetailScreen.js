import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { db } from '../../firebaseConfig';
import React, { useState, useEffect } from 'react';
import { query, collection, where, getDocs, addDoc } from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';
import { useCart } from '../context/CartContext';



const ProductsDetailScreen = () => {

    const { dispatch } = useCart();

    const route = useRoute(); // Using useRoute to access the route object

    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const idParam = route.params.id; // Accessing the id parameter from the route
                const q = query(collection(db, 'books'), where('id', '==', idParam));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        setProduct({
                            id: doc.id,
                            ...doc.data()
                        });
                    });
                } else {
                    console.log('No such book document!');
                }
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchBookDetails();
    }, [route.params.id]); // Using route.params.id as a dependency


    const addToCart = async () => {
        const cartItem = { ...product, quantity: 1 };
        await addDoc(collection(db, 'cartItems'), cartItem);
        dispatch({ type: 'ADD_ITEM', payload: cartItem });
        alert('Added to cart!');
    };


    /*
    const addToCart = () => {
        console.warn('It is Added Boss :)');
    };
        */
    if (!product) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    const renderItem=({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Add Carts', {id: item.id,})} style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.productTitle}>{item.title}</Text>
        </TouchableOpacity>
    );


    return(
        <View>
            <ScrollView>
                {/* Image */}
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <View style={{ padding: 20 }}>
                    {/* Author */}
                    <Text style={styles.author}>By {product.author}</Text>
                    {/* Title */}
                    <Text style={styles.title}>{product.title}</Text>
                    {/* Price */}
                    <Text style={styles.price}>${product.price}</Text>
                    {/* Genre */}
                    <Text style={styles.genre}>• {product.genre} </Text>
                    {/* Description */}
                    <Text style={styles.description}>{product.description}{'\n\n\n'}</Text>
                </View>
            </ScrollView>



            {/* Add to cart button */}
            <TouchableOpacity onPress={addToCart} style={styles.button}>
                <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    productImage: {
        width: "75%",
        aspectRatio: 1,
        marginTop: 80,
        marginBottom: 4,
        alignSelf: 'center', // Center horizontally
    },
    author: {
        // Add author styles
    },
    title: {
        fontSize: 30,
        fontWeight: '600',
        marginVertical: 5,
    },
    price: {
        fontSize: 27,
        fontWeight: '500',
        marginVertical: 5,
        letterSpacing: 1.6,
    },
    genre: {
        fontSize: 15,
        fontWeight: '500',
        marginVertical: 5,
    },
    description: {
        marginVertical: 7,
        fontSize: 18,
        fontWeight: '300',
        lineHeight: 29,
    },
    button: {
        position: 'absolute',
        backgroundColor: 'black',
        bottom: 35,
        width: '85%',
        alignSelf: 'center', // Center horizontally
        padding: 20,
        borderRadius: 80,
        alignItems: "center",
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
});

export default ProductsDetailScreen;
