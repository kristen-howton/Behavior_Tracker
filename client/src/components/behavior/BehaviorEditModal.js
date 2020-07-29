import React, { useContext, useRef } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { BehaviorContext } from "../../providers/BehaviorProvider";

const BehaviorEditModal = ({ toggle, behavior }) => {

    const { editBehavior } = useContext(BehaviorContext);

    const behaviorName = useRef("behaviorName")

    const submitForm = (e) => {
        e.preventDefault();
        editBehavior(
            behavior.id,
            {
                learnerId: behavior.learnerId,
                id: behavior.id,
                isDeleted: false,
                behaviorName: behavior.behaviorName

            })
            .then(toggle)
            .catch((err) => alert(`An error ocurred: ${err.message}`));
    };

    return (
        <Form onSubmit={submitForm}>
            <FormGroup>
                <Label for="firstName">Behavior</Label>
                <Input type="text" name="behaviorName" id="behaviorName" innerRef={behaviorName} defaultValue={behavior.behaviorName} />
            </FormGroup>



            <FormGroup className="text-right">
                <Button
                    type="button"
                    color="secondary"
                    onClick={toggle}
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