import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ListGroup } from 'reactstrap';
import { LearnerContext } from '../../providers/LearnerProvider';
import { LearnerForm } from './LearnerForm';
import Learner from './Learner';
import "./Learner.css";

const LearnerList = () => {
    const { learners, getLearnersByUserProfile } = useContext(LearnerContext);

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
        getLearnersByUserProfile()
    }, []);

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div id="learnerList" className="cards-column">
                        <Button color="secondary" onClick={toggle} className="mb-4">Add Learner</Button>
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
                <ModalHeader toggle={toggle} className="add">Create New Learner</ModalHeader>
                <ModalBody>
                    <LearnerForm toggle={toggle} />
                </ModalBody>
            </Modal>
        </>
    );
}

export default LearnerList