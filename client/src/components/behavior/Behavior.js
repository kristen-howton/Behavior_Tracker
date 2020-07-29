import React, { useState } from "react";
import { Modal, Button, ModalHeader, ModalBody, ListGroupItem } from 'reactstrap';
import BehaviorEditModal from "./BehaviorEditModal";
import BehaviorDeleteModal from "./BehaviorDeleteModal";

const Behavior = ({ behavior }) => {
    const [deleteModal, setDeleteModal] = useState(false)
    const toggleDelete = () => setDeleteModal(!deleteModal)

    const [editModal, setEditModal] = useState(false)
    const toggleEdit = () => setEditModal(!editModal)
    return (
        <>
            <ListGroupItem key={behavior.id} className="d-flex justify-content-between">
                {behavior.behaviorName}
                <div className="d-flex justify-content-end">
                    <Button color="info" outline size="sm" className="ml-2" onClick={toggleEdit}>Edit</Button>
                    <Button color="danger" outline size="sm" className="ml-2" onClick={toggleDelete}>Delete</Button>
                </div>
            </ListGroupItem>

            <Modal isOpen={deleteModal} toggleDelete={toggleDelete} size="md">
                <ModalHeader toggleDelete={toggleDelete}>Delete behavior</ModalHeader>
                <ModalBody>
                    <BehaviorDeleteModal behavior={behavior} toggleDelete={toggleDelete} />
                </ModalBody>
            </Modal>

            <Modal isOpen={editModal} toggleEdit={toggleEdit} className="modal-md">
                <ModalHeader toggleEdit={toggleEdit}>Edit Behavior</ModalHeader>
                <ModalBody>
                    <BehaviorEditModal behavior={behavior} toggleEdit={toggleEdit} />
                </ModalBody>
            </Modal>
        </>
    );
};

export default Behavior;