import React, { useContext, useRef } from "react"
import { Form, Button } from "reactstrap"
import { useHistory } from 'react-router-dom'
import { LearnerContext } from "../../providers/LearnerProvider"

export const LearnerForm = ({ toggle }) => {
    const { addLearner, getLeanersByUserProfile } = useContext(LearnerContext)
    const firstName = useRef("firstName")
    const lastName = useRef("lastName")
    const history = useHistory();

    const addNewLearner = () => {

        const Learner = {
            firstName: firstName.current.value,
            lastName: lastName.current.value
        }

        if (!Learner.firstName.length) {
            window.alert("Must add a first name for a learner.")
            return
        }

        if (!Learner.lastName.length) {
            window.alert("Must add a last name for a learner.")
            return
        }

        addLearner(Learner)
            .then(toggle)
            .then(getLeanersByUserProfile)
            .then(history.push('/learner'));
    }

    return (
        <Form className="learnerForm">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">First Name</label>
                    <input
                        type="text"
                        id="name"
                        ref={firstName}
                        required
                        autoFocus
                        className="form-control"
                        placeholder=""
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Last Name</label>
                    <input
                        type="text"
                        id="name"
                        ref={lastName}
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
                            addNewLearner()
                        }
                    }
                    color="primary">
                    Save
            </Button>
            </fieldset>
        </Form>
    )
}