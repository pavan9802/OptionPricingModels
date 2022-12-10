import { Row, Button, Col } from "react-bootstrap";
import { useState } from "react";
import React from "react";

export default function Navbar() {
  const [alog, setAlgo] = useState("");

  const onChange = (e) => {
    console.log(e);
  };
  return (
    <Row class="d-flex justify-content-between align-items-center  ">
      <Col md={6} class="w-100">
        <Button class="btn btn-info m-4">Black-Scholes model</Button>
      </Col>
      <Col md={6} class="w-100">
        <Button class="btn btn-info m-4">Monte Carlo simulation</Button>
      </Col>
      <Col md={6} class="w-100">
        <Button class="btn btn-info m-4">Binomial model</Button>
      </Col>
    </Row>
  );
}
