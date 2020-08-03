import React, { useContext, useRef } from 'react'
import { Form, FormGroup, Input, Button, Label, InputGroup } from 'reactstrap'
import { useHistory } from "react-router-dom";
import { ActivityContext } from '../../providers/ActivityProvider';
import "./Activity.css";

const AddActivityForm = () => {
    const { addActivity, getActivityByUserProfile } = useContext(ActivityContext)

    const history = useHistory();

    const activityName = useRef()
    const imageUrl = useRef()
    const description = useRef()

    const handleSubmit = (event) => {


        const Activity = {
            activityName: activityName.current.value,
            imageUrl: imageUrl.current.value,
            description: description.current.value,
            isDeleted: false
        }

        if (Activity.activityName.length < 1 || Activity.activityName.length > 50) {
            window.alert("Activity must be between 1-50 characters.")
            return
        }

        if (Activity.imageUrl.length < 2000 || Activity.imageURl.length > 2000) {
            window.alert("Opps, URL must be between 1-2000 characters")
            return
        }

        if (Activity.description.length < 2000 || Activity.description.length > 2000) {
            window.alert("Description must be between 1-50 characters.")
            return
        }

        addActivity(Activity)
            .then(getActivityByUserProfile)
            .then(() => history.push('/'));
    }
    return (
        <div className="d-flex justify-content-center activityForm">
            <div className="smallContainer border rounded p-4">
                <Form className="activity">
                    <h4>Add an Activity</h4>
                    <hr />
                    <FormGroup>
                        <Label for="activityName" >Activity</Label>
                        <Input type='text' name='Title' id='activityName' innerRef={activityName}
                            placeholder='Activity' maxlength="50"></Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for="imageUpload">Activity Image</Label>
                        <InputGroup>
                            <Input type='text' name='imageUrl' id='imageUrl' maxlength="2000" innerRef={imageUrl} placeholder="http://ImageUrl" />
                        </InputGroup>
                    </FormGroup>

                    <FormGroup>
                        <Label for="activityDescription">Description</Label>
                        <Input type='text-area' name='Description' id='activityDescription' maxlength="50" innerRef={description}
                            placeholder='Activity'></Input>
                    </FormGroup>

                    <div className='d-flex flex-row-reverse'>
                        <Button color="secondary" size='mb-1' onClick={handleSubmit}>Save Activity</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}


export default AddActivityForm