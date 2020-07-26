import React, { useContext, useRef } from 'react'
import { Form, FormGroup, Input, Button, Label, InputGroup } from 'reactstrap'
import { useHistory } from "react-router-dom";
import { ActivityContext } from '../../providers/ActivityProvider';
import { UserProfileContext } from '../../providers/UserProfileProvider';


const AddActivityForm = () => {
    const { addActivity } = useContext(ActivityContext)
    const { getUserProfile } = useContext(UserProfileContext)

    const history = useHistory();

    const activityName = useRef()
    const imageUrl = useRef()

    const handleSubmit = (event) => {
        getUserProfile().then(user => {
            const Activity = {
                activityName: activityName.current.value,
                imageUrl: imageUrl.current.value,
                isDeleted: false,
                userProfileId: user.id
            }


            addActivity(Activity)
                .then(history.push('/activity'));
        })
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
                            <Input type='text' name='imageUrl' id='imageUrl' innerRef={imageUrl} placeholder="http://myImageUrl" />
                        </InputGroup>
                    </FormGroup>

                    <div className='d-flex flex-row-reverse'>
                        <Button color="primary" size='mb-1' onClick={handleSubmit}>Save Activity</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}


export default AddActivityForm