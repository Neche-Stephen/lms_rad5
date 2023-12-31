// import { doc, deleteDoc } from 'firebase/firestore';
// Initialize Firebase and Firestore as you normally would
import {firestore} from '../firebase.utils';
import { deleteDoc, doc, getDocs, query, collection, getFirestore, deleteField, arrayRemove, documentId } from 'firebase/firestore';
import { ref, deleteObject, getDownloadURL} from 'firebase/storage';
import{ storage} from '../firebase.utils.jsx';


export const removeCourse = (courseName) =>{
    if (!courseName) {
        console.error('Invalid documentId:', documentId);
        return;
      }
    // Specify the collection name and the ID of the document you want to delete
    const collectionName = 'courses';
    // Create a reference to the document you want to delete
    const documentReference = doc(firestore, collectionName,courseName);
    // Use deleteDoc to remove the document
    deleteDoc(documentReference)
    .then(() => {
        console.log('Document successfully deleted');
    })
    .catch((error) => {
        console.error('Error deleting document: ', error);
    });

    const imagePath = `courses/${courseName}/courseImg`;
    // Create a reference to the file
    const fileRef = ref(storage, imagePath);
   // Check if the file exists by attempting to get its download URL
    getDownloadURL(fileRef)
    .then((url) => {
    // File exists, you can proceed with deletion
    deleteObject(fileRef)
        .then(() => {
        console.log('File deleted successfully');
        })
        .catch((error) => {
        console.error('Error deleting file:', error);
        });
    })
    .catch((error) => {
    // File doesn't exist or there was an error checking the existence
    console.error('File does not exist or error checking existence:', error);
    });
}










// Recursive function to delete a document and its subcollections


