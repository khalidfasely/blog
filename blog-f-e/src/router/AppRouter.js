import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import createHistory from 'history/createBrowserHistory';
import Header from "../components/Header";
import Blogs from "../components/Blogs";
import Profile from "../components/Profile";
import Login from "../components/Login";
import Register from "../components/Register";
import NewBlog from "../components/NewBlog";
import NotFound from "../components/NotFound";
import BlogPage from "../components/BlogPage";
import UserPage from "../components/UserPage";

export const history = createHistory();

const AppRoute = () => (
    <Router history={history}>
        <div>
        <Header />
        <Switch>
            <Route path="/" component={Blogs} exact={true} />
            <Route path="/profile" component={Profile} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/new" component={NewBlog} />
            <Route path="/blog/:bid" component={BlogPage} />
            <Route path="/user/:uid" component={UserPage} />
            <Route component={NotFound} />
        </Switch>
        </div>
    </Router>
)

export default AppRoute;