import React, {useState} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addCourse } from '../../../../store/courses/courses.actions';
import { getFirestore, collection, setDoc, doc } from 'firebase/firestore';
import {firestore, storage} from '../../../../utils/firebase.utils';


export default function AddCourse() {
    const [courseName, setCourseName] = useState('');
    const dispatch = useDispatch();

    

    const createCourse = (e) =>{
        e.preventDefault();
        // Specify the collection and document ID
    const collectionName = 'courses';
    const documentId = courseName;

    // Create a reference to the document with the specified ID
    const documentReference = doc(firestore, collectionName, documentId);
        setDoc(documentReference, {courseName : courseName})
        .then(() => {
            console.log('Document successfully written with ID: ', documentId);
        })
        .catch((error) => {
            console.error('Error writing document: ', error);
        });
        
    }

  return (
        <Container>
            <form className='row mb-3' onSubmit={createCourse}>  
                <Col>
                    <label htmlFor="">Course Name</label>
                    <input value={courseName} onChange={(e) => setCourseName(e.target.value)} type="text" />
                </Col>
                <Col>
                <button>Add</button>
                </Col>
            </form>
           
        </Container>
  )
}
