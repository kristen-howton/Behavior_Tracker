import React, { useState } from "react"
import { Modal, Button, ModalHeader, ModalBody, ListGroupItem } from 'reactstrap'

const Learner = ({ learner }) => {
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    const [editModal, setEditModal] = useState(false)
    const toggleEdit = () => setEditModal(!editModal)
    return (
        <>
            <ListGroupItem key={learner.id} className="d-flex justify-content-between">
                {learner.firstName}
                <div className="d-flex justify-content-end">
                    <Button color="info" outline size="sm" className="ml-2" onClick={toggleEdit}>Edit</Button>
                    <Button color="danger" outline size="sm" className="ml-2" onClick={toggle}>Delete</Button>
                </div>
            </ListGroupItem>

            <Modal isOpen={modal} toggle={toggle} size="md">
                <ModalHeader toggle={toggle}>Remove Learner</ModalHeader>
                <ModalBody>
                    <DeleteLearner learner={learner} toggleDelete={toggle} />
                </ModalBody>
            </Modal>

            <Modal isOpen={editModal} toggle={toggleEdit} className="modal-md">
                <ModalHeader toggle={toggleEdit}>Edit Learner Information</ModalHeader>
                <ModalBody>
                    <EditLearner selectedLearner={learner} toggleEdit={toggleEdit} />
                </ModalBody>
            </Modal>
        </>
    );
};

export default Learner;