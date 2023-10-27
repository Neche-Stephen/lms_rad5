import { getFirestore, collection, setDoc, doc, serverTimestamp} from 'firebase/firestore';
import {ref, uploadBytesResumable } from 'firebase/storage';


import {firestore, storage} from '../firebase.utils';


async function uploadFile(courseName, subCourseName, subCourseImage) {
    if(subCourseImage === null){
      return;
    }
      // Specify the path where you want to store the file (e.g., 'images/myFile.jpg')
      const storageRef = ref(storage, `courses/${courseName}/${subCourseName}/subcourseImg`);
      try {
      // Upload the file
      await uploadBytesResumable(storageRef,subCourseImage);
      console.log('File uploaded successfully');
      } catch (error) {
      console.error('Error uploading file:', error);
      }
  }
export const addSubCourse = async (e,courseName, subCourseName, subCourseDesc, subCourseImage, ) =>{
    e.preventDefault();
    console.log('yup');
    await uploadFile(courseName, subCourseName, subCourseImage);
    
    //Create ref to courses collection
    const coursesRef = collection(firestore, 'courses');

    //Create ref to course document in the courses collection
    const courseRef = doc(coursesRef, courseName);

    //Create ref to subcourse collection in course document
    const subcoursesRef = collection(courseRef, 'subcourse');

    //Create ref to subcourse document we want to add to the subcourse collection 
    const subcourseRef = doc(subcoursesRef, subCourseName);

    setDoc(subcourseRef, {subCourseName, subCourseDesc, created_at: serverTimestamp(),})
      .then(() => {
        console.log("Document successfully written with ID: ", subCourseName);
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
          
  }



