import React, { useContext, useRef, useState, useEffect } from 'react'
import { Form, FormGroup, Input, Button, Label } from 'reactstrap'
import { useHistory, useParams } from "react-router-dom";
import { ReportContext } from '../../providers/ReportProvider';
import { BehaviorContext } from '../../providers/BehaviorProvider';
import { LearnerContext } from '../../providers/LearnerProvider';
import { ConsequenceContext } from '../../providers/ConsequenceProvider';
import { ActivityContext } from '../../providers/ActivityProvider';
import { PromptLevelContext } from '../../providers/PromptLevelProvider'
import "./Report.css";

const ReportForm = () => {
    const { addReport, getReportByLearner } = useContext(ReportContext)
    const { behaviors, getBehaviorsByLearner } = useContext(BehaviorContext)
    const { learners, getLearnersByUserProfile } = useContext(LearnerContext)
    const { consequences, getAllConsequences } = useContext(ConsequenceContext)
    const { activities, getActivityByUserProfile } = useContext(ActivityContext)
    const { promptLevels, getAllPromptLevels } = useContext(PromptLevelContext)

    const [date, setDate] = useState()

    const [behaviorSelect, setBehaviorSelection] = useState("");
    const [learnerSelect, setLearnerSelection] = useState("");
    const [consequenceSelect, setConsequenceSelection] = useState("");
    const [activitySelect, setActivitySelection] = useState("");
    const [promptLevelSelect, setPromptLevelSelection] = useState("");

    const history = useHistory();
    const id = useParams();

    const note = useRef()

    useEffect(() => {
        getBehaviorsByLearner(learnerSelect)
    }, [learnerSelect])

    useEffect(() => {
        getLearnersByUserProfile()
        getAllConsequences()
        getActivityByUserProfile()
        getAllPromptLevels()
        getReportByLearner(id)
    }, [])

    const handleBehaviorSelection = (e) => {
        setBehaviorSelection(e.target.value)
    }

    const handleLearnerSelection = (e) => {
        setLearnerSelection(e.target.value)
    }

    const handleConsequenceSelection = (e) => {
        setConsequenceSelection(e.target.value)
    }

    const handleActivitySelection = (e) => {
        setActivitySelection(e.target.value)
    }

    const handleDateChange = (e) => {
        setDate(e.target.value)
    }

    const handlePromptChange = (e) => {
        setPromptLevelSelection(e.target.value)
    }

    const handleSubmit = (event) => {


        const Report = {
            activityId: +activitySelect,
            learnerId: +learnerSelect,
            behaviorId: +behaviorSelect,
            promptLevelId: +promptLevelSelect,
            note: note.current.value,
            date: date,
            consequenceId: +consequenceSelect
        }

        if (!Report.date) {
            window.alert("Must select a date.")
            return
        }

        if (!Report.learnerId) {
            window.alert("Please select a learner.")
            return
        }

        if (!Report.activityId) {
            window.alert("Please select an activity.")
            return
        }

        if (!Report.behaviorId) {
            window.alert("Please select a behavior.")
            return
        }

        if (!Report.promptLevelId) {
            window.alert("Please select a prompt level.")
            return
        }

        if (!Report.consequenceId) {
            window.alert("Please select a consequence.")
            return
        }

        if (Report.note.length < 1 || Report.note.length > 500) {
            window.alert("Report must be from 1-2000 characters.")
            return
        }

        addReport(Report)
            .then(() => history.push('/report'));
    }

    return (
        <div className="d-flex justify-content-center test">
            <div className="background">
                <Form encType="multipart/form-data" className="recordForm">

                    <FormGroup>
                        <Label for='Date'>Select Date</Label>
                        <Input type='date' required name='Date' id='date' onChange={handleDateChange} />
                    </FormGroup>

                    <FormGroup>
                        <Label for='learnerId'>Learner</Label>
                        <Input type="select" onChange={handleLearnerSelection} required id="learnerId">
                            <option value="">Please select...</option>
                            {learners.map((learner) => <option key={learner.id} value={learner.id}>{learner.fullName}</option>)}
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for='learnerId'>Activity</Label>
                        <Input type="select" onChange={handleActivitySelection} required id="learnerId">
                            <option value="">Please select...</option>
                            {activities.map((activity) => <option key={activity.id} required value={activity.id}>{activity.activityName}</option>)}
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for='behaviorId' >Behavior</Label>
                        {
                            learnerSelect != "" ?
                                <Input type="select" onChange={handleBehaviorSelection} required id="behaviorId">
                                    <option value="">Please select...</option>
                                    {behaviors.map((behavior) => <option key={behavior.id} value={behavior.id}>{behavior.behaviorName}</option>)}
                                </Input>
                                : <div className="alert alert-secondary mt-1 search" role="alert">Please select a learner.</div>
                        }
                        <div class="noBehaviorWarning">
                            {!behaviors.length && learnerSelect != ""
                                ? <div>Please go back and add behaviors or select a different learner.</div>
                                : <div></div>
                            }
                        </div>
                    </FormGroup>

                    <FormGroup>
                        <Label for='promptLevelId'>Level of Prompting Needed</Label>
                        <Input type="select" onChange={handlePromptChange} id="promptLevelId">
                            <option value="">Please select...</option>
                            {promptLevels.map((promptLevel) => <option key={promptLevel.id} value={promptLevel.id}>{promptLevel.prompt}</option>)}
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for='consequenceId'>Conseqeuence</Label>
                        <Input type="select" onChange={handleConsequenceSelection} required id="behaviorId">
                            <option value="">Please select...</option>
                            {consequences.map((consequence) => <option key={consequence.id} value={consequence.id}>{consequence.consequenceName}</option>)}
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for="notes">Notes</Label>
                        <Input type='textarea' name='Note' id='note' maxlength="500" innerRef={note}
                            placeholder='note'></Input>
                    </FormGroup>

                    <div className='d-flex flex-row-reverse'>
                        <Button color="secondary" size='mb-1' onClick={handleSubmit}>Save Report</Button>
                    </div>

                </Form>
            </div>
        </div>
    )
}


export default ReportForm