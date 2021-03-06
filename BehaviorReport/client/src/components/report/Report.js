import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Collapse, Button } from 'reactstrap';
import "./Report"

const Report = ({ report }) => {

    const [openNote, setOpenNote] = useState(false)
    const toggleOpenNote = () => setOpenNote(!openNote)

    let dateFormat
    if (report.date) {
        const date = new Date(report.date);
        const [{ value: month }, , { value: day }, , { value: year }] = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }).formatToParts(date);
        dateFormat = `${month} ${day}, ${year}`
    }

    return (
        <>
            <tr class="report">
                <td>{dateFormat}</td>
                <td>{report.learner?.fullName}</td>
                <td><Link to={`/activityDetails/${report.activity?.id}`}>{report.activity?.activityName}</Link></td>
                <td>{report.behavior?.behaviorName}</td>
                <td>{report.consequence?.consequenceName}</td>
                <td>{report.promptLevel?.prompt}</td>
                <td><Button onClick={toggleOpenNote}>View note</Button></td>
            </tr>
            <Collapse className="wordBreak" colSpan="8" isOpen={openNote}>
                {report?.note}
            </Collapse>


        </>
    );
};

export default Report;