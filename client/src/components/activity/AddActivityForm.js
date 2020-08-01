import React, { useContext, useRef } from 'react'
import { Form, FormGroup, Input, Button, Label, InputGroup } from 'reactstrap'
import { useHistory } from "react-router-dom";
import { ActivityContext } from '../../providers/ActivityProvider';


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

        if (!Activity.activityName.length) {
            window.alert("Must add an activity.")
            return
        }

        if (!Activity.imageUrl.length) {
            window.alert("Must add an image.")
            return
        }

        if (!Activity.description.length) {
            window.alert("Must add a description.")
            return
        }

        addActivity(Activity)
            .then(getActivityByUserProfile)
            .then(() => history.push('/'));
    }
    return (
        <div className="d-flex justify-content-center">
            <div className="smallContainer border rounded p-4">
                <Form encType="multipart/form-data">
                    <h4>Add an Activity</h4>
                    <hr />
                    <FormGroup>
                        <Label for="activityName">Activity</Label>
                        <Input type='text' name='Title' id='activityName' innerRef={activityName}
                            placeholder='Activity' className='form-control'></Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for="imageUpload">Activity Image</Label>
                        <InputGroup className="mt-2">
                            <Input type='text' name='imageUrl' id='imageUrl' innerRef={imageUrl} placeholder="http://ImageUrl" />
                        </InputGroup>
                    </FormGroup>

                    <FormGroup>
                        <Label for="activityDescription">Description</Label>
                        <Input type='text-area' name='Description' id='activityDescription' innerRef={description}
                            placeholder='Activity' className='form-control'></Input>
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