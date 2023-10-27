import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import {doc, getDoc} from 'firebase/firestore';
import { useSelector } from 'react-redux';

import {firestore} from '../../../../utils/firebase.utils';
import Navbar from '../../../../components/general/Navbar/Navbar';
import Sidebar from '../../../../components/general/Sidebar/Sidebar';

import { selectCourseName } from '../../../../store/courses/courses.selector';
import { selectSubCourseName } from '../../../../store/subcourses/subcourses.selector';

export default function ViewSubCourseTopic() {
    const courseName = useSelector(selectCourseName);
    const subcourseName = useSelector(selectSubCourseName);
    const {topicName} = useParams();
    console.log(`courses/${courseName}/subcourse/${subcourseName}/topics/${topicName}`)

    useEffect(()=>{
    // Reference to the document you want to retrieve
    const documentRef = doc(firestore, `courses/${courseName}/subcourse/${subcourseName}/topics/${topicName}`)

    // Get the document data
    const getDocumentData = async () => {
    try {
        const documentSnapshot = await getDoc(documentRef);

        if (documentSnapshot.exists()) {
        // Access all fields in the document
        const documentData = documentSnapshot.data();
        console.log('Document Data:', documentData);
        } else {
        console.log('Document does not exist.');
        }
    } catch (error) {
        console.error('Error getting document:', error);
    }
    };
    getDocumentData();


    }, [])
  return (
    <>
        <Navbar />
        <Container fluid>
            <Row>
                <Col className='d-none d-lg-block p-0' style = {{backgroundColor:'#3936BC', height:'100vh'}} xs = '2'>
                    <Sidebar />
                </Col>

                <Col>
                    <Row>
                        Name of Topic
                    </Row>
                    <Row>
                       Intro
                    </Row>
                    <Row>
                        Material
                    </Row>
                    <Row>
                        Classwork
                    </Row>
                    <Row>
                       Homework
                    </Row>
                </Col>
            </Row>
        </Container>

    </>

  )
}
