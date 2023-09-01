import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import RAD5_LOG0 from '/rad5.png'

export default function Navbar() {
  return (
    <Container>
        <Row>
            <Col xs = '3' >
                <img src={RAD5_LOG0} alt="RAD5_LOGO" className='img-fluid' />
            </Col>
        </Row>
    </Container>
  )
}
