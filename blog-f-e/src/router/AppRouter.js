import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import createHistory from 'history/createBrowserHistory';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Blogs from "../components/Blogs";
import Login from "../components/Login";
import Register from "../components/Register";
import NewBlog from "../components/NewBlog";
import NotFound from "../components/NotFound";
import BlogPage from "../components/BlogPage";
import UserPage from "../components/UserPage";
import SavedBlogs from "../components/SavedBlogs";
import SignRoute from "./SignRoute";
import PrivateRoute from "./PrivateRoute";

export const history = createHistory();

const AppRoute = () => (
    <Router history={history}>
        <div>
            <div className="body-app">
                <Header />
                <Switch>
                <Route path="/" component={Blogs} exact={true} />
                    <SignRoute path="/login" component={Login} />
                    <SignRoute path="/register" component={Register} />
                    <PrivateRoute path="/new" component={NewBlog} />
                    <Route path="/blog/:bid" component={BlogPage} />
                    <Route path="/user/:uid" component={UserPage} />
                    <PrivateRoute path="/saves" component={SavedBlogs} />
                    <Route component={NotFound} />
                </Switch>
            </div>
            <Footer />
        </div>
    </Router>
)

export default AppRoute;

//<Route path="/" component={Blogs} exact={true} /> //Public
//<Route path="/login" component={Login} /> //Public
//<Route path="/register" component={Register} /> //Public
//<Route path="/new" component={NewBlog} /> //Private
//<Route path="/blog/:bid" component={BlogPage} /> //Public
//<Route path="/user/:uid" component={UserPage} /> //Public
//<Route path="/saves" component={SavedBlogs} /> //Private