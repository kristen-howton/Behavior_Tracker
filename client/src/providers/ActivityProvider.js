import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const ActivityContext = React.createContext();

export const ActivityProvider = (props) => {
    const { getToken } = useContext(UserProfileContext)
    const [activties, setActivities] = useState([]);

    const apiUrl = '/api/activity'

    const getAllActivities = () => {
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setActivities));
    };

    const addActivity = (activity) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(activity)
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                } else
                    throw new Error("Unauthorized");
            }));
    };

    const getActivityByUserProfile = (id) => {
        getToken().then((token) =>
            fetch(`apiUrl/getactivitiesbyuser/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setActivities));
    };

    const editActivity = (id, activity) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(activity)
            }));
    };

    const deleteActivity = (id) => {
        getToken().then((token) =>
            fetch(`apiUrl/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setActivities));
    };

    return (
        <ActivityContext.Provider value={{
            activties, getAllActivities, addActivity,
            getActivityByUserProfile, deleteActivity,
            editActivity
        }}>
            {props.children}
        </ActivityContext.Provider>
    );
};