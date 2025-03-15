import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

const ScrumDetails = () => {
    const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [scrumName, setScrumName] = useState("");

  useEffect(() => {
    // Fetch Scrum Team Name
    fetch(`http://localhost:3000/scrums/${id}`)
      .then((res) => res.json())
      .then((data) => setScrumName(data.name))
      .catch((error) => console.error("Error fetching scrum details:", error));

    // Fetch Tasks for the Scrum Team
    fetch(`http://localhost:3000/tasks?scrumId=${id}`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, [id]);

  if (!scrumName) return <p>Loading...</p>;

    return (
        <div className="max-w-4xl mx-auto mt-10 p-5 border rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Scrum Details for {scrumName}</h2>

      <h3 className="text-lg font-semibold">Tasks</h3>
      <ul className="space-y-3 mb-4">
        {tasks.map((task) => (
          <li key={task.id} className="border p-2 rounded">
            <p><strong>Task Name:</strong> {task.title}</p>
            <p><strong>Description:</strong> {task.description}</p>
            <p><strong>Status:</strong> {task.status}</p>
          </li>
        ))}
      </ul>
      </div>
    );
};

export default ScrumDetails;