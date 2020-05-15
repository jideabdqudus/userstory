import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Header } from "..";
import { CreateStory, Dashboard, SingleStory, Stories } from "../../pages";
import { AuthConsumer } from "./";

const LayoutWrapper = (props) => (
  <AuthConsumer>
    {({ user, logout }) => {
      return <Layout {...props} user={user} logout={logout} />;
    }}
  </AuthConsumer>
);

const Layout = ({ user, logout }) => {
  useEffect(() => {
    startTimeout();
  });

  let logoutTimer;

  const startTimeout = () => {
    logoutTimer = setTimeout(logout, 900 * 1000);
  };

  const resetTimeout = () => {
    if (logoutTimer) clearTimeout(logoutTimer);
    startTimeout();
  };

  const events = [
    "load",
    "mousemove",
    "mousedown",
    "click",
    "scroll",
    "keypress",
  ];

  for (var i in events) {
    window.addEventListener(events[i], resetTimeout);
  }

  return (
    <section id={"layout"}>
      <Header fullName={`${user.firstName} ${user.lastName}`} logout={logout} />

      <Switch>
        <Route
          path="/"
          exact
          render={() => (
            <Redirect
              to={{
                pathname: "/dashboard",
              }}
            />
          )}
        />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/stories" component={Stories} />
        <Route exact path="/stories/story-:id" component={SingleStory} />
        <Route exact path="/stories/new" component={CreateStory} />\
      </Switch>
    </section>
  );
};

export default LayoutWrapper;
