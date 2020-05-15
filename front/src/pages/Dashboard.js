import React, { Fragment, useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Alert, Badge, Card, Col, Container, Row, Table } from "reactstrap";
import { Loader, PageTitle } from "../components";
import { AuthConsumer } from "../components/core";
import requestClient from "../lib/requestClient";
import { filterData, handleApiErrors, isAdmin, titleCase } from "../lib/utils";

const DashboardWrapper = (props) => (
  <AuthConsumer>
    {({ user }) => {
      return <Dashboard {...props} user={user} />;
    }}
  </AuthConsumer>
);

const Dashboard = ({ history, user }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stories, setStories] = useState([]);
  const [pendingStories, setPendingStories] = useState();

  useEffect(() => {
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

      const pendingStories = filterData(response.data, "status", "pending");

      if (isAdmin(user.role) && pendingStories.length > 0) {
        setStories(pendingStories);
        setPendingStories(pendingStories);
      } else {
        setStories(response.data);
      }
    };
    getStories();
  }, [user.role]);

  return (
    <Fragment>
      <PageTitle
        title={"Dashboard"}
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
              <section className={"p-3 p-md-5"}>
                <Row>
                  <Col xs={12}>
                    {isAdmin(user.role) && pendingStories ? (
                      <p className={"lead"}>Pending Stories</p>
                    ) : (
                      <p className={"lead"}>All Stories</p>
                    )}
                  </Col>
                  <Col xs={12}>
                    {!loading && !error && stories.length < 1 ? (
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
                            <th>Summary</th>
                            <th>Type</th>
                            <th className={"text-center"}>Complexity</th>
                            <th className={"text-center"}>Time</th>
                            <th className={"text-center"}>Cost</th>
                            <th className="text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {stories.map((story, index) => (
                            <tr
                              onClick={() =>
                                history.push(`/stories/story-${story.id}`)
                              }
                              key={index}>
                              <td>{story.summary}</td>
                              <td>{titleCase(story.type)}</td>
                              <td className={"text-center"}>
                                {titleCase(story.complexity)}
                              </td>
                              <td className={"text-center"}>
                                {story.estimatedHrs}
                              </td>
                              <td className={"text-center"}>{story.cost}</td>
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
  );
};

export default withRouter(DashboardWrapper);
