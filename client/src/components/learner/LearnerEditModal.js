import React, { useContext, useRef } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { LearnerContext } from "../../providers/LearnerProvider";

const LearnerEditModal = ({ toggleEdit, learner }) => {

    const { editLearner } = useContext(LearnerContext);

    const firstName = useRef("firstName")
    const lastName = useRef("lastName")

    const submitForm = (e) => {
        e.preventDefault();
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
                <Input type="text" name="firstName" id="firstName" innerRef={firstName} defaultValue={learner.firstName} />
            </FormGroup>

            <FormGroup>
                <Label for="activityName">Last Name</Label>
                <Input type="text" name="learnerLastName" id="learnerLastName" innerRef={lastName} defaultValue={learner.lastName} />
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