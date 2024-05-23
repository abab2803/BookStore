import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, TextInput, ScrollView, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { FontAwesome, Entypo } from '@expo/vector-icons';

const ProductsScreen = ({ navigation }) => {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'books'), (querySnapshot) => {
            const booksData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setBooks(booksData);
            setFilteredBooks(booksData);
        }, (error) => {
            console.error('Error fetching books:', error);
        });

        return () => unsubscribe(); // Clean up the listener on unmount
    }, []);

    useEffect(() => {
        filterBooks();
    }, [search, selectedGenre, books]);

    const handleSearch = (text) => {
        setSearch(text);
    };

    const filterBooks = () => {
        let filtered = books.filter(book => book.title.toLowerCase().includes(search.toLowerCase()));

        if (selectedGenre) {
            filtered = filtered.filter(book => book.genre === selectedGenre);
        }

        setFilteredBooks(filtered);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Product Details', { id: item.id })} style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.productTitle}>{item.title}</Text>
        </TouchableOpacity>
    );

    const genres = ['Action', 'Sci-Fi', 'Manga', 'Horror', 'Romance', 'Fantasy', 'Sport'];

    return (
        <View style={styles.space}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.genreButton}>
                    <Entypo name="menu" size={30} color="black" />
                </TouchableOpacity>
                <View style={styles.searchInputContainer}>
                    <FontAwesome name="search" size={25} color="black" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search..."
                        onChangeText={handleSearch}
                        value={search}
                    />
                </View>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalView}>
                    <TouchableOpacity
                        onPress={() => setModalVisible(false)}
                        style={styles.closeButton}
                    >
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                    <ScrollView>
                        {genres.map((genre, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[styles.modalGenreButton, selectedGenre === genre && styles.selectedGenreButton]}
                                onPress={() => {
                                    setSelectedGenre(genre === selectedGenre ? '' : genre);
                                    setModalVisible(false);
                                }}
                            >
                                <Text style={styles.genreButtonText}>{genre}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </Modal>

            <FlatList
                data={filteredBooks}
                renderItem={renderItem}
                numColumns={2}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.flatListContent}
            />

            {/* Add to cart button */}
            <TouchableOpacity onPress={() => navigation.navigate('Manage Products')} style={styles.button}>
                <Text style={styles.buttonText}>Manage Products</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
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
        flex: 1,
        paddingBottom: 80,
    },
    productTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    searchInputContainer: {
        flex: 1,
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 50,
        paddingHorizontal: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginTop: 20,
    },
    searchInput: {
        flex: 1,
        height: '100%',
        paddingLeft: 30,
    },
    searchIcon: {
        position: 'absolute',
        right: 15,
        top: 8,
        color: "gray",
    },
    genreButton: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#eee',
    },
    modalView: {
        flex: 1,
        marginTop: 100,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    modalGenreButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: '#eee',
        marginVertical: 5,
        width: '100%',
        alignItems: 'center',
    },
    selectedGenreButton: {
        backgroundColor: '#007BFF',
    },
    genreButtonText: {
        color: 'black',
    },
    button: {
        position: 'absolute',
        backgroundColor: 'black',
        bottom: 35,
        width: '85%',
        alignSelf: 'center',
        padding: 20,
        borderRadius: 80,
        alignItems: "center",
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    flatListContent: {
        paddingBottom: 100,
    },
    closeButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: '#FF6347',
        marginBottom: 20,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default ProductsScreen;
