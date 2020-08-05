
import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalHeader, Card, CardBody, CardImg, CardTitle, CardText } from "reactstrap"
import ActivityEditModal from "./ActivityEditModal";
import ActivityDeleteModal from "./ActivityDeleteModal";
import { Link } from "react-router-dom";
import "./Activity.css";

const Activity = ({ activity }) => {

    const currentUserId = JSON.parse(sessionStorage.getItem("userProfile")).id
    const [editModal, setEditModal] = useState(false)
    const editModalToggle = () => setEditModal(!editModal)
    const [deleteModal, setDeleteModal] = useState(false)
    const deleteModalToggle = () => setDeleteModal(!deleteModal)

    return (
        <>
            <Card className="activityCard">
                <CardBody>
                    <CardTitle className="name">{activity.activityName}</CardTitle>
                    <CardImg src={activity.imageUrl} className="activityImage" />
                    <CardText>{activity.description}</CardText>
                </CardBody>

                {activity.userProfileId === currentUserId ? (
                    <div>
                        <Button color="primary" size="sm" className="ml-2" outline ><Link to={`/activityDetails/${activity.id}`}>Details</Link></Button>
                        <Button color="success" size="sm" className="ml-2" outline><Link to={`/reportForm/`} className="linkText">Record</Link></Button>
                        <Button color="info" size="sm" className="ml-2" outline onClick={() => { editModalToggle() }}>Edit</Button>
                        <Button color="danger" size="sm" className="ml-2" outline onClick={() => { deleteModalToggle() }}>Delete</Button>
                    </div>
                ) : ""}
            </Card>

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

