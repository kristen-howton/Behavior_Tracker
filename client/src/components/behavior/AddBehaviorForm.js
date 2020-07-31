import React, { useContext, useRef } from "react";
import { Form } from "reactstrap";
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
                <button type="button" onClick={toggle} className="btn btn-secondary">Cancel</button>
                <button type="submit"
                    onClick={
                        evt => {
                            evt.preventDefault() // Prevent browser from submitting the form
                            addNewBehavior()
                        }
                    }
                    className="btn btn-pri ml-2">
                    Save
            </button>
            </fieldset>
        </Form>
    )
}