import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const ConsequenceContext = React.createContext();

export const ConsequenceProvider = (props) => {

    const { getToken } = useContext(UserProfileContext)
    const [consequences, setConsequences] = useState([]);

    const apiUrl = '/api/consequence'

    const getConsequence = (id) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setConsequences));
    };

    const getAllConsequences = () => {
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setConsequences));
    };

    return (
        <ConsequenceContext.Provider value={{
            consequences, getConsequence, getAllConsequences
        }}>
            {props.children}
        </ConsequenceContext.Provider>
    );
};