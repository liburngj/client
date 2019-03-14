import React from "react";
import { Redirect } from "react-router-dom";

/**
 *
 * Another way to export directly your functional component.
 */
export const RegisterGuard = props => {
    if (!localStorage.getItem("username")) {
        return props.children;
    }
    // if user is already registered in, redirects to the login /login
    return <Redirect to={"/login"} />;
};
