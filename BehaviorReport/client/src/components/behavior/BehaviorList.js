import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ListGroup } from 'reactstrap';
import { BehaviorContext } from '../../providers/BehaviorProvider';
import Behavior from './Behavior';
import { BehaviorForm } from './AddBehaviorForm'
import { LearnerContext } from '../../providers/LearnerProvider';


const BehaviorList = () => {
    const { behaviors, getAllBehaviors } = useContext(BehaviorContext);
    const { getLearnersByUserProfile } = useContext(LearnerContext);

    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    const renderListItem = (behavior) => {
        if (behavior.id > 0) {
            return (
                <Behavior key={"behavior-" + behavior.id} behavior={behavior} />
            )
        }
    }

    useEffect(() => {
        getLearnersByUserProfile()
    }, []);

    useEffect(() => {
        getAllBehaviors()
    }, []);

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div id="learnerList" className="cards-column">
                        <Button color="secondary" onClick={toggle} className="mb-4">Add Behavior</Button>
                        <ListGroup>
                            {
                                (behaviors.length)
                                    ? behaviors.map((behavior) => (
                                        renderListItem(behavior)
                                    ))
                                    : <div className="alert alert-secondary mt-1" role="alert">There were no behaviors found.</div>
                            }
                        </ListGroup>
                    </div>
                </div>
            </div>
            <Modal isOpen={modal} toggle={toggle} className="modal-md">
                <ModalHeader toggle={toggle} className="add">Add New Behavior</ModalHeader>
                <ModalBody>
                    <BehaviorForm toggle={toggle} />
                </ModalBody>
            </Modal>
        </>
    );
}

export default BehaviorList