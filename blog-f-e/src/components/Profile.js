import React from "react";
import { Link } from "react-router-dom";

const Profile = () => (
    <div>
        <h1>Profile</h1>
        <Link to='/' >Home</Link>
        <Link to='/saves' >Save Blogs</Link>
    </div>
)

export default Profile;