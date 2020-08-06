import React, { useContext, useEffect, useState } from 'react';
import { ReportContext } from '../../providers/ReportProvider';
import Report from './Report';
import { Table, FormGroup, Input, Label } from 'reactstrap';
import { LearnerContext } from '../../providers/LearnerProvider';
import "./Report.css";

const ReportList = () => {
    const { reports, getReportByLearner } = useContext(ReportContext);
    const { learners, getLearnersByUserProfile } = useContext(LearnerContext)
    const [id, setLearnerSelection] = useState(null);
    const [date, setDate] = useState(null)

    const renderListItem = (report) => {
        if (report.id > 0) {
            return (
                <Report key={'report-' + report.id} report={report} />
            )
        }
    }

    useEffect(() => {
        getReportByLearner(id, date)
    }, [id, date]);

    useEffect(() => {
        getLearnersByUserProfile()
    }, []);

    const handleLearnerSelection = (e) => {
        setLearnerSelection(e.target.value)
    }

    const handleDateChange = (e) => {
        setDate(e.target.value)
    }

    return (
        <>
            <div class="reportSelections">
                <FormGroup className="reportSelect">
                    <Label for='learnerId'>Select a learner</Label>
                    <Input type="select" onChange={handleLearnerSelection} required id="learnerId">
                        <option value="">Please select...</option>
                        {learners.map((learner) => <option key={learner.id} value={learner.id}>{learner.fullName}</option>)}
                    </Input>
                </FormGroup>

                <FormGroup className="reportSelect">
                    <Label for='Date'>Select Date</Label>
                    <Input type='date' required name='Date' id='date' onChange={handleDateChange} />
                </FormGroup>

            </div>


            <div id="reportList" class="reportTable border-color">
                <Table bordered hover striped>
                    <thead>
                        <tr class="title">
                            <th>Date</th>
                            <th>Name</th>
                            <th>Activity</th>
                            <th>Behavior</th>
                            <th>Consequence</th>
                            <th>Level of Prompting</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <>
                            {
                                (reports.length)
                                    ? reports.map((report) => (
                                        renderListItem(report)
                                    ))
                                    : <tr>
                                        <td colSpan="7" class="alert alert-secondary mt-1" role="alert">Hmmm, looks like you need to select a learner with some reports. You can narrow your search by selecting a date.</td>
                                    </tr>
                            }
                        </>
                    </tbody>
                </Table>
            </div>

        </>
    );
}

export default ReportList