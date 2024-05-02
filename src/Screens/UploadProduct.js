import React, {useState, useEffect} from 'react';
import {View, TextInput, ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { db } from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
const UploadProduct = () => {
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [genre, setGenre] = useState("");
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [id, setID] = useState("");
    const [price, setPrice] = useState("");


    const handleSubmit = async () => {
        // Check if any field is empty
        if (!title || !author || !description || !genre || !image || !price || !id) {
            console.log('Please fill in all fields.');
            return;
        }

        try {
            // Add book data to Firestore
            await addDoc(collection(db,'books'),  {
                id: parseInt(id),
                title,
                author,
                description,
                genre,
                image,
                price: parseFloat(price),
            });

            // Handle success
            console.log('Book added successfully');
        } catch (error) {
            // Handle error
            console.error('Error adding book:', error);
        }

    };



    return (
        <View>
            <ScrollView style={styles.space}>
                <TextInput
                    placeholder="Book Title..."
                    value={title}
                    onChangeText={text => setTitle(text)}
                    style={styles.textInput}
                />
                <TextInput
                    placeholder="Author..."
                    value={author}
                    onChangeText={text => setAuthor(text)}
                    style={styles.textInput}
                />
                <TextInput
                    placeholder="Description..."
                    value={description}
                    multiline={true}
                    onChangeText={text => setDescription(text)}
                    style={styles.textDescription}
                />
                <TextInput
                    placeholder="Genre..."
                    value={genre}
                    onChangeText={text => setGenre(text)}
                    style={styles.textInput}
                />
                <TextInput
                    placeholder="Image URL..."
                    value={image}
                    onChangeText={text => setImage(text)}
                    style={styles.textInput}
                />
                <TextInput
                    placeholder="Price..."
                    value={price}
                    onChangeText={text => setPrice(text)}
                    keyboardType="numeric"
                    style={styles.textInput}
                />
                <TextInput
                    placeholder="Id..."
                    value={id}
                    onChangeText={text => setID(text)}
                    keyboardType="numeric"
                    style={styles.textInput}
                />
            </ScrollView>
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    space: {
        marginBottom: 100,
    },
    textInput: {
        borderColor: 'black',
        borderWidth: 3,
        borderRadius: 50,
        paddingHorizontal: 50,
        marginBottom: 10,
        alignSelf: 'center',
        marginTop: 20,
    },
    textDescription: {
        height: 200,
        width: 200,
        borderColor: 'gray',
        padding: 10,
        alignSelf: 'center',
        borderWidth: 3,
        borderRadius: 20,
        paddingHorizontal: 50,
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
        fontWeight: 'bold'
    },
});

export default UploadProduct;
