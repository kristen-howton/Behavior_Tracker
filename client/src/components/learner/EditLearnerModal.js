import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ListGroup } from 'reactstrap';
import { LearnerContext } from '../../providers/LearnerProvider';

const LearnerList = () => {
    const { learners, getAllLearners } = useContext(LearnerContext);

    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    const renderListItem = (learner) => {
        if (learner.id > 0) {
            return (
                <Learner key={"learner-" + learner.id} learner={learner} />
            )
        }
    }

    useEffect(() => {
        getAllLearners()
    }, []);
    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div id="tagList" className="cards-column">
                        <Button color="primary" onClick={toggle} className="mb-4">Add New Learner</Button>
                        <ListGroup>
                            {
                                (learners.length)
                                    ? learners.map((learner) => (
                                        renderListItem(learner)
                                    ))
                                    : <div className="alert alert-secondary mt-1" role="alert">There were no learners found.</div>
                            }
                        </ListGroup>
                    </div>
                </div>
            </div>
            <Modal isOpen={modal} toggle={toggle} className="modal-md">
                <ModalHeader toggle={toggle}>Add new Learner</ModalHeader>
                <ModalBody>
                    <LearnerForm toggle={toggle} />
                </ModalBody>
            </Modal>
        </>
    );
}

export default LearnerList