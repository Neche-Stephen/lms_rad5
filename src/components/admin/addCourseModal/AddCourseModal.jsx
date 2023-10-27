import React, {useState} from 'react';
import { Modal, Button } from 'react-bootstrap';
import { getFirestore, collection, setDoc, doc, serverTimestamp} from 'firebase/firestore';
import {ref, uploadBytesResumable } from 'firebase/storage';
import Spinner from 'react-bootstrap/Spinner';

import './AddCourseModal.css';
import {firestore, storage} from '../../../utils/firebase.utils';


export default function AddCourseModal({handleCloseModal}) {
    
    const [courseName, setCourseName] = useState('');
    const [courseDesc, setCourseDesc] = useState('');
    const [courseImage, setCourseImage] = useState(null);

    const [addingCourse, setAddingCourse] = useState(false);
    
// Function to upload a file to Firebase Storage
  async function uploadFile(file) {
    if(file === null){
      return;
    }
      // Specify the path where you want to store the file (e.g., 'images/myFile.jpg')
      const storageRef = ref(storage, `courses/${courseName}/courseImg`);
      try {
      // Upload the file
      await uploadBytesResumable(storageRef, file);
      console.log('File uploaded successfully');
      } catch (error) {
      console.error('Error uploading file:', error);
      }
  }

  const createCourse = async (e) =>{
      e.preventDefault();
      setAddingCourse(true);
      await uploadFile(courseImage);
      // Specify the collection and document ID
      const collectionName = 'courses';
      const documentId = courseName;
      // Create a reference to the document with the specified ID
      const documentReference = doc(firestore, collectionName, documentId);
          setDoc(documentReference, {courseName : courseName, courseDesc : courseDesc, created_at: serverTimestamp(),})
          .then(() => {
              console.log('Document successfully written with ID: ', documentId);
              setAddingCourse(false);
              alert('Course added');
          })
          .catch((error) => {
              console.error('Error writing document: ', error);
          });
          
  }

  return (
   <form onSubmit={createCourse}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Course here</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <label htmlFor="">Course Name *</label>
            <input required type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)} className='form-control mb-1' />
            <label htmlFor="">Course Description</label>
            <input type="text"  value={courseDesc} onChange={(e) => setCourseDesc(e.target.value)} 
            className='form-control mb-1'/>
            <label htmlFor="">Course Image</label>
            <input type = 'file' onChange={(e) => setCourseImage(e.target.files[0])} className='form-control'/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button type = 'submit' variant="primary" >
           Add Course
          </Button>
          {
            addingCourse && <Button className='ms-3' style={{all:'unset'}}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Button>
          }
        </Modal.Footer>
   </form>
  )
}
