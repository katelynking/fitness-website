import React from "react";
import { Navbar, Col, Container, Modal, Tab } from "react-bootstrap";


const Home = () => {
  return (
    <>
    <Navbar />
    <Container as='container'>
      <Col>
        <span className="row justify-content-center">
          <div className="slogan justify-content-center">
            <i>STRENGTH & PERFORMANCE</i>
            <br />
            MADE <b>SIMPLE</b>
          </div>
        </span>
      </Col>
    </Container>
    </>
  );
};

export default Home;
