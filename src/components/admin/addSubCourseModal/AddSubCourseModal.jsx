import React, {useState} from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector} from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';


import { selectCourseName } from '../../../store/courses/courses.selector';
import { addSubCourse } from '../../../utils/courses/addSubCourse';

export default function AddSubCourseModal({handleCloseModalSubCourse}) {
  const courseName = useSelector(selectCourseName);
  const [subCourseName, setSubCourseName] = useState('');
  const [subCourseDesc, setSubCourseDesc] = useState('');
  const [subCourseImage, setSubCourseImage] = useState(null);

  const [addingSubCourse, setAddingSubCourse] = useState(false);

  const addSubCourseMethod = async (e, courseName, subCourseName, subCourseDesc, subCourseImage,)=>{
    setAddingSubCourse(true);
    await addSubCourse(e, courseName, subCourseName, subCourseDesc, subCourseImage, )
    setAddingSubCourse(false);
    alert('Course added')
  }

 
  return (
   <form  onSubmit = {(e) => addSubCourseMethod(e, courseName, subCourseName, subCourseDesc, subCourseImage, )}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new subcourse</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="">Subcourse Name*</label>
          <input type="text" className='form-control mb-3'
          value={subCourseName}
          onChange={(e) => setSubCourseName(e.target.value) }
          required
          />
          <label htmlFor="">Brief Description</label>
          <input type="text" className='form-control mb-3' 
            value={subCourseDesc}
            onChange ={(e) => setSubCourseDesc(e.target.value)}
          />
          <label htmlFor="">SubCourse Image</label>
          <input type = 'file' onChange={(e) => setSubCourseImage(e.target.files[0])} className='form-control mb-2'/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalSubCourse}>
            Close
          </Button>
          <Button type = 'submit' variant="primary">
           Add Subcourse
          </Button>
          {
            addingSubCourse && <Button>
            <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
              </Spinner>
            </Button>
          }
        </Modal.Footer>
   </form>
  )
}
