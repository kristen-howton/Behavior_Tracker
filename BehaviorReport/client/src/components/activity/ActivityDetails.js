import React, { useEffect, useContext, useState } from "react";
import { Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";
import { ActivityContext } from "../../providers/ActivityProvider";
import { useParams } from "react-router-dom";



const ActivityDetails = () => {
    const { getActivity } = useContext(ActivityContext);
    const [activity, setActivity] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        getActivity(id)
            .then(setActivity)
    }, []);

    return (
        <>
            <Card className="activityCard">
                <CardBody>
                    <CardTitle className="name">{activity?.activityName}</CardTitle>
                    <CardImg src={activity?.imageUrl} className="activityImage" />
                    <CardText>{activity?.description}</CardText>
                </CardBody>
            </Card>
        </>
    );
};

export default ActivityDetails;


