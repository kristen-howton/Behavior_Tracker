import React, { useContext, useRef } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { LearnerContext } from "../../providers/LearnerProvider";

const LearnerEditModal = ({ toggleEdit, learner }) => {

    const { editLearner } = useContext(LearnerContext);

    const firstName = useRef()
    const lastName = useRef()

    const submitForm = (e) => {
        e.preventDefault();

        if (firstName.current.value.length < 1 || firstName.current.value.length > 50) {
            window.alert("First name must be 1 to 50 characters.")
            return
        }

        if (lastName.current.value.length < 1 || lastName.current.value.length > 50) {
            window.alert("Last name must be 1 to 50 characters.")
            return
        }

        editLearner(
            learner.id,
            {
                userProfileId: learner.userProfileId,
                id: learner.id,
                firstName: firstName.current.value,
                lastName: lastName.current.value

            })
            .then(toggleEdit)
            .catch((err) => alert(`An error ocurred: ${err.message}`));
    };

    return (
        <Form onSubmit={submitForm}>
            <FormGroup>
                <Label for="firstName">First Name</Label>
                <Input type="text" name="firstName" id="firstName" innerRef={firstName} defaultValue={learner.firstName} maxlength="50" />
            </FormGroup>

            <FormGroup>
                <Label for="activityName">Last Name</Label>
                <Input type="text" name="learnerLastName" id="learnerLastName" innerRef={lastName} defaultValue={learner.lastName} maxlength="50" />
            </FormGroup>

            <FormGroup className="text-right">
                <Button
                    type="button"
                    color="secondary"
                    onClick={toggleEdit}
                >Cancel</Button>
                <Button
                    type="submit"
                    color="primary"
                    className="ml-2"
                >Save</Button>
            </FormGroup>
        </Form >
    )

}

export default LearnerEditModal;