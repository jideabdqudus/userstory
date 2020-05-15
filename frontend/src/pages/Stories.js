import React, { Fragment, useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Alert, Badge, Card, Col, Container, Form, Input, Row, Table } from "reactstrap";
import { Loader, PageTitle } from "../components";
import { AuthConsumer } from "../components/core";
import requestClient from "../lib/requestClient";
import { filterData, handleApiErrors, isAdmin, sortData, titleCase } from "../lib/utils";

const Stories = ({ history }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stories, setStories] = useState([]);
  const [paramType, setParamType] = useState("");
  const [param, setParam] = useState("");
  const [sortedStories, setSortedStories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);

  useEffect(() => {
    getStories();
  }, []);

  const getStories = async () => {
    setLoading(true);

    const response = await requestClient()
      .get(`/v1/stories`)
      .catch((error) => {
        return error;
      });

    setLoading(false);

    const apiErrors = handleApiErrors(response);
    if (apiErrors) {
      setError(apiErrors);
      return;
    }
    setFilteredStories([]);
    setSortedStories([]);
    setParamType("");
    setStories(response.data);
  };

  const sortStories = (sortParam) => {
    setLoading(true);
    if (sortParam) {
      const sortStories = sortData(stories, sortParam);

      setParam(sortParam);
      setParamType("sorted");
      setFilteredStories([]);
      setSortedStories(sortStories);
    } else setParamType("");
    setTimeout(() => setLoading(false), 1000);
  };

  const filterStories = (filterParam) => {
    setLoading(true);
    if (filterParam) {
      const filterStories = filterData(stories, "type", filterParam);

      setParam(filterParam);
      setParamType("filtered");
      setSortedStories([]);
      setFilteredStories(filterStories);
    } else setParamType("");
    setTimeout(() => setLoading(false), 1000);
  };

  const listedStory = () => {
    switch (paramType) {
      case "sorted":
        return sortedStories;
      case "filtered":
        return filteredStories;
      default:
        return stories;
    }
  };

  return (
    <AuthConsumer>
      {({ user }) => (
        <Fragment>
          <PageTitle
            title={`${isAdmin(user.role) ? "User" : "My"} Stories`}
            button={
              !isAdmin(user.role) && (
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
                  <section className={"p-3 p-sm-4 p-md-5"}>
                    <Row className="mb-3">
                      <Col lg={6}>
                        {param && (
                          <h5 className={"sm-text-left mb-3 text-secondary"}>
                            {`Stories ${paramType} by ${param}`}
                          </h5>
                        )}
                      </Col>
                      <Col lg={6}>
                        <Form inline className="d-flex justify-content-lg-end">
                          <Input
                            type="select"
                            className="mb-2 mb-sm-0 mr-sm-3"
                            onChange={(e) => filterStories(e.target.value)}>
                            <option value={""}>-- Filter By --</option>
                            <option value={"enhancement"}>Enhancement</option>
                            <option value={"bugfix"}>Bugfix</option>
                            <option value={"development"}>Development</option>
                            <option value={"qa"}>QA</option>
                          </Input>

                          <Input
                            type="select"
                            onChange={(e) => sortStories(e.target.value)}>
                            <option value={""}>-- Sort By --</option>
                            <option value={"id"}>ID</option>
                            <option value={"complexity"}>Complexity</option>
                            <option value={"type"}>Type</option>
                            <option value={"status"}>Status</option>
                          </Input>
                        </Form>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12}>
                        {!loading && !error && listedStory().length < 1 ? (
                          <Alert
                            color={"primary"}
                            className={"mb-4 text-center"}
                            children={
                              "You have not created any story. Create one now"
                            }
                          />
                        ) : error ? (
                          <Alert
                            color={"danger"}
                            className={"mb-4 text-center"}
                            children={
                              "There was an error loading stories. please, try again later."
                            }
                          />
                        ) : (
                          <Table
                            borderless
                            striped
                            responsive
                            hover
                            className="m-0">
                            <thead>
                              <tr>
                                <th>ID</th>
                                <th>Summary</th>
                                <th>Type</th>
                                <th className={"text-center"}>Complexity</th>
                                <th className={"text-center"}>Time</th>
                                <th className={"text-center"}>Cost</th>
                                <th className={"text-right"}>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {listedStory().map((story, index) => (
                                <tr
                                  onClick={() =>
                                    history.push(`/stories/story-${story.id}`)
                                  }
                                  key={index}>
                                  <td>{story.id}</td>
                                  <td>{story.summary}</td>
                                  <td>{titleCase(story.type)}</td>
                                  <td className={"text-center"}>
                                    {titleCase(story.complexity)}
                                  </td>
                                  <td className={"text-center"}>
                                    {story.estimatedHrs}
                                  </td>
                                  <td className={"text-center"}>
                                    {story.cost}
                                  </td>
                                  <td className={"text-right"}>
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
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
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

export default withRouter(Stories);
