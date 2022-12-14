import React, { useState } from "react";
import {
  Form,
  FloatingLabel,
  Row,
  Button,
  Alert,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import LoadingSpinner from "./LoadingSpinner";
import Table from "./Table";
export default function Input() {
  const [stock, setStock] = useState("");
  const [sPrice, setSPrice] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const [option, setOption] = useState("Call");

  const validateDate = () => {
    var date_regex = /^(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])-(19|20)\d{2}$/;
    if (!date_regex.test(date)) {
      return false;
    }
    return true;
  };
  function change(eventKey) {
    setOption(eventKey);
  }
  async function onClick() {
    if (stock === "" || stock === "sPrice" || date === "") {
      setError("Please fill in all fields");
      return;
    }
    try {
      const url = `http://localhost:8000/bs/${option}/${stock}/${date}/${sPrice}`;
      setError("");
      setLoading(true);
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
      setLoading(false);
    } catch (err) {
      if (!validateDate(date)) {
        setError("Date is invalid is in an invalid Format(MM-DD-YYYY");
      } else {
        setError("Invalid ticker or strike price");
      }
      setLoading(false);
      console.log(err);
    }
  }
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
    
   
   .progress-bar{
        background-color: #28A489;
    }
    }
    `}
      </style>
      <Row className="d-flex justify-content-center align-items-center  ">
        <FloatingLabel
          controlId="floatingInput"
          label="Stock Ticker"
          className="m-4"
        >
          <Form.Control
            type="text"
            placeholder="Stock Ticker"
            style={{ borderColor: "#28A489" }}
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </FloatingLabel>
      </Row>
      <Row className="d-flex justify-content-center align-items-center ">
        <FloatingLabel
          controlId="floatingInput"
          label="Strike Price"
          className="m-4"
        >
          <Form.Control
            type="text"
            placeholder="Strike Price"
            style={{ borderColor: "#28A489" }}
            value={sPrice}
            onChange={(e) => setSPrice(e.target.value)}
            required
          />
        </FloatingLabel>
      </Row>
      <Row className="d-flex justify-content-center align-items-center ">
        <FloatingLabel
          controlId="floatingInput"
          label="Expiration Date"
          className="m-4"
        >
          <Form.Control
            type="text"
            placeholder="Expiration Date"
            style={{ borderColor: "#28A489" }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </FloatingLabel>
      </Row>
      <Row className="d-flex justify-content-center align-items-center ">
        <Dropdown onSelect={change}>
          <Dropdown.Toggle
            // variant="success"
            size="lg"
            id="dropdown-basic"
            className="w-100 "
            variant="select"
          >
            {option}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="Call">Call</Dropdown.Item>
            <Dropdown.Item eventKey="Put">Put</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Row>

      <Row className="d-flex justify-content-center align-items-center ">
        {loading || data == null ? (
          <LoadingSpinner />
        ) : (
          <Button onClick={onClick} varient="primary" className="m-4">
            Get Price
          </Button>
        )}
      </Row>
      <Row className="d-flex justify-content-center align-items-center ">
        {error && <Alert variant="danger">{error}</Alert>}
      </Row>
      <Row className="d-flex justify-content-center align-items-center ">
        {date && !error ? (
          <Table data={data} option={option} />
        ) : (
          console.log("No data")
        )}
      </Row>
    </>
  );
}
