import React, { useContext } from "react";
import { Button, Form } from 'reactstrap';
import { LearnerContext } from "../../providers/LearnerProvider";

const LearnerDeleteModal = ({ toggle, learner }) => {

    const { deleteLearner } = useContext(LearnerContext);

    const submitForm = (e) => {
        e.preventDefault();
        deleteLearner(learner.id)
            .then(toggle)
            .catch((err) => alert(`An error ocurred: ${err.message}`));
    };

    return (
        <>
            <Form onSubmit={submitForm}>
                <div className="lead mb-2">Are you sure you wish to delete this learner?</div>
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

export default LearnerDeleteModal;