import React, { useContext, useEffect } from 'react';
import { ReportContext } from '../../providers/ReportProvider';
import Report from './Report';
import { Table } from 'reactstrap';

const ReportList = () => {
    const { reports, getAllReports } = useContext(ReportContext);

    const renderListItem = (report) => {
        if (report.id > 0) {
            return (
                <Report key={'report-' + report.id} report={report} />
            )
        }
    }


    useEffect(() => {
        getAllReports()
    }, []);

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div id="reportList" className="cards-column">
                        <Table bordered hover striped>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Behavior</th>
                                    <th>Consequence</th>
                                    <th>Activity</th>
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