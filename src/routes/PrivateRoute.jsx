import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import { Login, NotFound } from "../pages";
import { isLogin } from "../utils";
import Loading from "../components/loading";


const Header = React.lazy(() => import("../components/header"));


const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                isLogin() ? (
                    <div>
                        <Suspense fallback={<Loading />}>
                            <Header />
                        </Suspense>
                        <Component {...props} />
                    </div>
                ) : (
                    <Route component={Login} />
                )
            }
        />
    );
};

export default PrivateRoute;