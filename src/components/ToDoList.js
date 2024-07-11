import React, { useState, useEffect } from 'react';

const ToDoList = () => {
  // state variable to store activities
  const [activities, setActivities] = useState([]);
  const [activityName, setActivityName] = useState('');
  const [currentActivity, setCurrentActivity] = useState(null);

  // function add new activity to the list
  const addActivity = () => {
    setActivities([
      ...activities,
      {
        name: activityName,
        duration: 0,
        status: 'Pending',
        startTime: null,
        endTime: null,
      },
    ]);
    // clear input field after adding
    setActivityName('');
  };
// function to remove activity from the list
  const removeActivity = (index) => {
    setActivities(activities.filter((_, i) => i !== index));
  };

  const startActivity = (index) => {
    if (currentActivity !== null) {
      pauseActivity(currentActivity);
    }
    const updatedActivities = activities.map((activity, i) => {
      if (i === index) {
        return {
          ...activity,
          status: 'Ongoing',
          startTime: Date.now(),
        };
      }
      return activity;
    });
    setActivities(updatedActivities);
    //Set the started activity as the current activity
    setCurrentActivity(index);
  };
// function to end activity
  const endActivity = (index) => {
    const updatedActivities = activities.map((activity, i) => {
      if (i === index) {
        return {
          ...activity,
          status: 'Completed',
          endTime: Date.now(),
        };
      }
      return activity;
    });
    setActivities(updatedActivities);
    // Clear the current activity
    setCurrentActivity(null);
  };

  // function to pause an activity
  const pauseActivity = (index) => {
    const updatedActivities = activities.map((activity, i) => {
      if (i === index) {
        const currentTime = Date.now();
        const duration = (currentTime - activity.startTime) / 1000 + activity.duration;
        return {
          ...activity,
          status: 'Pending',
          duration,
          startTime: null,
        };
      }
      return activity;
    });
    setActivities(updatedActivities);
    // Clear the current activity
    setCurrentActivity(null);
  };

  // function resume a paused activity
  const resumeActivity = (index) => {
    if (currentActivity !== null) {
      pauseActivity(currentActivity);
    }
    const updatedActivities = activities.map((activity, i) => {
      if (i === index) {
        return {
          ...activity,
          status: 'Ongoing',
          startTime: Date.now(),
        };
      }
      return activity;
    });
    setActivities(updatedActivities);
    setCurrentActivity(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentActivity !== null) {
        const updatedActivities = activities.map((activity, i) => {
          if (i === currentActivity) {
            const currentTime = Date.now();
            const duration = (currentTime - activity.startTime) / 1000 + activity.duration;
            return {
              ...activity,
              duration,
            };
          }
          return activity;
        });
        setActivities(updatedActivities);
      }
    }, 1000);
    // Clear interval on component 
    return () => clearInterval(interval);
  }, [currentActivity, activities]);

  const showDetails = (activity) => {
    const duration = new Date(activity.duration * 1000).toISOString().substr(11, 8);
    alert(`Details:\nStart: ${new Date(activity.startTime).toLocaleString()}\nEnd: ${new Date(activity.endTime).toLocaleString()}\nDuration: ${duration}`);
  };

  return (
    <div>
      <h2>To-Do List</h2>
      <input
        type="text"
        placeholder="Activity Name"
        value={activityName}
        onChange={(e) => setActivityName(e.target.value)}
      />
      <button onClick={addActivity}>Add Activity</button>
      <table>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Activity Name</th>
            <th>Activity Duration</th>
            <th>Actions</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{activity.name}</td>
              <td>{new Date(activity.duration * 1000).toISOString().substr(11, 8)}</td>
              <td>
                {activity.status === 'Pending' && (
                  <button onClick={() => startActivity(index)}>Start</button>
                )}
                {activity.status === 'Ongoing' && (
                  <>
                    <button onClick={() => pauseActivity(index)}>Pause</button>
                    <button onClick={() => endActivity(index)}>End</button>
                  </>
                )}
                {activity.status === 'Completed' && (
                  <button onClick={() => showDetails(activity)}>Show Details</button>
                )}
                {activity.status === 'Pending' && activity.duration > 0 && (
                  <button onClick={() => resumeActivity(index)}>Resume</button>
                )}
                {activity.status !== 'Completed' && (
                  <button onClick={() => removeActivity(index)}>Remove</button>
                )}
              </td>
              <td>{activity.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ToDoList;
