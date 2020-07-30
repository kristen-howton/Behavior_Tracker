
import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalHeader, Card, CardBody, Media } from "reactstrap"
import ActivityEditModal from "./ActivityEditModal";
import ActivityDeleteModal from "./ActivityDeleteModal";


const Activity = ({ activity }) => {

    const currentUserId = JSON.parse(sessionStorage.getItem("userProfile")).id
    const [editModal, setEditModal] = useState(false)
    const editModalToggle = () => setEditModal(!editModal)
    const [deleteModal, setDeleteModal] = useState(false)
    const deleteModalToggle = () => setDeleteModal(!deleteModal)

    return (
        <>
            <Card className="d-flex justify-content-between card">
                <CardBody className="name">{activity.activityName}</CardBody>
                <Media object src={activity.imageUrl} className="imageSize" />
                {activity.userProfileId === currentUserId ? (
                    <div>
                        <Button color="secondary" size="sm" className="ml-2" outline onClick={() => { editModalToggle() }}>Details</Button>
                        <Button color="success" size="sm" className="ml-2" outline onClick={() => { editModalToggle() }}>Record</Button >
                        <Button color="info" size="sm" className="ml-2" outline onClick={() => { editModalToggle() }}>Edit</Button>
                        <Button color="danger" size="sm" className="ml-2" outline onClick={() => { deleteModalToggle() }}>Delete</Button>
                    </div>
                ) : ""}
            </Card>

            <hr className="dotted" />

            {
                (activity.userProfileId === currentUserId) ? (
                    <>
                        <Modal isOpen={editModal} toggle={editModalToggle}>
                            <ModalHeader toggle={editModalToggle}>
                                Edit Activity
                </ModalHeader>
                            <ModalBody>
                                <ActivityEditModal toggle={editModalToggle} activity={activity} />
                            </ModalBody>
                        </Modal>

                        <Modal isOpen={deleteModal} toggle={deleteModalToggle}>
                            <ModalHeader toggle={deleteModalToggle}>
                                Delete Activity
                </ModalHeader>
                            <ModalBody>
                                <ActivityDeleteModal toggle={deleteModalToggle} activity={activity} />
                            </ModalBody>
                        </Modal>
                    </>) : (<></>)

            }
        </>

    );
};

export default Activity;

