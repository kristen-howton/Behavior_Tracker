import React, { useContext, useRef } from "react";
import { Form, FormGroup, Label, Input, Button, InputGroup } from "reactstrap";
import { ActivityContext } from "../../providers/ActivityProvider";

const ActivityEditModal = ({ toggle, activity }) => {

    const { editActivity } = useContext(ActivityContext);

    const activityName = useRef();
    const imageUrl = useRef();
    const description = useRef();

    const submitForm = (e) => {
        e.preventDefault();
        editActivity(
            activity.id,
            {
                userProfileId: activity.userProfileId,
                id: activity.id,
                activityName: activityName.current.value,
                imageUrl: imageUrl.current.value,
                description: description.current.value,
                isDeleted: false

            })
            .then(toggle)
            .catch((err) => alert(`An error ocurred: ${err.message}`));
    };

    return (
        <Form onSubmit={submitForm}>
            <FormGroup>
                <Label for="activityName">Activity Name</Label>
                <Input type="text" name="activityName" id="activityName" innerRef={activityName} defaultValue={activity.activityName} />
            </FormGroup>

            <FormGroup>
                <Label for="imageUpload">Activity Image</Label>
                <InputGroup className="mt-2">
                    <Input type='text' name='activityUrl' id='activityUrl' innerRef={imageUrl} defaultValue={activity.imageUrl} />
                </InputGroup>
            </FormGroup>

            <FormGroup>
                <Label for="activityDescription">Description</Label>
                <Input type="text-area" name="activityName" id="activityName" innerRef={description} defaultValue={activity.description} />
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
        </Form>
    )

}

export default ActivityEditModal;