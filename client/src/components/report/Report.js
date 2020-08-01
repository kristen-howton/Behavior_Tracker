import React from "react";

const Report = ({ report }) => {

    let dateFormat
    if (report.date) {
        const date = new Date(report.date);
        const [{ value: month }, , { value: day }, , { value: year }] = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }).formatToParts(date);
        dateFormat = `${month} ${day}, ${year}`
    }

    return (
        <>
            <tr>
                <td>{dateFormat}</td>
                <td>{report.learner?.fullName}</td>
                <td>{report.activity?.activityName}</td>
                <td>{report.behavior?.behaviorName}</td>
                <td>{report.consequence?.consequenceName}</td>
                <td>{report.promptLevel?.prompt}</td>
                <td>{report?.note}</td>
            </tr>


        </>
    );
};

export default Report;