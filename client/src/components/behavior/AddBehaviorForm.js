import React, { useContext, useRef } from "react";
import { Form, Button } from "reactstrap";
import { useHistory } from 'react-router-dom';
import { BehaviorContext } from "../../providers/BehaviorProvider";

export const BehaviorForm = ({ toggle }) => {
    const { addBehavior, getBehaviorsByLearner } = useContext(BehaviorContext)


    const behaviorName = useRef("behaviorName")
    const history = useHistory();

    const addNewBehavior = () => {

        const Behavior = {
            behaviorName: behaviorName.current.value
        }

        if (!Behavior.behaviorName.length) {
            window.alert("Must add a behavior.")
            return
        }

        addBehavior(Behavior)
            .then(toggle)
            .then(getBehaviorsByLearner)
            .then(history.push('/behavior'));
    }

    return (
        <Form className="behaviorForm">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Behavior Name</label>
                    <input
                        type="text"
                        id="name"
                        ref={behaviorName}
                        required
                        autoFocus
                        className="form-control"
                        placeholder=""
                    />
                </div>
            </fieldset>

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