import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";


import history from "./history";
import { NotFound, Home, Login, Fileupload } from "../pages/index";
import ScrollIntoView from "./ScrollIntoView";
import Loading from "../components/loading";


const PublicRoute = lazy(() => import("./PublicRoute"));
const PrivateRoute = lazy(() => import("./PrivateRoute"));
const App = () => {

  return (
    <BrowserRouter history={history}>
      <ScrollIntoView>
        <Suspense fallback={<Loading />}>
          <Switch>

            <PrivateRoute
              restricted={false}
              component={Home}
              path="/"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={Home}
              path="/"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={Login}
              path="/login"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={Fileupload}
              path="/fileUpload"
              exact
            />

            <PrivateRoute
              restricted={false}
              component={NotFound}
              path="/login"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={NotFound}
              path="/signup"
              exact
            />
            <Route path="*" component={NotFound} />
          </Switch>
        </Suspense>
      </ScrollIntoView>
    </BrowserRouter>
  );
};

export default App;