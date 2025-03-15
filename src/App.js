import React, { createContext, useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import { UserProvider, useUserContext } from './context/UserContext';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Dashboard from './components/Dashboard/Dashboard';
import ScrumDetails from './components/Scrum Details/ScrumDetails';
import UserProfile from './components/UserProfile/UserProfile';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<ProtectedRoute component={<Dashboard />} />} />
          <Route path="/scrumdetails/:id" element={<ProtectedRoute component={<ScrumDetails />} />} />
          <Route path="/profiles" element={<ProtectedRoute component={<UserProfile />} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

const Nav = () => {
  const { user, logout } = useUserContext();
  return (
    <nav>
      {user ? (
        <> <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/profiles">Profiles</Link></li>
          <li><button
            onClick={() => logout()}
          >
            Logout
          </button>
          </li>
        </ul>
        </>
      ) : (
        <><ul>
          <br></br><li><Link to="/">Dashboard</Link></li>
          <br></br><li><Link to="/login">Login</Link></li>
        </ul>
        </>

      )}
    </nav>

  );

};

const ProtectedRoute = ({ component }) => {
  const { user } = useUserContext();
  return user ? component : <Navigate to="/login" />;
};

export default App;