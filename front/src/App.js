import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import "./App.scss";
import { Auth, AuthConsumer, Layout } from "./components/core";
import { Login } from "./pages/";

const App = () => {
  return (
    <Auth>
      <Router>
        <AuthConsumer>
          {({ authenticated }) =>
            authenticated ? (
              <Route path="/" component={Layout} />
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { referer: window.location.pathname },
                }}
              />
            )
          }
        </AuthConsumer>
        <Route path="/login" component={Login} />
      </Router>
    </Auth>
  );
};

export default App;
