import React from "react";
import {Spinner} from "reactstrap";

const Loader = () => {
  return (
    <section className="loader d-flex position-absolute justify-content-center align-items-center h-100 w-100">
        <Spinner color={"primary"} style={{ width: '5rem', height: '5rem' }} />
    </section>
  );
};

export default Loader;
