import React, { useContext, useRef, useEffect, useState } from "react";
import { Form, Button, FormGroup, Input, Label } from "reactstrap";
import { useHistory } from 'react-router-dom';
import { BehaviorContext } from "../../providers/BehaviorProvider";
import { LearnerContext } from "../../providers/LearnerProvider";
import "./Behavior"
import "./Behavior.css"

export const BehaviorForm = ({ toggle }) => {
    const { addBehavior, getAllBehaviors } = useContext(BehaviorContext)
    const [learnerSelect, setLearnerSelection] = useState("");
    const [behaviorNameInvalid, setBehaviorNameInvalid] = useState(false);
    const [learnerIdInvalid, setLearnerIdInvalid] = useState(false);
    const { learners, getLeanersByUserProfile } = useContext(LearnerContext)


    const behaviorName = useRef()
    const history = useHistory();

    useEffect(() => {
        getLeanersByUserProfile()
    }, [])


    useEffect(() => {
        setLearnerIdInvalid(false)
    }, [learnerSelect])

    const handleLearnerSelection = (e) => {
        setLearnerSelection(e.target.value)
    }

    const addNewBehavior = () => {
        setBehaviorNameInvalid(false)


        const Behavior = {
            behaviorName: behaviorName.current.value,
            learnerId: +learnerSelect
        }

        if (!Behavior.learnerId) {
            setLearnerIdInvalid(true)
            return
        }

        if (Behavior.behaviorName.length < 1 || Behavior.behaviorName.length > 50) {
            setBehaviorNameInvalid(true)
            return
        }

        if (learnerIdInvalid || behaviorNameInvalid) {

        }

        addBehavior(Behavior)
            .then(toggle)
            .then(getAllBehaviors)
            .then(history.push('/behavior'));
    }

    return (

        <Form className="behaviorForm">

            <FormGroup>
                <Label for='learnerId'>Learner</Label>
                <Input
                    type="select"
                    onChange={handleLearnerSelection}
                    required id="learnerId"
                    invalid={learnerIdInvalid}>
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
                    invalid={behaviorNameInvalid}
                    className="form-control"
                    placeholder=""
                />
                {behaviorNameInvalid ? <div className="behaviorInvalid">Behavior name must be 1-50 characters</div> : <div></div>}
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