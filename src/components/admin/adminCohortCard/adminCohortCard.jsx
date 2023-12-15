import React from 'react';
import { Card, Button, ListGroup } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { BiShow } from 'react-icons/bi';
import { AiFillDelete} from 'react-icons/ai';
import { Tooltip } from 'react-tooltip';
import { Link } from 'react-router-dom';

import LOGO from '../../../assets/images/rad5.png';

export default function AdminCohortCard({cohortGroup}) {
    console.log(cohortGroup);
    const {cohorts, courseCode, courseName } = cohortGroup;
  return (
    <Card>
      <Card.Img variant="top" src={LOGO} />
      <Card.Body>
        <Card.Title>{courseName} Cohorts</Card.Title>
        <Card.Text>
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        {
            cohorts.map((cohort, index) =>{
                return <ListGroup.Item key = {index}>Cohort {cohort.cohort}</ListGroup.Item>
            })
        }
      </ListGroup>
      <Card.Body>
      <div className='row justify-content-center'>
            <div className='col-auto'>
                <div className='row' style={{gap:'10px'}}>
                   {/* <Link
                        to ={`/admin/courses/view_course/${courseData.courseName}`}
                        className='btn btn-primary col'
                        data-tooltip-id="course_card_tip" 
                        data-tooltip-content="View Course"
                        
                        >
                          <Tooltip id="course_card_tip" />
                            <BiShow /> 
                    </Link> */}
                    {/* <button className='btn btn-secondary col'
                     data-tooltip-id="course_card_tip" 
                     data-tooltip-content="Edit Course">
                      <FaEdit /> 
                    </button> */}
                    {/* <button className='btn btn-danger col' onClick={()=> removeCourse(courseData.courseName)}
                    data-tooltip-id="course_card_tip" 
                    data-tooltip-content="Delete Course"
                    >
                      <AiFillDelete />
                    </button> */}
                </div>
            </div>
        </div>
      </Card.Body>
    </Card>
  )
}
