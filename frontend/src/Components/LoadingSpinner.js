import React from "react";

import { Button } from "react-bootstrap";
function LoadingSpinner() {
  return (
    <>
      <style type="text/css">
        {`
   
     .btn-primary {
      background-color: #28A489;
      border-color: #28A489;
      color: white;
     
    }   
    }
    `}
      </style>
      <Button className="m-4" varient="primary" type="button" disabled>
        <span
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        <span class="sr-only">Loading...</span>
      </Button>
    </>
  );
}

export default LoadingSpinner;
