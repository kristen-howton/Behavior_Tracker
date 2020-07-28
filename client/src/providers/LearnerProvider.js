import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const LearnerContext = React.createContext();

export const LearnerProvider = (props) => {
    const { getToken } = useContext(UserProfileContext)
    const [learners, setLearners] = useState([]);

    const apiUrl = '/api/learner'

    const getLearner = (id) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setLearners));
    };

    const getAllLearners = () => {
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setLearners));
    };

    const addLearner = (learner) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(learner)
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            }));
    };

    const getLeanersByUserProfile = () => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/bylearner`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setLearners));
    };

    const editLearner = (id, learner) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(learner)
            })).then(getLeanersByUserProfile);
    };

    const deleteLearner = (id) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })).then(getLeanersByUserProfile);
    };

    return (
        <LearnerContext.Provider value={{
            learners, getAllLearners, addLearner,
            getLeanersByUserProfile, deleteLearner,
            editLearner, getLearner
        }}>
            {props.children}
        </LearnerContext.Provider>
    );
};