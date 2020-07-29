import React, { useState } from "react"
import { Modal, Button, ModalHeader, ModalBody, ListGroupItem } from 'reactstrap'
import BehaviorEditModal from "./BehaviorEditModal";
import BehaviorDeleteModal from "./BehaviorDeleteModal";

const Behavior = ({ behavior }) => {
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    const [editModal, setEditModal] = useState(false)
    const toggleEdit = () => setEditModal(!editModal)
    return (
        <>
            <ListGroupItem key={behavior.id} className="d-flex justify-content-between">
                {behavior.behaviorName}
                <div className="d-flex justify-content-end">
                    <Button color="info" outline size="sm" className="ml-2" onClick={toggleEdit}>Edit</Button>
                    <Button color="danger" outline size="sm" className="ml-2" onClick={toggle}>Delete</Button>
                </div>
            </ListGroupItem>

            <Modal isOpen={modal} toggle={toggle} size="md">
                <ModalHeader toggle={toggle}>Delete behavior</ModalHeader>
                <ModalBody>
                    <BehaviorDeleteModal behavior={behavior} toggleDelete={toggle} />
                </ModalBody>
            </Modal>

            <Modal isOpen={editModal} toggle={toggleEdit} className="modal-md">
                <ModalHeader toggle={toggleEdit}>Edit Behavior</ModalHeader>
                <ModalBody>
                    <BehaviorEditModal behavior={behavior} toggleEdit={toggleEdit} />
                </ModalBody>
            </Modal>
        </>
    );
};

export default Behavior;