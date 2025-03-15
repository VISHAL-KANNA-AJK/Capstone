import { useEffect, useState } from 'react';

const UserProfile = () => {
    const user = JSON.parse(localStorage.getItem("user"));
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:3000/tasks?assignedTo=${user.id}`)
        .then((res) => res.json())
        .then((data) => setTasks(data))
        .catch((error) => console.error("Error fetching tasks:", error));
    }
  }, [user]);

  if (!user) return <p>Please log in.</p>;
    return (
        <div className="max-w-4xl mx-auto mt-10 p-5 border rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Tasks Worked By {user.name}</h2>

      <ul className="space-y-3">
        {tasks.map((task) => (
          <li key={task.id} className="border p-2 rounded">
            <p><strong>Title:</strong> {task.title}</p>
            <p><strong>Description:</strong> {task.description}</p>
            <p><strong>Status:</strong> {task.status}</p>
          </li>
        ))}
      </ul>
    </div> 
    );
};

export default UserProfile;
