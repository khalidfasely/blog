import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
    <div className="content-container error-404" data-testid='404-message'>
        <span>404 - Not Found </span><Link to='/'>Go Home.</Link>
    </div>
);

export default NotFound;