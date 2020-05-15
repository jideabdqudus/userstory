import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";

const PageTitle = (props) => {
  const { title, button } = props;
  useEffect(() => {
    document.title = title;
  });

  return (
    <Container className="page-title mb-4">
      <Row>
        <Col xl={12} md={7}>
          <h1 className="mb-2 mb-md-0">{title}</h1>
        </Col>
        <Col xl={12} md={5} className="text-md-right">
          {button}
        </Col>
      </Row>
    </Container>
  );
};

PageTitle.defaultProps = {
  title: "",
};

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  button: PropTypes.any,
};

export default PageTitle;
