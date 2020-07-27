import React, { useContext, useRef } from "react";
import { Form, FormGroup, Label, Input, Button, InputGroup } from "reactstrap"
import { useParams } from "react-router-dom";
import { ActivityContext } from "../../providers/ActivityProvider";

const ActivityEditModal = ({ toggle, activity }) => {

    const { getActivityByUserProfile, editActivity } = useContext(ActivityContext);

    const activityName = useRef();
    const activityUrl = useRef();
    const { id } = useParams();

    const submitForm = (e) => {
        e.preventDefault();
        editActivity(
            activity.id,
            {

                id: activity.id,
                activityName: activityName.current.value,
                activityUrl: activityUrl.current.value,
                isDeleted: false

            })
            .then(() => getActivityByUserProfile(id))
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
                    <Input type='text' name='activityUrl' id='activityUrl' innerRef={activityUrl} placeholder="http://myImageUrl" />
                </InputGroup>
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