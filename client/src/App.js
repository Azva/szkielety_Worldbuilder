import React from "react";
import { Nav, Navbar, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Import custom
import logo from "./favicon.png"
import CreateProject from "./components/project/create-project";
import EditProject from "./components/project/edit-project";
import ProjectList from "./components/project/project-list";
import ProjectDetails from "./components/project/project-details";

import CreatePerson from "./components/person/create-person";
import EditPerson from "./components/person/edit-person";
import PersonDetails from "./components/person/person-details";

import CreateLocation from "./components/location/create-location";
import EditLocation from "./components/location/edit-location";
import LocationDetails from "./components/location/location-details";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>
                <Link to={"/"} 
                  className="nav-link">
                  <img src={logo} alt='' width='50' height='50' />
                  Worldbuilder
                </Link>
              </Navbar.Brand>
  
              <Nav className="justify-content-end">
                <Nav>
                  <Link to={"/create-project"} 
                    className="nav-link">
                    Stworz nowy projekt
                  </Link>
                </Nav>
  
                <Nav>
                  <Link to={"/project-list"} 
                    className="nav-link">
                    Wszystkie projekty
                  </Link>
                </Nav>
              </Nav>
            </Container>
          </Navbar>
        </header>
  
        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Routes>
                  <Route exact path="/" 
                    element={<ProjectList/>} />
                  <Route path="/create-project" 
                    element={<CreateProject/>} />
                  <Route path="/edit-project/:id" 
                    element={<EditProject/>} />
                  <Route path="/project-list" 
                    element={<ProjectList/>} />
                  <Route path="/:projectid/project-details" 
                    element={<ProjectDetails/>} />

                  <Route path="/:projectid/create-person" 
                    element={<CreatePerson/>} />
                  <Route path="/:projectid/edit-person/:id" 
                    element={<EditPerson/>} />
                  <Route path="/:projectid/person-details/:id" 
                    element={<PersonDetails/>} />

                  <Route path="/:projectid/create-location" 
                    element={<CreateLocation/>} />
                  <Route path="/:projectid/edit-location/:id" 
                    element={<EditLocation/>} />
                  <Route path="/:projectid/location-details/:id" 
                    element={<LocationDetails/>} />
                </Routes>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
}

export default App;
