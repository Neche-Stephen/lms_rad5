import { doc, deleteDoc } from 'firebase/firestore';
// Initialize Firebase and Firestore as you normally would
import {firestore} from '../firebase.utils';


export const removeCourse = (documentId) =>{
    // Specify the collection name and the ID of the document you want to delete
    const collectionName = 'courses';
    // Create a reference to the document you want to delete
    const documentReference = doc(firestore, collectionName, documentId);
    // Use deleteDoc to remove the document
    deleteDoc(documentReference)
    .then(() => {
        console.log('Document successfully deleted');
    })
    .catch((error) => {
        console.error('Error deleting document: ', error);
    });
}
