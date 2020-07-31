import React from "react";

const Report = ({ report }) => {
    return (
        <>
            <tr>
                <td>{report.learner?.fullName}</td>
                <td>{report.behavior?.behaviorName}</td>
                <td>{report.consequence?.consequenceName}</td>
                <td>{report.activity?.activityName}</td>
                <td>{report?.note}</td>
            </tr>
        </>
    );
};

export default Report;