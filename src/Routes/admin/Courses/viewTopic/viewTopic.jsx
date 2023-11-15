import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import {doc, getDoc} from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { ref, getDownloadURL, getMetadata } from 'firebase/storage';

import {firestore, storage} from '../../../../utils/firebase.utils';
import Navbar from '../../../../components/general/Navbar/Navbar';
import Sidebar from '../../../../components/general/Sidebar/Sidebar';

import { selectCourseName } from '../../../../store/courses/courses.selector';

export default function ViewSubCourseTopic() {
    const courseName = useSelector(selectCourseName);
    const {topicName} = useParams();

    //State to store topic data
    const [topicData, setTopicData] = useState({});
    const [topicFiles, setTopicFiles] = useState([]);

    useEffect(()=>{
    // Reference to the document you want to retrieve
    const documentRef = doc(firestore, `courses/${courseName}/topics/${topicName}`)

    // Get the document data
    const getDocumentData = async () => {
    try {
        const documentSnapshot = await getDoc(documentRef);

        if (documentSnapshot.exists()) {
        // Access all fields in the document
        const documentData = documentSnapshot.data();
        setTopicData(documentData);
        console.log('Document Data:', documentData);
        } else {
        console.log('Document does not exist.');
        }
    } catch (error) {
        console.error('Error getting document:', error);
    }
    };

    //Get topic details - classwork, homework, lecture
    const getTopicFiles = async() =>{
        const paths = [
            `courses/${courseName}/${topicName}/topicClasswork`,
            `courses/${courseName}/${topicName}/topicHomework`,
            `courses/${courseName}/${topicName}/topicMaterial`
        ]
        const filePromises = paths.map(async (path) => {
            try {
            const fileRef = ref(storage, path);
            // Check if the path exists by getting metadata
            const metadata = await getMetadata(fileRef);
            if (metadata.size > 0) {
                // Path exists, fetch the image
                const url = await getDownloadURL(fileRef);
                return { path, url };
            }
            } catch (error) {
            // Handle any errors for individual paths
            console.error(`Error fetching image at ${path}:`, error);
            }
            return null;
            });
    
        // Wait for all promises to resolve
        const fetchedFiles = await Promise.all(filePromises);
        setTopicFiles(fetchedFiles.filter((file) => file !== null));
          
    }
    getDocumentData();
    getTopicFiles();

    }, [])
  return (
    <>
        <Navbar />
        <Container fluid>
            <Row>
                <Sidebar />
                <Col>
                    <Row>
                        <Col>
                            <h1>{topicData.topicName}</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h3>Introduction</h3>
                            <p>{topicData.topicIntro}</p>
                        </Col>
                    </Row>
                    <Row className='justify-content-center'>
                       {
                            topicData.topicMaterialLink 
                            ? 
                            <a href={topicData.topicMaterialLink} target = '_blank'>Topic Material</a>
                            :
                            topicFiles.map((topicFile, index) => {
                                    if (topicFile.path.includes('topicMaterial')) {
                                   return(
                                     <div>
                                        <a href={topicFile.url} target = '_blank'>Topic Material</a>
                                    </div>
                                   )
                                    }
                                    return null;
                                })
                        }
                    </Row>
                    <Row className='justify-content-center'>
                        <Col xs = ''>
                            {
                            topicData.topicClassworkLink 
                            ? 
                            <a href={topicData.topicClassworkLink} target = '_blank'>Topic Classwork</a>
                            :
                            topicFiles.map((topicFile, index) => {
                                    if (topicFile.path.includes('topicClasswork')) {
                                   return(
                                     <div>
                                        <a href={topicFile.url} target = '_blank'>Topic Classwork</a>
                                    </div>
                                   )
                                    }
                                    return null;
                                })
                        }
                        </Col>
                        
                    </Row>
                    <Row>
                      <Col xs = ''>
                        {
                            topicData.topicHomeworkLink 
                            ? 
                            <a href={topicData.topicHomeworkLink} target = '_blank'>Topic Homework</a>
                            :
                            topicFiles.map((topicFile, index) => {
                                    if (topicFile.path.includes('topicHomework')) {
                                   return(
                                     <div>
                                        <a href={topicFile.url} target = '_blank'>Topic Homework</a>
                                    </div>
                                   )
                                    }
                                    return null;
                                })
                        }
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>

    </>

  )
}
