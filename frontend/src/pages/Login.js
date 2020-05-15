import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { Loader, Logo } from "../components";
import { AuthConsumer, useSignUpForm } from "../components/core";
import requestClient from "../lib/requestClient";
import { handleApiErrors, isAdmin } from "../lib/utils";

const LoginWrapper = (props) => (
  <AuthConsumer>
    {({ authenticated, user, setAuthData }) => {
      return (
        <Login
          {...props}
          setAuthData={setAuthData}
          authenticated={authenticated}
          user={user}
        />
      );
    }}
  </AuthConsumer>
);

const Login = ({ setAuthData, authenticated, user }) => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState(false);
  const { inputs, handleInputChange } = useSignUpForm();

  useEffect(() => {
    document.title = "Login";
  });

  const adminToggle = () => setAdmin(!admin);

  const initiateLogin = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { email, password } = inputs;

    const payload = {
      email,
      password,
      isAdmin: admin,
    };

    setLoading(true);

    const response = await requestClient()
      .post(`/v1/signin`, payload)
      .catch((err) => {
        return err;
      });

    setLoading(false);

    const apiErrors = handleApiErrors(response);

    if (apiErrors) {
      setError(apiErrors);
      return;
    }

    const { token, firstName, lastName, id, role } = response.data;

    setSuccess(true);
    setAuthData({
      authenticated: true,
      token,
      user: {
        firstName,
        lastName,
        id,
        role,
      },
    });
  };

  return !authenticated ? (
    <section className={"login"}>
      <Container>
        <Row className={"justify-content-center"}>
          <Col lg={3} md={2} sm={1} />
          <Col lg={6} md={8} sm={10}>
            <Card className={"o-hidden border-0 shadow-lg my-5"}>
              <CardBody className={"p-0"}>
                {loading && <Loader />}
                <Row>
                  <Col>
                    <section className={"d-block p-4 p-md-5"}>
                      <figure className={"text-center mb-4"}>
                        <Logo className={"logo"} />
                      </figure>
                      {error ? (
                        <Alert
                          color={"danger"}
                          className={"mb-4 text-center"}
                          children={`${
                            typeof error === "string"
                              ? error
                              : "There was an error logging in, Please, try again later."
                          }`}
                        />
                      ) : success ? (
                        <Alert color={"success"} className={"mb-4 text-center"}>
                          Login successful
                        </Alert>
                      ) : (
                        ""
                      )}
                      <Form onSubmit={initiateLogin}>
                        <FormGroup>
                          <Input
                            required
                            type="email"
                            name="email"
                            placeholder="Email"
                            className={"input-auth"}
                            onChange={handleInputChange}
                            defaultValue={inputs.email}
                            autoFocus
                          />
                        </FormGroup>

                        <FormGroup>
                          <Input
                            required
                            type="password"
                            name="password"
                            placeholder="Password"
                            className={"input-auth"}
                            onChange={handleInputChange}
                            defaultValue={inputs.password}
                          />
                        </FormGroup>

                        <FormGroup check>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="admin-user"
                              onChange={adminToggle}
                            />{" "}
                            Site Admin
                          </Label>
                        </FormGroup>

                        <Button
                          block
                          type={"submit"}
                          color={"primary"}
                          className={"btn-auth"}
                          children={"Login"}
                        />
                      </Form>
                    </section>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg={3} md={2} sm={1} />
        </Row>
      </Container>
    </section>
  ) : isAdmin(user.role) ? (
    <Redirect to={"/dashboard"} />
  ) : (
    <Redirect to={"/stories/new"} />
  );
};

export default LoginWrapper;
