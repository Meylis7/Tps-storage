import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import { NotFound } from "../pages";
import Loading from "../components/loading";

const Header = React.lazy(() => import("../components/header"));

const PublicRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
            (
                <div>
                    <Suspense fallback={<Loading />}>
                        <Header />
                    </Suspense>
                    
                    <Component {...props} />
                </div>
            )
            }
        />
    );
};

export default PublicRoute;