import { query, collection, where, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';


export const updateBook = async (bookId, newData) => {
    try {
        const q = query(collection(db, 'books'), where('id', '==', bookId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const docSnapshot = querySnapshot.docs[0];
            const docRef = doc(db, 'books', docSnapshot.id);
            await updateDoc(docRef, newData);
            console.log('Book updated successfully');
        } else {
            console.log('No document found with the provided id');
        }
    } catch (error) {
        console.error('Error updating book:', error);
    }
};

export const deleteBook = async (bookId) => {
    try {
        const q = query(collection(db, 'books'), where('id', '==', bookId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const docSnapshot = querySnapshot.docs[0];
            const docRef = doc(db, 'books', docSnapshot.id);
            await deleteDoc(docRef);
            console.log('Document successfully deleted!');
        } else {
            console.log('No document found with the provided id');
        }
    } catch (error) {
        console.error('Error deleting document:', error);
    }
};
