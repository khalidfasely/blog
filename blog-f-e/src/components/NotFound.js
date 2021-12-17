import React from "react";
import { BrowserRouter, Link } from "react-router-dom";

const NotFound = () => (
    <div data-testid='404-message'>
        404 - Not Found <BrowserRouter><Link to='/'>Go Home</Link></BrowserRouter>
    </div>
);

export default NotFound;