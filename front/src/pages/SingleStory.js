import React, { Fragment, useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Alert, Badge, Button, Card, Col, Container, Row } from "reactstrap";
import { Loader, PageTitle } from "../components";
import { AuthConsumer } from "../components/core";
import requestClient from "../lib/requestClient";
import { handleApiErrors, titleCase } from "../lib/utils";

const SingleStory = ({ history, match }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [story, setStory] = useState([]);

  useEffect(() => {
    getStory();
    // eslint-disable-next-line
  }, []);

  const getStory = async () => {
    setLoading(true);

    const { id } = match.params;

    const response = await requestClient()
      .get(`/v1/stories/${id}`)
      .catch((error) => {
        return error;
      });

    setLoading(false);

    const apiErrors = handleApiErrors(response);

    if (apiErrors) {
      setError({ loadFailed: apiErrors });
      return;
    }

    setStory(response.data);
  };

  const modifyStory = async (action) => {
    setLoading(true);
    const { id } = match.params;

    const response = await requestClient()
      .post(`/v1/stories/${id}`, { status: action })
      .catch((error) => {
        return error;
      });

    setLoading(false);

    const apiErrors = handleApiErrors(response);
    if (apiErrors) {
      setError({ modifyFailed: apiErrors });
      return;
    }

    getStory();
    setTimeout(() => {
      history.push("/stories");
      setLoading(true);
    }, 2000);
  };

  return (
    <AuthConsumer>
      {({ user }) => (
        <Fragment>
          <PageTitle
            title={"Story details" || "There was an error"}
            button={
              user.role.toLowerCase() === "admin" ? (
                story.status === "pending" && (
                  <Fragment>
                    <Button
                      color={"danger"}
                      className={"px-4"}
                      onClick={() => modifyStory("rejected")}>
                      Reject
                    </Button>{" "}
                    <Button
                      color={"success"}
                      className={"px-4"}
                      onClick={() => modifyStory("approved")}>
                      Approve
                    </Button>
                  </Fragment>
                )
              ) : (
                <Link to={"/stories/new"} className="btn btn-primary">
                  Create New Story
                </Link>
              )
            }
          />

          <Container className={"stories"}>
            <Row>
              <Col xl={12}>
                <Card className={"o-hidden border-0 shadow-lg mb-5"}>
                  {loading && <Loader />}
                  <section className={"p-4 p-md-5"}>
                    <Row>
                      <Col>
                        {(!loading && !story) || error.loadFailed ? (
                          <Alert
                            color={"danger"}
                            className={"mb-4 text-center"}
                            children={
                              "There was an error loading the story. please, try again later."
                            }
                          />
                        ) : (
                          <Fragment>
                            {(!loading && !story) ||
                              (error.modifyFailed && (
                                <Alert
                                  color={"danger"}
                                  className={"mb-4"}
                                  children={
                                    "There was an error updating story status. please, try again later."
                                  }
                                />
                              ))}
                            <h4 className="mb-3 w-100 d-flex">
                              {story.summary}
                              <small className={"ml-auto"}>
                                {story.status === "approved" ? (
                                  <Badge pill color={"success"}>
                                    {titleCase(story.status)}
                                  </Badge>
                                ) : story.status === "rejected" ? (
                                  <Badge pill color={"danger"}>
                                    {titleCase(story.status)}
                                  </Badge>
                                ) : (
                                  <Badge pill color={"dark"}>
                                    {titleCase(story.status)}
                                  </Badge>
                                )}
                              </small>
                            </h4>
                            <p className="lead text-secondary">
                              {story.description}
                            </p>
                            <ul className={"w-100 d-flex p-0 text-secondary"}>
                              <li className="list-inline-item mr-3">
                                Cost:{" "}
                                <span className="ml-1">${story.cost}</span>
                              </li>
                              <li className="list-inline-item mr-3">
                                Story type:{" "}
                                <span className="ml-1">
                                  {titleCase(story.type)}
                                </span>
                              </li>
                              <li className="list-inline-item mr-3">
                                Estimated Time:{" "}
                                <span className="ml-1">
                                  {story.estimatedHrs}
                                </span>
                              </li>
                            </ul>
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

export default withRouter(SingleStory);
