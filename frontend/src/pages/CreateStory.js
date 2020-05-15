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
          <PageTitle title="Create a new story" />
          <Container className={"create-story"}>
            <Row>
              <Col xl={12}>
                <Card className={"o-hidden border-0 shadow-lg mb-5"}>
                  {loading && <Loader />}
                  <section className={"p-3 p-md-5"}>
                    <Row>
                      <Col>
                        {!isAdmin(user.role) ? (
                          <Form onSubmit={(e) => createNewStory(e)}>
                            <Row>
                              <Col md={12}>
                                <FormGroup>
                                  <Label for="storySummary">Summary</Label>
                                  <Input
                                    type="text"
                                    name="storySummary"
                                    id="storySummary"
                                    onChange={handleInputChange}
                                    defaultValue={inputs.storySummary}
                                    autoFocus
                                    required
                                  />
                                </FormGroup>
                              </Col>
                              <Col md={12}>
                                <FormGroup>
                                  <Label for="storyDescription">
                                    Description
                                  </Label>
                                  <Input
                                    type="textarea"
                                    name="storyDescription"
                                    id="storyDescription"
                                    className="textarea"
                                    onChange={handleInputChange}
                                    defaultValue={inputs.storyDescription}
                                    required
                                  />
                                </FormGroup>
                              </Col>
                              <Col md={6}>
                                <FormGroup>
                                  <Label for="storyType">Type</Label>
                                  <Input
                                    type="select"
                                    name="storyType"
                                    id="storyType"
                                    onChange={handleInputChange}
                                    defaultValue=""
                                    required
                                  >
                                    <option value={""} disabled>
                                      -- Select --
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
                                </FormGroup>
                              </Col>
                              <Col md={6}>
                                <FormGroup>
                                  <Label for="storyComplexity">
                                    Complexity
                                  </Label>
                                  <Input
                                    type="select"
                                    name="storyComplexity"
                                    id="storyComplexity"
                                    onChange={handleInputChange}
                                    defaultValue=""
                                    required
                                  >
                                    <option value={""} disabled>
                                      -- Select --
                                    </option>
                                    <option value={"low"}>Low</option>
                                    <option value={"mid"}>Medium</option>
                                    <option value={"high"}>High</option>
                                  </Input>
                                </FormGroup>
                              </Col>
                              <Col md={6}>
                                <FormGroup>
                                  <Label for="estimatedTime">
                                    Estimated Time
                                  </Label>
                                  <Input
                                    type="number"
                                    name="estimatedTime"
                                    id="estimatedTime"
                                    placeholder="in hours"
                                    required
                                    onChange={handleInputChange}
                                    defaultValue={inputs.estimatedTime}
                                  />
                                </FormGroup>
                              </Col>
                              <Col md={6}>
                                <FormGroup>
                                  <Label for="associatedCost">Cost</Label>
                                  <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText>$</InputGroupText>
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
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col md={6}>
                                <Button
                                  type="submit"
                                  color="primary"
                                  children="Create Story"
                                  className=" mb-3"
                                  disabled={loading || success}
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                {error && !success ? (
                                  <Alert
                                    color={"danger"}
                                    className={"mb-4"}
                                    children={`${
                                      typeof error === "string"
                                        ? error
                                        : "There was an error creating your story, please, try again later."
                                    }`}
                                  />
                                ) : success ? (
                                  <Alert
                                    color={"success"}
                                    className={"mb-4"}
                                    children={"Story successfully created"}
                                  />
                                ) : (
                                  ""
                                )}
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
