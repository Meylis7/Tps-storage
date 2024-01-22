import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";


import history from "./history";
import { NotFound, Briefs, Login, Fileupload, BriefDetails } from "../pages/index";
import ScrollIntoView from "./ScrollIntoView";
import Loading from "../components/loading";


const PublicRoute = lazy(() => import("./PublicRoute"));
const PrivateRoute = lazy(() => import("./PrivateRoute"));
const App = () => {

  return (
    <BrowserRouter  history={history}>
      <ScrollIntoView>
        <Suspense fallback={<Loading />}>
          <Switch>

            <PrivateRoute 
              component={Briefs}
              path="/"
              exact
            />

            <PrivateRoute 
              component={Briefs}
              path="/"
              exact
            />

            <PrivateRoute 
              component={Fileupload}
              path="/fileUpload/:id"
              exact
            />

            <PrivateRoute 
              component={BriefDetails}
              path="/briefDetails/:id"
              exact
            />

            <Route
              component={NotFound}
              path="/signup"
              exact
            />

            <Route
              component={Login}
              path="/login"
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