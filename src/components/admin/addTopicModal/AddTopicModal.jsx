import React, {useState} from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { selectCourseName } from '../../../store/courses/courses.selector';
import { addTopic } from '../../../utils/courses/addTopic';

const defaulTopicDetailsNonFiles = {
  topicName : '',
  topicIntro : '',
  topicMaterialLink : '',
  topicHomeworkLink : '',
  topicClassworkLink : ''
}
const defaultTopicDetailsFiles = {
  topicMaterialFile : null,
  topicHomeworkFile : null,
  topicClassworkFile : null,
}

export default function AddTopicModal({handleCloseModalTopic}) {
  const [loadingAddCourseTopic, setLoadingAddCourseTopic] = useState(false);

  const courseName = useSelector(selectCourseName);

   //State storing Details of a Topic(Non files) to be uploaded
   const [topicDetailsNonFiles, setTopicDetailsNonFiles] = useState(defaulTopicDetailsNonFiles);

   //State storing Details of a Topic (Files - image, pdf etc) to be uploaded
   const [topicDetailsFiles, setTopicDetailsFiles] = useState(defaultTopicDetailsFiles);
   
   const {topicName, topicIntro, topicMaterialLink, topicHomeworkLink, topicClassworkLink} = topicDetailsNonFiles;
 
   const {topicMaterialFile, topicHomeworkFile, topicClassworkFile} = topicDetailsFiles;
 

  const newTopicDetailsFiles =  [
    { file: topicMaterialFile, name: 'topicMaterial' }, 
    { file: topicClassworkFile, name: 'topicClasswork' }, 
    { file: topicHomeworkFile, name: 'topicHomework' }
];

  const handleChangeTopicNonFile = (event)=>{
    const { name, value } = event.target;
    setTopicDetailsNonFiles({ ...topicDetailsNonFiles, [name]: value });
  }
  const handleChangeTopicFile = (event)=>{
    const { name} = event.target;
    setTopicDetailsFiles({ ...topicDetailsFiles, [name]: event.target.files[0] });
  }

  const addTopicMethod = async( e, newTopicDetailsFiles, courseName, topicDetailsNonFiles )=> {
    setLoadingAddCourseTopic(true);
    await addTopic( e, newTopicDetailsFiles, courseName, topicDetailsNonFiles );
    setLoadingAddCourseTopic(false);
    alert('Topic Added');
  }
 
  return (
     <form onSubmit={(e) => addTopicMethod(
      e, newTopicDetailsFiles, courseName, topicDetailsNonFiles 
      )}>
        <Modal.Header closeButton>
        <Modal.Title>Add a new Topic here</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {/* topic name */}
            <label htmlFor="">Topic Name</label>
            <input type="text" className='form-control'
            value={topicName}
            onChange={handleChangeTopicNonFile}
            name = 'topicName'
            />
            {/* topic intro */}
            <label htmlFor="">Brief Intro to Topic (Optional)</label>
            <input type="text" className='form-control'
            name='topicIntro' 
            value={topicIntro}
            onChange={handleChangeTopicNonFile}
            />
            {/* topic material */}
            <p>Topic Material (optional)</p>
            <label htmlFor="">Upload File</label>
            <input type="file" accept=".pdf" name = 'topicMaterialFile' 
            onChange={handleChangeTopicFile}
            />
            OR
            <label htmlFor="">Paste Link to Topic Material</label>
            <input type="text" className='form-control' name = 'topicMaterialLink' value={topicMaterialLink} 
            onChange={handleChangeTopicNonFile}
            />
            {/* topic classwork */}
            <p>Topic Classwork (optional)</p>
            <label htmlFor="">Upload File</label>
            <input type="file" accept=".pdf" name = 'topicClassworkFile' 
            onChange={handleChangeTopicFile}
            />
            OR
            <label htmlFor="">Paste Link to Topic Classwork</label>
            <input type="text" className='form-control' name = 'topicClassworkLink'
            value={topicClassworkLink}
            onChange={handleChangeTopicNonFile} />
            {/* topic homework */}
            <p>Topic Homework (optional)</p>
            <label htmlFor="">Upload File</label>
            <input type="file" accept=".pdf" name = 'topicHomeworkFile' 
            onChange={handleChangeTopicFile}
            />
            OR
            <label htmlFor="">Paste Link to Topic Homework</label>
            <input type="text" className='form-control' name = 'topicHomeworkLink' 
            value={topicHomeworkLink}
            onChange={handleChangeTopicNonFile}/>
        </Modal.Body> 
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalTopic}>
            Close
          </Button>
          <Button 
          type = 'submit'
          variant="primary">
           Add Topic
          </Button>
          {
            loadingAddCourseTopic && <Button className='ms-3' style = {{all : 'unset'}}>
              <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
              </Spinner>
            </Button>
          }
        </Modal.Footer>
    </form>
  )
}
