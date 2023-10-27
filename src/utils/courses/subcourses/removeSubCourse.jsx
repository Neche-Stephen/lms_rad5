import { deleteDoc, doc, getDocs, query, collection, getFirestore, deleteField, arrayRemove, documentId } from 'firebase/firestore';
import { ref, deleteObject, getDownloadURL} from 'firebase/storage';
import { storage, firestore } from '../../firebase.utils';


export const removeSubCourse = (courseName, subCourseName) =>{
    if (!courseName || !subCourseName) {
        console.log(courseName, subCourseName)
        console.error('Invalid documentId:', courseName, subCourseName);
        return;
      }
   //Create ref to courses collection
   const coursesRef = collection(firestore, 'courses');

   //Create ref to course document in the courses collection
   const courseRef = doc(coursesRef, courseName);

   //Create ref to subcourse collection in course document
   const subcoursesRef = collection(courseRef, 'subcourse');

   //Create ref to subcourse document we want to delete
   const subcourseRef = doc(subcoursesRef, subCourseName);
    deleteDoc(subcourseRef)
    .then(() => {
        console.log('Document successfully deleted');
    })
    .catch((error) => {
        console.error('Error deleting document: ', error);
    });

    const imagePath = `courses/${courseName}/${subCourseName}/subcourseImg`;
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






