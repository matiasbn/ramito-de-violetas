import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import './App.css';
import { NavBar } from './components/NavBar';
import { AppProvider } from './store';
import { Button, Card, CardGroup, Col, Container } from 'react-bootstrap';

function App() {
  const [number, setNumber] = useState((Math.random() * 1000) | 0);
  function handleRandomNumber() {
    setNumber((Math.random() * 1000) | 0);
  }
  return (
    <AppProvider>
      <div className="App">
        <NavBar />
        <Container>
          <Col>
            <CardGroup>
              <Card>
                <Card.Img variant="top" src="holder.js/100px160" />
                <Card.Body>
                  <Card.Title>Ramito de violetas</Card.Title>
                  <Card.Text>Random number:{number}</Card.Text>
                  <Button onClick={handleRandomNumber} variant="primary">
                    Generate Ramito
                  </Button>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated 3 mins ago</small>
                </Card.Footer>
              </Card>
            </CardGroup>
          </Col>
        </Container>
      </div>
    </AppProvider>
  );
}

export default App;
