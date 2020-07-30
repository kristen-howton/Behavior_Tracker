import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const ReportContext = React.createContext();

export const ReportProvider = (props) => {
    const { getToken } = useContext(UserProfileContext)
    const [reports, setReports] = useState([]);

    const apiUrl = '/api/report'

    const getReport = (id) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setReports));
    };

    const getAllReports = () => {
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setReports));
    };

    const addReport = (report) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(report)
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            }));
    };

    const getReportByLearner = () => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/bylearner`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setReports));
    };

    const editReport = (id, report) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(report)
            })).then(getReportByLearner);
    };

    const deleteReport = (id) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })).then(getReportByLearner);
    };

    return (
        <ReportContext.Provider value={{
            reports, getAllReports, addReport,
            getReportByLearner, deleteReport,
            editReport, getReport
        }}>
            {props.children}
        </ReportContext.Provider>
    );
};