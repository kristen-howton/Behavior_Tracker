import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import AddActivityForm from "./activity/AddActivityForm";
import ActivityList from "./activity/ActivityList";
import LearnerList from "./learner/LearnerList";


export default function ApplicationViews() {
    const { isLoggedIn } = useContext(UserProfileContext);

    return (
        <main>
            <Switch>

                <Route path="/" exact>
                    {isLoggedIn ? <ActivityList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/add" exact>
                    {isLoggedIn ? <AddActivityForm /> : <Redirect to="/login" />}
                </Route>

                <Route path="/learner" exact>
                    {isLoggedIn ? <LearnerList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/register">
                    <Register />
                </Route>
            </Switch>
        </main>
    );
};