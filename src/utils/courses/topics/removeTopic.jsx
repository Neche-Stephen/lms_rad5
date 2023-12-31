import { collection, doc, setDoc, query, onSnapshot, deleteDoc } from 'firebase/firestore';
import { deleteObject, ref, getMetadata  } from "firebase/storage";

import {storage, firestore} from '../../firebase.utils';

const coursesCollection = collection(firestore, 'courses');

const removeFiles = async (courseName, TopicName)=>{
  const filesToDeleteArray = [ `courses/${courseName}/${TopicName}/topicClasswork`, `courses/${courseName}/${TopicName}/topicHomework`, `courses/${courseName}/${TopicName}/topicMaterial`] 
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
export  const removeTopic = async (courseName, TopicName)=> {
    await removeFiles(courseName, TopicName);
//   addTopicFiles(newTopicDetailsFiles, courseName, topicDetailsNonFiles.topicName);
  const selectedDocument = doc(coursesCollection, courseName);
  // Reference to the subcollection (creating it implicitly)
  const Subcollection = collection(selectedDocument, 'topics');
  // Create a reference to the document with the specified ID
  const documentReference = doc(Subcollection, TopicName);
    deleteDoc(documentReference)
    .then(() => {
        console.log('Document successfully deleted');
    })
    .catch((error) => {
        console.error('Error deleting document: ', error);
    });
}


