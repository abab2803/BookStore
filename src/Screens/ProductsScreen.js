import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { FontAwesome } from '@expo/vector-icons';


const ProductsScreen = ({ navigation }) => {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState('');
    const [filterBooks, setFilteredBooks] = useState([]);



    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'books'));
                const booksData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setBooks(booksData);
                setFilteredBooks(booksData);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    const handleSearch = (text) => {
        setSearch(text);
        const filtered = books.filter(book => book.title.toLowerCase().includes(text.toLowerCase()));
        setFilteredBooks(filtered);
    };

    const renderItem=({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Product Details', {id: item.id,})} style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.productTitle}>{item.title}</Text>
        </TouchableOpacity>
    );




    return (

            <View style={styles.space}>
                <View style={styles.searchInputContainer}>
                    <FontAwesome name="search" size={25} color="black" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search..."
                        onChangeText={handleSearch}
                        value={search}
                    />

                </View>


                <FlatList
                    data={filterBooks}
                    renderItem={renderItem}
                    numColumns={2}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.flatListContent}
                />

                {/* Add to cart button */}
                <TouchableOpacity onPress={() => navigation.navigate('Create Products')}  style={styles.button}>
                    <Text style={styles.buttonText}>Upload Products</Text>
                </TouchableOpacity>
            </View>



    );
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 15,
        marginTop: 20,
        marginBottom: 10,
    },
    itemContainer: {
        width: '50%',
        padding: 10,

    },
    space: {
        flex:1,
        paddingBottom: 80,
    },

    productTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    searchInputContainer: {
        width: '80%',
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 50,
        paddingHorizontal: 10,
        marginBottom: 10,
        alignSelf: 'center',
        marginTop: 20,


    },

    searchInput: {
        flex: 1,
        height: '100%', // Match the height of the container
        paddingLeft: 30, // Leave space for the icon
    },

    searchIcon: {
        position: 'absolute',
        right: 15,
        top: 8,
        color: "gray",
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
    flatListContent: {
        paddingBottom: 100,
    },


});

export default ProductsScreen;
