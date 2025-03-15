import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

const Dashboard = () => {
  const { user } = useUserContext();
  const [scrumTeams, setScrumTeams] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedScrum, setSelectedScrum] = useState(null);
  const navigate = useNavigate();
  // Fetch Scrum Teams, Tasks, and Users

  useEffect(() => {
    fetch("http://localhost:3000/scrums")
      .then((res) => res.json())
      .then((data) => setScrumTeams(data))
      .catch((err) => console.error("Error fetching scrums:", err));

    fetch("http://localhost:3000/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));

    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // Handle Scrum Selection
  const handleGetDetails = (scrumId) => {
    if (!user) {
      // Redirect to login if user is not authenticated
      navigate("/login");
      return;
    }
    const selected = scrumTeams.find((team) => team.id === scrumId);
    setSelectedScrum(selected);
  };

  return (
    <div>
      <h1>Dashboard</h1>

      {/* Scrum Teams List */}
      <h2>Scrum Teams</h2>
      <ul >
        {scrumTeams.map((team) => (
          <li key={team.id} >
            {team.name}
            <button
              onClick={() => handleGetDetails(team.id)}>
              Get Details
            </button>
          </li>
        ))}
      </ul>

      {/* Scrum Details */}
      {selectedScrum && (
        <div >
          <h3 >Scrum Details for {selectedScrum.name} </h3>

          {/* Task List */}
          <h4 >Tasks</h4>
          <ul >
            {tasks
              .filter((task) => Number(task.scrumId) === Number(selectedScrum.id)) // Filter tasks by Scrum team
              .map((task) => {
                const assignedUser = users.find((user) => Number(user.id) === Number(task.assignedTo)); // Find assigned user

                return (
                  <li key={task.id} >
                    <strong>{task.title}</strong> {task.description} - <i>{task.status}</i>
                  </li>
                );
              })}
          </ul>

          {/* User List */}
          <div >
            <h4 >Users</h4>
            {tasks
              .filter((task) => Number(task.scrumId) === Number(selectedScrum.id)) // Filter tasks by Scrum team
              .map((task) => {
                const assignedUser = users.find((user) => Number(user.id) === Number(task.assignedTo)); // Find assigned user
                return (
                  assignedUser && (
                    <div key={task.id} >
                      <p><ul>
                        <li> {assignedUser.name} ({assignedUser.email})</li>
                      </ul>
                      </p>
                    </div>
                  )
                );
              })}
          </div>
        </div>
      )}
    </div>

  );
};

export default Dashboard;
