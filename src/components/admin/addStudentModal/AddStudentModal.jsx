import React, {useState} from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function AddStudentCohortModal({handleCloseAddStudentModal}) {

  return (
   <>
        <form action="">
            <Modal.Header closeButton>
                <Modal.Title>Add Student</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label htmlFor=""></label>
                <input type="text" />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseAddStudentModal}>
                Close
                </Button>
                <Button variant="primary">
                Add Student
                </Button>
            </Modal.Footer>

        </form>
   </>
  )
}
