import React, { useContext } from "react";
import { Button, Form } from 'reactstrap';
import { ActivityContext } from "../../providers/ActivityProvider";

const ActivityDeleteModal = ({ toggle, activity }) => {

    const { getActivitiesByUser, deleteActivity } = useContext(ActivityContext);




    const submitForm = (e) => {
        e.preventDefault();
        deleteActivity(activity.id)
            .then(() => getActivitiesByUser())
            .then(toggle)
            .catch((err) => alert(`An error ocurred: ${err.message}`));
    };

    return (
        <>
            <Form onSubmit={submitForm}>
                <div className="lead mb-2">Are you sure you wish to delete this activity?</div>
                <div className="text-right">
                    <Button
                        type="button"
                        color="secondary"
                        onClick={toggle}
                    >Cancel</Button>
                    <Button
                        type="submit"
                        color="danger"
                        className="ml-2"
                    >Delete</Button>
                </div>
            </Form>
        </>
    )
}

export default ActivityDeleteModal;