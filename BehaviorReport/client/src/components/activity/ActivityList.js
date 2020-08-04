import React, { useContext, useEffect } from "react";
import { ListGroup, ListGroupItem } from "reactstrap"
import { ActivityContext } from "../../providers/ActivityProvider";
import Activity from "./Activity";


const ActivityList = () => {
    const { activities, getActivityByUserProfile } = useContext(ActivityContext);

    useEffect(() => {
        getActivityByUserProfile()
    }, []);

    return (
        <>


            <ListGroup>
                {
                    (activities.length)
                        ? activities.map((activity) => (
                            <ListGroupItem key={activity.id}>
                                <Activity activity={activity} />
                            </ListGroupItem>

                        ))
                        : <div className="alert alert-secondary mt-1" role="alert">Hmmm, looks like you may want to add some activities.</div>
                }
            </ListGroup>

        </>
    );
};

export default ActivityList;