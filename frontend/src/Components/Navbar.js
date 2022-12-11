import { Row, Button, Col, ButtonGroup, ToggleButton } from "react-bootstrap";
import { useState } from "react";
import React from "react";

export default function Navbar() {
  const [algo, setAlgo] = useState("");
  const [radioValue, setRadioValue] = useState("1");
  const radios = [
    { name: "Black Scholes Model", value: "bs" },
    { name: "Monte Carlo Simulation", value: "mc" },
    { name: "Binomial Model", value: "bm" },
  ];
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
        <ButtonGroup>
          {radios.map((radio, idx) => (
            <Col md={3} className="m-4 w-33 ">
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={radioValue === radio.value ? "secondary" : "primary"}
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
                className="w-100"
              >
                {radio.name}
              </ToggleButton>
            </Col>
          ))}
        </ButtonGroup>
      </Row>
    </>
  );
}
