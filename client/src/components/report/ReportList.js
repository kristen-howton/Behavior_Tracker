import React, { useContext, useEffect, useState } from 'react';
import { ReportContext } from '../../providers/ReportProvider';
import Report from './Report';
import { Table, FormGroup, Input, Label } from 'reactstrap';
import { LearnerContext } from '../../providers/LearnerProvider';

const ReportList = () => {
    const { reports, getReportByLearner } = useContext(ReportContext);
    const { learners, getLeanersByUserProfile } = useContext(LearnerContext)
    const [id, setLearnerSelection] = useState(null);

    const renderListItem = (report) => {
        if (report.id > 0) {
            return (
                <Report key={'report-' + report.id} report={report} />
            )
        }
    }

    useEffect(() => {
        getReportByLearner(id)
    }, [id]);

    useEffect(() => {
        getLeanersByUserProfile()
    }, []);

    const handleLearnerSelection = (e) => {
        setLearnerSelection(e.target.value)
    }

    return (
        <>
            <FormGroup>
                <Label for='learnerId'>Select a learner</Label>
                <Input type="select" onChange={handleLearnerSelection} required id="learnerId">
                    <option value="">Please select...</option>
                    {learners.map((learner) => <option key={learner.id} value={learner.id}>{learner.fullName}</option>)}
                </Input>
            </FormGroup>

            <div className="container">
                <div className="row justify-content-center">
                    <div id="reportList" className="cards-column">
                        <Table bordered hover striped>
                            <thead>
                                <tr>
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
                                            : <div className="alert alert-secondary mt-1" role="alert">There were no reports found.</div>
                                    }
                                </>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>

        </>
    );
}

export default ReportList