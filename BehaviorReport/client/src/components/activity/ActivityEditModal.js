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

        if (activityName.current.value.length < 1 || activityName.current.value.length > 50) {
            window.alert("Activities must be 1 to 50 characters.")
            return
        }

        if (imageUrl.current.value.length < 1 || imageUrl.current.value.length > 2000) {
            window.alert("Image urls must be 1 to 2000 characters.")
            return
        }

        if (description.current.value.length < 1 || description.current.value.length > 2000) {
            window.alert("Descriptions must be 1 to 2000 characters.")
            return
        }

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
                <Label for="activityName">Activity</Label>
                <Input type="text" name="activityName" id="activityName" maxlength="50" innerRef={activityName} defaultValue={activity.activityName} />
            </FormGroup>

            <FormGroup>
                <Label for="imageUpload">Activity Image</Label>
                <InputGroup className="mt-2">
                    <Input type='text' name='activityUrl' id='activityUrl' maxlength="2000" innerRef={imageUrl} defaultValue={activity.imageUrl} />
                </InputGroup>
            </FormGroup>

            <FormGroup>
                <Label for="activityDescription">Description</Label>
                <Input type="textarea" name="activityName" id="activityName" maxlength="2000" innerRef={description} defaultValue={activity.description} />
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