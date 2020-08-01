import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PromptLevelContext = React.createContext();

export const PromptLevelProvider = (props) => {

    const { getToken } = useContext(UserProfileContext)
    const [promptLevels, setPromptLevels] = useState([]);

    const apiUrl = '/api/promptLevel'

    const getPromptLevels = (id) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setPromptLevels));
    };

    const getAllPromptLevels = () => {
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setPromptLevels));
    };

    return (
        <PromptLevelContext.Provider value={{
            promptLevels, getPromptLevels, getAllPromptLevels
        }}>
            {props.children}
        </PromptLevelContext.Provider>
    );
};