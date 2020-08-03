import React, { useState } from "react"
import { Modal, Button, ModalHeader, ModalBody, ListGroupItem } from 'reactstrap'
import LearnerEditModal from "./LearnerEditModal";
import LearnerDeleteModal from "./LearnerDeleteModal";

const Learner = ({ learner }) => {
    const [deleteModal, setDeleteModal] = useState(false)
    const toggleDelete = () => setDeleteModal(!deleteModal)

    const [editModal, setEditModal] = useState(false)
    const toggleEdit = () => setEditModal(!editModal)
    return (
        <>
            <ListGroupItem key={learner.id} className="d-flex justify-content-between">
                {learner.fullName}
                <div className="d-flex justify-content-end">
                    <Button color="info" outline size="sm" className="ml-2" onClick={toggleEdit}>Edit</Button>
                    <Button color="danger" outline size="sm" className="ml-2" onClick={toggleDelete}>Delete</Button>
                </div>
            </ListGroupItem>

            <Modal isOpen={deleteModal} size="md">
                <ModalHeader>Remove Learner</ModalHeader>
                <ModalBody>
                    <LearnerDeleteModal learner={learner} toggleDelete={toggleDelete} />
                </ModalBody>
            </Modal>

            <Modal isOpen={editModal} className="modal-md">
                <ModalHeader>Edit Learner Information</ModalHeader>
                <ModalBody>
                    <LearnerEditModal learner={learner} toggleEdit={toggleEdit} />
                </ModalBody>
            </Modal>
        </>
    );
};

export default Learner;