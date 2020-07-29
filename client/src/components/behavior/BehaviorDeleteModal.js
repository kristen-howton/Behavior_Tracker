import React, { useContext } from "react";
import { Button, Form } from 'reactstrap';
import { BehaviorContext } from "../../providers/BehaviorProvider";

const BehaviorDeleteModal = ({ toggleDelete, behavior }) => {

    const { deleteBehavior } = useContext(BehaviorContext);

    const submitForm = (e) => {
        e.preventDefault();
        deleteBehavior(behavior.id)
            .then(toggleDelete)
            .catch((err) => alert(`An error ocurred: ${err.message}`));
    };

    return (
        <>
            <Form onSubmit={submitForm}>
                <div className="lead mb-2">Are you sure you wish to delete this behavior?</div>
                <div className="text-right">
                    <Button
                        type="button"
                        color="secondary"
                        onClick={toggleDelete}
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

export default BehaviorDeleteModal;