import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const BehaviorContext = React.createContext();

export const BehaviorProvider = (props) => {
    const { getToken } = useContext(UserProfileContext)
    const [behaviors, setBehaviors] = useState([]);

    const apiUrl = '/api/behavior'

    const getBehavior = (id) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setBehaviors));
    };

    const getAllBehaviors = () => {
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setBehaviors));
    };

    const addBehavior = (behavior) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(behavior)
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            }));
    };

    const getBehaviorsByLearner = (id) => {
        return getToken().then((token) => {
            if (id === null || id === "") {
                setBehaviors([])
            } else {
                fetch(`${apiUrl}/bylearner/${id}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(resp => resp.json())
                    .then(setBehaviors)
            }
        });
    };

    const editBehavior = (id, behavior) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(behavior)
            })).then(getAllBehaviors);
    };

    const deleteBehavior = (id) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })).then(getAllBehaviors);
    };

    return (
        <BehaviorContext.Provider value={{
            behaviors, setBehaviors, getAllBehaviors, addBehavior,
            getBehaviorsByLearner, deleteBehavior,
            editBehavior, getBehavior
        }}>
            {props.children}
        </BehaviorContext.Provider>
    );
};