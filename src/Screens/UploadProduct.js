import React, {useEffect, useState} from 'react';
import {View, TextInput, Button, ScrollView} from 'react-native';
import {collection, addDoc, getDocs} from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import ProductsScreen from "./ProductsScreen";;
import {updateBook, deleteBook} from "../components/bookOperations";
import styles from "./../components/styles";


const UploadProduct = () => {
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [genre, setGenre] = useState("");
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [id, setID] = useState("");
    const [price, setPrice] = useState("");


    const addProduct = async () => {
        // Check if any field is empty
        if (!title || !author || !description || !genre || !image || !price || !id) {
            console.log('Please fill in all fields.');
            return;
        }

        try {
            // Add book data to Firestore
            await addDoc(collection(db, 'books'), {
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


    const handleUpdate = () => {
        const newData = {
            title,
            author,
            description,
            genre,
            image,
            price: parseFloat(price),
        };
        updateBook(parseInt(id), newData);
    };

    const handleDelete = () => {
        deleteBook(parseInt(id));
    };


    return (
        <ScrollView>

            <TextInput
                style={styles.textInput}
                value={id}
                onChangeText={text => setID(text)}
                keyboardType={"numeric"}
                placeholder="Doc Id..."
            />

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

            <View style={styles.buttonContainer} >
                {/* Add button */}
                <Button
                    onPress={addProduct}
                    title="Add"
                />

                <Button
                    onPress={handleUpdate}
                    title="Update"
                />

                <Button
                    onPress={handleDelete}
                    title="Delete"
                />
            </View>
        </ScrollView>
    )
}

export default UploadProduct;
