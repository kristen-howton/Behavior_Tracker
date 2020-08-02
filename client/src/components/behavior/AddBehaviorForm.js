import React, { useContext, useRef, useEffect, useState } from "react";
import { Form, Button, FormGroup, Input, Label } from "reactstrap";
import { useHistory } from 'react-router-dom';
import { BehaviorContext } from "../../providers/BehaviorProvider";
import { LearnerContext } from "../../providers/LearnerProvider";

export const BehaviorForm = ({ toggle }) => {
    const { addBehavior, getBehaviorsByLearner } = useContext(BehaviorContext)
    const [learnerSelect, setLearnerSelection] = useState("");
    const { learners, getLeanersByUserProfile } = useContext(LearnerContext)


    const behaviorName = useRef("behaviorName")
    const history = useHistory();

    useEffect(() => {
        getLeanersByUserProfile()
    }, [])

    const handleLearnerSelection = (e) => {
        setLearnerSelection(e.target.value)
    }

    const addNewBehavior = () => {

        const Behavior = {
            behaviorName: behaviorName.current.value,
            learnerId: +learnerSelect
        }

        if (!Behavior.behaviorName?.length) {
            window.alert("Must add a behavior.")
            return
        }

        if (!Behavior.learnerId) {
            window.alert("Please select a learner.")
            return
        }

        addBehavior(Behavior)
            .then(toggle)
            .then(getBehaviorsByLearner)
            .then(history.push('/behavior'));
    }

    return (

        <Form className="behaviorForm">

            <FormGroup>
                <Label for='learnerId'>Learner</Label>
                <Input type="select" onChange={handleLearnerSelection} required id="learnerId">
                    <option value="">Please select...</option>
                    {learners.map((learner) => <option key={learner.id} value={learner.id}>{learner.fullName}</option>)}
                </Input>
            </FormGroup>


            <FormGroup>
                <label htmlFor="name">Behavior Name</label>
                <Input
                    type="text"
                    id="name"
                    innerRef={behaviorName}
                    required
                    autoFocus
                    className="form-control"
                    placeholder=""
                />
            </FormGroup>


            <fieldset className="text-right">
                <Button type="button" onClick={toggle} color="secondary">Cancel</Button>
                <Button type="submit"
                    onClick={
                        evt => {
                            evt.preventDefault() // Prevent browser from submitting the form
                            addNewBehavior()
                        }
                    }
                    color="primary">
                    Save
            </Button>
            </fieldset>
        </Form>
    )
}