import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import { NotFound } from "../pages";
import { isLogin } from "../utils";
import Loading from "../components/loading";


const Header = React.lazy(() => import("../components/header"));


const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                isLogin() || true ? (
                    <div>
                        <Suspense fallback={<Loading />}>
                            <Header />
                        </Suspense>
                        <div className="h-[95vh] w-[90%] max-w-[1360px] mx-auto my-10 ">

                            <Component {...props} />

                        </div>
                    </div>
                ) : (
                    <Route component={NotFound} />

                )
            }
        />
    );
};

export default PrivateRoute;