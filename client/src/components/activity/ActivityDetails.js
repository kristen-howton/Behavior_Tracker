import React, { useEffect, useContext, useState } from "react";
import { Card, Media } from "reactstrap";
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
            <Card className="activity">
                <h3>{activity?.activityName}</h3>
                <Media object src={activity?.imageUrl} />
                <div>{activity?.description}</div>
            </Card>
        </>
    );
};

export default ActivityDetails;