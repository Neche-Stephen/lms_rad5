import { collection, doc, setDoc, query, onSnapshot } from 'firebase/firestore';
import { uploadString,  ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

import {storage, firestore} from '../firebase.utils';

const coursesCollection = collection(firestore, 'courses');


export const addTopicFiles = (newTopicDetailsFiles, courseName, subCourseName, topicName) => {
    const files = newTopicDetailsFiles;
    if (files.length === 0) return;
  
    const uploadPromises = [];
  
    files.forEach((file) => {
      if (file.file !== null) {
      const storageRef = ref(storage, `courses/${courseName}/${subCourseName}/${topicName}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file.file);
  
      const uploadPromise = new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // const progress = Math.round(
            //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            // );
            // // You may want to aggregate or display progress for all files
            // // You can modify this part as needed
            // setProgresspercent(progress);
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then((downloadURL) => {
                // Store the download URL for each file or process them as needed
                resolve(downloadURL);
              })
              .catch((err) => reject(err));
          }
        );
      });
  
      uploadPromises.push(uploadPromise);
    }
    });
  
    // Use Promise.all to wait for all uploads to complete
    Promise.all(uploadPromises)
      .then((downloadURLs) => {
        // downloadURLs is an array of download URLs for all uploaded files
        // You can handle these URLs as needed
        console.log(downloadURLs);
      })
      .catch((error) => {
        alert(error);
      });
  };

export  const addSubCourseTopic = (newTopicDetailsFiles, courseName, subCourseName, topicDetailsNonFiles)=> {
  addTopicFiles(newTopicDetailsFiles, courseName, subCourseName, topicDetailsNonFiles.topicName);
    //Getting a reference to the name of the course containing subcourse we are viewing
    const selectedCourse = doc(coursesCollection, courseName);

    //Getting a reference to the subcourse collection on firebase, which is under the course
    const subCourseCollection = collection(selectedCourse, 'subcourse');

    //Getting a reference to the particular subcourse we are viewing using the name
    const selectedSubCourse = doc(subCourseCollection, subCourseName);
  // Reference to the subcollection (creating it implicitly)
  const Subcollection = collection(selectedSubCourse, 'topics');
  // Create a reference to the document with the specified ID
  const documentReference = doc(Subcollection, topicDetailsNonFiles.topicName);
  // Add a document to the subcourse subcollection with the specified ID
      setDoc(documentReference, topicDetailsNonFiles)
      .then(() => {
        console.log('done')
      })
      .catch((error) => {
          console.error('Error writing document: ', error);
      });
      console.log('done');
}


