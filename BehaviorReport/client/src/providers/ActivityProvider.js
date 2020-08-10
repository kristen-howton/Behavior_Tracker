import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const ActivityContext = React.createContext();

export const ActivityProvider = (props) => {
    const { getToken } = useContext(UserProfileContext)
    const [activities, setActivities] = useState([]);

    const apiUrl = '/api/activity'

    const getActivity = (id) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()));
    };

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
                }
                throw new Error("Unauthorized");
            }));
    };

    const getActivityByUserProfile = () => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/byuser`, {
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
            })).then(getActivityByUserProfile);
    };

    const deleteActivity = (id) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })).then(getActivityByUserProfile);
    };

    return (
        <ActivityContext.Provider value={{
            activities, setActivities, getAllActivities,
            addActivity, getActivityByUserProfile,
            deleteActivity, editActivity, getActivity
        }}>
            {props.children}
        </ActivityContext.Provider>
    );
};