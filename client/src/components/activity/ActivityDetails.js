import React from "react";
import { Media, Card } from "reactstrap";

export const ActivityDetails = (activity) => (
    <Card className="activity">
        <h3>{activity.activityName}</h3>
        <Media object src={activity.activityUrl} />
    </Card>
)


