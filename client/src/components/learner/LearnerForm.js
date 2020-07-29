import React, { useContext, useRef, useState } from "react"
import { Form } from "reactstrap"
import { useHistory } from 'react-router-dom'
import { LearnerContext } from "../../providers/LearnerProvider"

export const LearnerForm = ({ toggle }) => {
    const { addLearner } = useContext(LearnerContext)
    const firstName = useRef("firstName")
    const lastName = useRef("lastName")
    const history = useHistory();

    const addNewLearner = () => {

        const Learner = {
            firstName: firstName.current.value,
            lastName: lastName.current.value
        }

        addLearner(Learner)
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
                <button type="button" onClick={toggle} className="btn btn-secondary">Cancel</button>
                <button type="submit"
                    onClick={
                        evt => {
                            evt.preventDefault() // Prevent browser from submitting the form
                            addNewLearner()
                        }
                    }
                    className="btn btn-secondary ml-2">
                    Save
            </button>
            </fieldset>
        </Form>
    )
}