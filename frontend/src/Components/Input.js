import React, { useState } from "react";
import { Form, FloatingLabel, Row, Button } from "react-bootstrap";
import axios from "axios";
export default function Input() {
  const [stock, setStock] = useState("");
  const [sPrice, setSPrice] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");

  const validateDate = () => {
    var date_regex = /^(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])-(19|20)\d{2}$/;
    if (!date_regex.test(date)) {
      return false;
    }
    return true;
  };

  const onClick = () => {
    const url = `http://localhost:8000/bs/${stock}/${date}/${sPrice}`;
    axios
      .get(url)
      .then((res) => setPrice(res.data))
      .catch(console.log("error"));
  };
  return (
    <>
      <Row>
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
      <Row>
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
      <Row>
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
      <Row>
        <Button onClick={onClick} class="btn btn-info m-4">
          Get Price
        </Button>
      </Row>
      {price != "" ? <div>{price.call}</div> : console.log("n")}
      {price != "" ? <div>{price.put}</div> : console.log("n")}
    </>
  );
}
