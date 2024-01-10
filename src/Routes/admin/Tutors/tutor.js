import React,{useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Container, Row,Modal, Form, FormControl, Col } from "react-bootstrap";
import TUTORScss from './tutor.module.css'
import {Github, Instagram, PlusLg, Twitter } from "react-bootstrap-icons";
import Tutors from './tutor.json'

export default function Tutorial() {

  const [jsonData,setJsonData]= useState(Tutors)
  const [name,setName]= useState("")
  const [course,setCourse]= useState("")
  const [img,setImg]= useState("")
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [imageUrl, setImageUrl] = useState(null); 

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      validateImage(file);
    }
  };

  const validateImage = (file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const image = new Image();
      image.src = e.target.result;

      image.onload = () => {
        if (image.width > 0 && image.height > 0) {
          // The file is a valid image
          setErrorMessage('');
          setImageUrl(e.target.result); // Set the image URL for display
        } else {
          setErrorMessage('Invalid image file. Please select a valid image.');
        }
      };
    };

    reader.readAsDataURL(file);
  };
 
  useEffect=()=>{
    setImg(imageUrl)
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (save) => {
    save={name,course,img}
    let upDateData=[...jsonData,save]
    console.log(save)
    handleClose()
    setJsonData(upDateData)
  }

    return(
        <section className={TUTORScss.TUTORS}>
            {/* where tutors data are mapped out. */}
            <Container>
                <h2 className={`text-center pt-4 pb-3 ${TUTORScss.header}`}>OUR TUTORS</h2>
                <Row xl={3} lg={3} md={2} sm={2} xs={1}>
                    {/* where tutors data are mapped out. */}
                    {jsonData.map((ourTutors,index,jsonData)=>{
                        return(
                        <div key={index}>
                                <Card  className={`text-center ${TUTORScss.ourTutorscard} my-2 rounded-4`} >
                                    <div className={`text-center mt-4 ${TUTORScss.cardImg}`}>
                                      <img src={ ourTutors.img} alt={ourTutors.name}  className={`${TUTORScss.cardimg}` } roundedCircle/>
                                    </div>
                                    <Card.Body className="text-center">
                                        <Card.Title className={TUTORScss.ourTutorsname}>{ourTutors.name}</Card.Title>
                                        <Card.Subtitle className={TUTORScss.ourTutorscourse}>Course: {ourTutors.course}</Card.Subtitle>
                                        <div className="mt-3">
                                           <Button className="rounded-5 btn btn-primary mx-1 btn-sm"><Instagram/></Button>
                                            <Button  className="rounded-5 btn btn-primary mx-1 btn-sm"><Twitter/></Button>
                                            <Button  className="rounded-5 btn btn-primary mx-1 btn-sm"><Github/></Button>
                                        </div>
                                    </Card.Body>
                                    <div>
                                        <Button className={`btn mb-4 px-5 mt-3 ${TUTORScss.cardBtn}`}> <b> EDIT </b></Button>
                                    </div>
                                </Card>
                        </div>
                        )
                    })}
                </Row>
            </Container>
            {/* add tutors button */}
            <div className="position-relative">
                <Button className="btn btn-primary rounded-5  position-absolute bottom-0 end-0"  title="Add a tutor" onClick={handleShow}><PlusLg/></Button>
            </div>
            {/* inputs for adding tutors data */}
            <Modal show={show} onHide={handleClose} className="bg-light">
                <Modal.Header closeButton className="border-0">
                <Modal.Title><b>Add Your Tutors</b></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col>
                                <FormControl type="text"  size="sm" placeholder="Enter your full Name" onChange={(e)=>setName(e.target.value)} required/>
                            </Col>
                            <Col>
                                <FormControl type="text"  size="sm" placeholder="Enter your course of choice" onChange={(e)=>setCourse(e.target.value)} required/>
                            </Col>
                            <Form.Group controlId="formFile" className="mt-3">
                                <Form.Control type="file" size="sm" onChange={handleImageUpload} required accept="image/*" />
                            </Form.Group>
                            <Form.Text>
                                 choose an image from your file and upload
                            </Form.Text>
                            <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Describe the course</Form.Label>
                                <Form.Control as="textarea" rows={3} />
                            </Form.Group>
                        </Row>                  
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={()=> handleSubmit()}>
                        ADD
                    </Button>
                </Modal.Footer>
            </Modal>          
        </section>
    )
}