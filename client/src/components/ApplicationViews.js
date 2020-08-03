import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import AddActivityForm from "./activity/AddActivityForm";
import ActivityList from "./activity/ActivityList";
import LearnerList from "./learner/LearnerList";
import BehaviorList from "./behavior/BehaviorList";
import ReportForm from "./report/ReportForm";
import ReportList from "./report/ReportList";
import ActivityDetails from "./activity/ActivityDetails";


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

                <Route path="/behavior" exact>
                    {isLoggedIn ? <BehaviorList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/report" exact>
                    {isLoggedIn ? <ReportList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/reportForm" exact>
                    {isLoggedIn ? <ReportForm /> : <Redirect to="/login" />}
                </Route>

                <Route path="/activityDetails/:id" exact>
                    {isLoggedIn ? <ActivityDetails /> : <Redirect to="/login" />}
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