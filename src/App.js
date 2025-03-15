import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Dashboard from './components/Dashboard/Dashboard';
import ScrumDetails from './components/Scrum Details/ScrumDetails';
import UserProfile from './components/UserProfile/UserProfile';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));
  
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("user"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);  
  return (
    <Router>
      <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Dashboard isLoggedIn={isLoggedIn} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<ProtectedRoute component={<Dashboard />} />} />
        <Route path="/scrumdetails/:id" element={<ProtectedRoute component={<ScrumDetails />} />} />
        <Route path="/profiles" element={<ProtectedRoute component={<UserProfile />} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

const Nav = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <nav className="p-4 bg-gray-200 flex justify-between">
      {isLoggedIn ? (
        <> <ul>
          <li><Link to="/dashboard" className="mr-4 text-blue-600">Dashboard</Link></li>
          <li><Link to="/profiles" className="mr-4 text-blue-600">Profiles</Link></li>
          <li><button
            onClick={() => {
              localStorage.removeItem("user");
              setIsLoggedIn(false);
            }}
            className="text-red-600"
          >
            Logout
          </button>
          </li>
          </ul>
        </>
      ) : (
        <><ul>
          <br></br><li><Link to="/" className="mr-4 text-blue-600">Dashboard</Link></li>
          <br></br><li><Link to="/login" className="mr-4 text-blue-600">Login</Link></li>
          </ul>
        </>
        
      )}
    </nav>
    
  );
  
};

const ProtectedRoute = ({ component }) => {
  return localStorage.getItem("user") ? component : <Navigate to="/login" />;
};

export default App;