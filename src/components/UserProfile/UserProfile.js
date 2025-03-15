import { useEffect, useState } from 'react';
import { useUserContext } from '../../context/UserContext';
const UserProfile = () => {
  const { user } = useUserContext();
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
    <div >
      <h2 >Tasks Worked By {user.name}</h2>

      <ul className="space-y-3">
        {tasks.map((task) => (
          <li key={task.id} >
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
