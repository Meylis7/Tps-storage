import { lazy } from "react";

export const Login = lazy(() => import("./login/login"))
export const Briefs = lazy(() => import("./Briefs/briefs"))
export const Fileupload = lazy(() => import("./fileupload/fileupload"))
export const NotFound = lazy(() => import("./notFount"))
export const BriefDetails = lazy(() => import("./briefDetail/briefdDetails"))

