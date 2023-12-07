import React, { useState } from 'react';
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap';
import { doc, setDoc, arrayUnion } from 'firebase/firestore';

import { firestore } from '../../../utils/firebase.utils';


const defaultCohortDetails = {
    courseName : '',
    courseCode:'',
    cohortName: '',
    startDate: '',
    endDate: ''
}

export default function AddCohortModal({ handleCloseAddCohortModal }) {
    const [cohortDetails, setCohortDetails] = useState(defaultCohortDetails);
    const {courseName, courseCode, cohortName, startDate, endDate} = cohortDetails

    const handleCohortDetailsChange = (e) => {
        const { name, value } = e.target;
        setCohortDetails({...cohortDetails, [name]: value});
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(cohortDetails);
        const cohortRef = doc(firestore, 'cohorts', `${courseName} Cohort`);

        try {
            await setDoc(cohortRef, {
               courseName, courseCode, 
               cohorts: arrayUnion({

               })

               
              }, { merge: true });
              console.log('Document added/updated successfully');
        } catch (error) {
            console.error('Error updating document fields:', error);
        }

        // try {
        //     const docSnapshot = await getDoc(documentRef);
        
        //     if (docSnapshot.exists()) {
        //       // Document exists, update fields
        //       await updateDoc(documentRef, fieldsToUpdate);
        //       console.log('Document fields updated successfully');
        //     } else {
        //       // Document doesn't exist, create a new document with the provided fields
        //       await setDoc(documentRef, fieldsToUpdate);
        //       console.log('Document created successfully');
        //     }
        //   } catch (error) {
        //     console.error('Error updating/creating document:', error);
        //     // Handle error if update/creation fails
        //   }
    
    }

  

  return (
    <Form onSubmit={handleSubmit}>
         <Modal.Header closeButton>
          <Modal.Title>Create Cohort</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col >
                    <label htmlFor="">Course Name</label>
                    <input type="text" className='form-control' name='courseName' value={courseName}
                        onChange={handleCohortDetailsChange}
                    />
                </Col>
            </Row>
            <Row>
                <Col >
                    <label htmlFor="">Course Code</label>
                    <input type="text" className='form-control' name='courseCode' value={courseCode}
                        onChange={handleCohortDetailsChange}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <label htmlFor="">Cohort Name</label>
                    <input type="text" className='form-control' value={cohortName} 
                        name = 'cohortName' onChange={handleCohortDetailsChange}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        type="date" className='form-control'
                        id="startDate"
                        name="startDate"
                        value={startDate}
                        onChange={handleCohortDetailsChange}
                        required
                    />
                </Col>
            </Row>

            <Row>
                <Col>
                    <label htmlFor="endDate">End Date:</label>
                    <input
                        type="date" className='form-control'
                        id="endDate"
                        name="endDate"
                        value={endDate}
                        onChange={handleCohortDetailsChange}
                        required
                    />
                </Col>
            </Row>
               
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddCohortModal}>
            Close
          </Button>
          <Button variant="primary" type='submit'>
             Submit
          </Button>
        </Modal.Footer>
    </Form>
  )
}
