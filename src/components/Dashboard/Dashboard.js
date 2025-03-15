import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ isLoggedIn }) => {
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
    if (!localStorage.getItem("user")) {
      // Redirect to login if the user is not logged in
      navigate("/login");
      return;
    }
    const selected = scrumTeams.find((team) => team.id === scrumId);
    setSelectedScrum(selected);
  };

  return (
    <div className="p-4">
  <h1 className="text-2xl font-bold">Dashboard</h1>

  {/* Scrum Teams List */}
  <h2 className="text-xl font-bold mt-4">Scrum Teams</h2>
  <ul className="mt-4">
    {scrumTeams.map((team) => (
      <li key={team.id} className="flex justify-between border p-2 mt-2">
        {team.name}
        <button
          onClick={() => handleGetDetails(team.id)}
          className="bg-blue-500 text-white px-2 py-1 rounded"
        >
          Get Details
        </button>
      </li>
    ))}
  </ul>

  {/* Scrum Details */}
  {selectedScrum && (
    <div className="mt-4 p-4 border rounded bg-gray-100">
      <h3 className="text-lg font-bold">{selectedScrum.name} Details</h3>

      {/* Task List */}
      <h4 className="font-semibold mt-2">Tasks</h4>
      <ul className="list-disc ml-5">
        {tasks
          .filter((task) => Number(task.scrumId) === Number(selectedScrum.id)) // Filter tasks by Scrum team
          .map((task) => {
            const assignedUser = users.find((user) => Number(user.id) === Number(task.assignedTo)); // Find assigned user

            return (
              <li key={task.id} className="mt-2 p-2 border bg-white">
                <strong>{task.title}</strong> {task.description} - <i>{task.status}</i>
              </li>
            );
          })}
      </ul>

      {/* User List */}
      <div className="mt-4 p-4 border-t bg-gray-200">
        <h4 className="font-semibold">Users</h4>
        {tasks
          .filter((task) => Number(task.scrumId) === Number(selectedScrum.id)) // Filter tasks by Scrum team
          .map((task) => {
            const assignedUser = users.find((user) => Number(user.id) === Number(task.assignedTo)); // Find assigned user
            return (
              assignedUser && (
                <div key={task.id} className="mt-2 p-2 border bg-white">
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
