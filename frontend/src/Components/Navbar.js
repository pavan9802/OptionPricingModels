import { Row, Button, Col } from "react-bootstrap";
import { useState } from "react";
import React from "react";

export default function Navbar() {
  const [algo, setAlgo] = useState("");

  const onChange = (e) => {
    setAlgo(e.target.value);
    console.log(e.target.value);
  };
  return (
    <>
      <style type="text/css">
        {`
   
     .btn-primary {
      background-color: #28A489;
      border-color: #28A489;
      color: white;
     
      
    }    
    .btn-primary:hover{
      background-color: transparent;
      color: black;
    }
    
    .btn-secondary{
      background-color: #043027;
      border-color: #043027;
      color: white;
    }
    .btn-secondary:hover{
      background-color: transparent;
      color: black;
    }
   
    
    `}
      </style>
      <Row class="d-flex flex-row justify-content-between align-items-center w-100 ">
        <Col md={3} className="m-2">
          <Button
            value="black_scholes"
            varient={algo === "black_scholes" ? "secondary" : "primary"}
            onClick={onChange}
          >
            Black-Scholes model
          </Button>
        </Col>
        <Col md={3} className="m-2">
          <Button
            value="monte_carlo"
            varient={algo === "monte_carlo" ? "secondary" : "primary"}
            onClick={onChange}
          >
            Monte Carlo simulation
          </Button>
        </Col>
        <Col md={3} className="m-2">
          <Button
            value="binomial"
            varient={algo === "binomial" ? "secondary" : "primary"}
            onClick={onChange}
          >
            Binomial model
          </Button>
        </Col>
      </Row>
    </>
  );
}
