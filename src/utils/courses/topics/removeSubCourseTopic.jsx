import { collection, doc, setDoc, query, onSnapshot, deleteDoc } from 'firebase/firestore';
import { deleteObject, ref, getMetadata  } from "firebase/storage";

import {storage, firestore} from '../../firebase.utils';

const coursesCollection = collection(firestore, 'courses');

const removeFiles = async (courseName, subcourseName, TopicName)=>{
  const filesToDeleteArray = [ 
    `courses/${courseName}/${subcourseName}/${TopicName}/topicClasswork`, 
    `courses/${courseName}/${subcourseName}/${TopicName}/topicHomework`, 
    `courses/${courseName}/${subcourseName}/${TopicName}/topicMaterial`
] 
  try {
    for (const filePath of filesToDeleteArray) {
      const storageRef = ref(storage, filePath);
      // Check if the file exists by examining its metadata
      try {
        await getMetadata(storageRef);
        // File exists, so delete it
        await deleteObject(storageRef);
        console.log(`File ${filePath} deleted successfully.`);
      } catch (error) {
        // File does not exist, log a message
        console.log(`File ${filePath} does not exist.`);
      }
    }
  } catch (error) {
    console.error("Error deleting files:", error);
  }
}
export  const removeSubCourseTopic = async (courseName, subcourseName, topicName)=> {
    await removeFiles(courseName, subcourseName, topicName);
    // Reference to the document you want to remove
    const documentReference = doc(firestore, `courses/${courseName}/subcourse/${subcourseName}/topics/${topicName}`)
    deleteDoc(documentReference)
    .then(() => {
        console.log('Document successfully deleted');
    })
    .catch((error) => {
        console.error('Error deleting document: ', error);
    });
}


