import React, { useContext, useEffect } from "react";
import { ActivityContext } from "../../providers/ActivityProvider";
import Activity from "./Activity";


const ActivityList = () => {
    const { activities, getActivityByUserProfile } = useContext(ActivityContext);

    useEffect(() => {
        getActivityByUserProfile()
    }, []);

    return (
        <>


            <article className="activityListContainer">
                {
                    (activities.length)
                        ? activities.map((activity) => (
                            <div class="activity" key={activity.id}>
                                <Activity activity={activity} />
                            </div>

                        ))
                        : <div className="alert alert-secondary mt-1" role="alert">Hmmm, looks like you may want to add some activities.</div>
                }
            </article>

        </>
    );
};

export default ActivityList;