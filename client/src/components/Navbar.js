import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";
import logo from "../img/tri-logo-gold.png";

import Auth from "../utils/auth";

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar className="centered" variant="dark" expand="lg">
        <Container fluid className="justify-content-center">
          <Navbar.Brand as={Link} to="/" className="heading">
            TRAKLETE
          </Navbar.Brand>

          {/* <img src={logo} className='logo'/> */}

          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar">
            <Nav className="ml-auto links">
              <Nav.Link
                as={Link}
                to="/search"
                className="hover-underline-animation"
              >
                Search
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/calories"
                className="hover-underline-animation"
              >
                Calories
              </Nav.Link>
              {/* if user is logged in show saved books and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link
                    as={Link}
                    to="/saved"
                    className="hover-underline-animation"
                  >
                    See Your Exercises
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/chat"
                    className="hover-underline-animation"
                  >
                    Live Chat
                  </Nav.Link>
                  <Nav.Link
                    onClick={Auth.logout}
                    className="hover-underline-animation"
                  >
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link
                  onClick={() => setShowModal(true)}
                  className="hover-underline-animation"
                >
                  Login/Sign Up
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}
      <Modal
        size="md"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
      >
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey="login">
          <Modal.Header closeButton>
            <Modal.Title className="centered" id="signup-modal">
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link id="modal-login" eventKey="login">
                    LOGIN
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link id="modal-login" eventKey="signup">
                    SIGN UP
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
