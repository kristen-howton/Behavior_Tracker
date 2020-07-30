import React, { useContext, useRef } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { BehaviorContext } from "../../providers/BehaviorProvider";

const BehaviorEditModal = ({ toggleEdit, behavior }) => {

    const { editBehavior } = useContext(BehaviorContext);

    const behaviorName = useRef()

    const submitForm = (e) => {
        e.preventDefault();
        editBehavior(
            behavior.id,
            {
                id: behavior.id,
                learnerId: behavior.learnerId,
                isDeleted: false,
                behaviorName: behaviorName.current.value

            })
            .then(toggleEdit)
            .catch((err) => alert(`An error ocurred: ${err.message}`));
    };

    return (
        <Form onSubmit={submitForm}>
            <FormGroup>
                <Label for="behaviorName">Behavior</Label>
                <Input type="text" name="behaviorName" id="behaviorName" innerRef={behaviorName} defaultValue={behavior.behaviorName} />
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

export default BehaviorEditModal;