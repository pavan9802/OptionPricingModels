import "./App.css";
import { Card, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import Input from "./Components/Input";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [temp, setTemp] = useState("Click Here");

  useEffect(() => {}, []);

  return (
    <Container
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100 card" style={{ maxWidth: "1250px" }}>
        <Card className="d-flex flex-column align-items-center justify-content-center">
          <Card.Body className="m-4">
            <Navbar />
            <Input />
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}

export default App;
