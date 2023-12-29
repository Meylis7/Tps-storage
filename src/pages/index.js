import { lazy } from "react";

export const Login = lazy(() => import("./login/login"))
export const Home = lazy(() => import("./home/home"))
export const Fileupload = lazy(() => import("./fileupload/fileupload"))
export const NotFound = lazy(() => import("./notFount"))

