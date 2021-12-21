import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
    <div data-testid='404-message'>
        404 - Not Found <Link to='/'>Go Home</Link>
    </div>
);

export default NotFound;