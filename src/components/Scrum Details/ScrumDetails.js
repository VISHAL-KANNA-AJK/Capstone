import { useEffect, useState, useNavigate } from 'react';
import { useParams } from "react-router-dom";
import { useUserContext } from '../../context/UserContext';
const ScrumDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [tasks, setTasks] = useState([]);
  const [scrumName, setScrumName] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

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
    <div >
      <h2 >Scrum Details for {scrumName}</h2>

      <h3 >Tasks</h3>
      <ul >
        {tasks.map((task) => (
          <li key={task.id} >
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