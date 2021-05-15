import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="text-center mt-5 pt-5">
      <h1>sorry this page is not available</h1>
      <Link to="/">
        <Button>back to home page</Button>
      </Link>
    </div>
  );
}

export default Error;
