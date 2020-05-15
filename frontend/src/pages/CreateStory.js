import React, { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from "reactstrap";
import {
  CardHeader,
} from '@material-ui/core';
import { Loader, PageTitle } from "../components";
import { AuthConsumer, useSignUpForm } from "../components/core";
import requestClient from "../lib/requestClient";
import { handleApiErrors, isAdmin } from "../lib/utils";

const CreateStory = ({ history }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { inputs, handleInputChange } = useSignUpForm();

  const createNewStory = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const {
      storySummary,
      storyDescription,
      storyType,
      storyComplexity,
      estimatedTime,
      associatedCost,
    } = inputs;

    const payload = {
      summary: storySummary,
      description: storyDescription,
      type: storyType,
      complexity: storyComplexity,
      cost: associatedCost,
      estimatedHrs: estimatedTime,
    };

    setLoading(true);

    const response = await requestClient()
      .post(`/v1/stories`, payload)
      .catch((err) => {
        return err;
      });

    setLoading(false);

    const apiErrors = handleApiErrors(response);

    if (apiErrors) {
      setError(apiErrors);
      return;
    }

    setSuccess(true);
    setTimeout(() => history.push("/stories"), 2000);
  };

  return (
    <AuthConsumer>
      {({ user }) => (
        <Fragment>
           
          <Container className={"create-story"}>
            <Row>
              <Col xl={12}>
                <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }} className={"o-hidden border-0 shadow-lg mb-5"}>
                  {loading && <Loader />}
                  <section className={"p-3 p-md-5"}>
                    <Row>
                      <Col>
                        {!isAdmin(user.role) ? (
                          
                          <Form onSubmit={(e) => createNewStory(e)}>
                          <CardHeader
                          subheader="The information here can be edited"
                          title="Create a story"
                        />
                        <hr/>
                          <Row>
                              <Col>
                                {error && !success ? (
                                  <Alert
                                    color={"danger"}
                                    className={"mb-4"}
                                    children={`${
                                      typeof error === "string"
                                        ? error
                                        : "An error Occured."
                                    }`}
                                  />
                                ) : success ? (
                                  <Alert
                                    color={"success"}
                                    className={"mb-4"}
                                    children={"Story Created Succesfully"}
                                  />
                                ) : (
                                  ""
                                )}
                              </Col>
                            </Row>
                            <FormGroup row>
                              <Label for="storySummary" sm={2}>
                                Summary
                              </Label>
                              <Col sm={10}>
                                <Input
                                  type="text"
                                  name="storySummary"
                                  id="storySummary"
                                  onChange={handleInputChange}
                                  defaultValue={inputs.storySummary}
                                  autoFocus
                                  required
                                />
                              </Col>
                            </FormGroup>

                            
                              <FormGroup row>
                                <Label for="storyDescription" md={2}>
                                  Description
                                </Label>
                                <Col md={10}>
                                <Input
                                  type="textarea"
                                  name="storyDescription"
                                  id="storyDescription"
                                  className="textarea"
                                  onChange={handleInputChange}
                                  defaultValue={inputs.storyDescription}
                                  required
                                />
                                </Col>
                              </FormGroup>
                            
                            
                              <FormGroup row >
                              
                                <Label for="storyType" md={2}>Type</Label>
                                <Col md={10}>
                                <Input
                                  type="select"
                                  name="storyType"
                                  id="storyType"
                                  onChange={handleInputChange}
                                  defaultValue=""
                                  required
                                >
                                  <option value={""} disabled>
                                    Choose
                                  </option>
                                  <option value={"enhancement"}>
                                    Enhancement
                                  </option>
                                  <option value={"bugfix"}>Bugfix</option>
                                  <option value={"development"}>
                                    Development
                                  </option>
                                  <option value={"qa"}>QA</option>
                                </Input>
                                </Col>
                              </FormGroup>
                            
                            
                              <FormGroup row>
                                <Label md={2} for="storyComplexity">Complexity</Label>
                                <Col md={10}>
                                <Input
                                  type="select"
                                  name="storyComplexity"
                                  id="storyComplexity"
                                  onChange={handleInputChange}
                                  defaultValue=""
                                  required
                                >
                                  <option value={""} disabled>
                                    Choose
                                  </option>
                                  <option value={"low"}>Low</option>
                                  <option value={"mid"}>Medium</option>
                                  <option value={"high"}>High</option>
                                </Input>
                                </Col>
                              </FormGroup>
                            
                            
                              <FormGroup row>
                                <Label  md={2} for="estimatedTime">
                                  Estimated Time
                                </Label>
                                <Col md={10}>
                                <Input
                                  type="number"
                                  name="estimatedTime"
                                  id="estimatedTime"
                                  placeholder="time in hrs"
                                  required
                                  onChange={handleInputChange}
                                  defaultValue={inputs.estimatedTime}
                                />
                                </Col>
                              </FormGroup>
                            
                            
                              <FormGroup row>
                                <Label md={2} for="associatedCost">Cost</Label>
                                <Col md={10}>
                                <InputGroup>
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>in $</InputGroupText>
                                  </InputGroupAddon>
                                  <Input
                                    id="associatedCost"
                                    name="associatedCost"
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    required
                                    onChange={handleInputChange}
                                    defaultValue={inputs.associatedCost}
                                  />
                                </InputGroup>
                                </Col>
                              </FormGroup>
                            

                            <Row>
                              <Col md={12}>
                                <Button
                                  type="submit"
                                  color="primary"
                                  children="Create Story"
                                  size="lg"
                                  block
                                  disabled={loading || success}
                                />
                              </Col>
                            </Row>
                            
                          </Form>
                        ) : (
                          <Fragment>
                            <Alert
                              color={"danger"}
                              className={"mb-4"}
                              children={"Sorry, you cannot create a story"}
                            />
                            <span className={"d-none"}>
                              {setTimeout(() => history.push("/stories"), 2000)}
                            </span>
                          </Fragment>
                        )}
                      </Col>
                    </Row>
                  </section>
                </Card>
              </Col>
            </Row>
          </Container>
        </Fragment>
      )}
    </AuthConsumer>
  );
};

export default withRouter(CreateStory);
