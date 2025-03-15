import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // Validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string().email("Please include an '@'").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // Function to handle login
  const handleLogin = async (values) => {
    try {
      const response = await fetch("http://localhost:3000/users");
      const users = await response.json();

      const user = users.find(
        (u) => u.email === values.email && u.password === values.password
      );

      if (user) {
        // Store user data in localStorage (optional)
        localStorage.setItem("user", JSON.stringify(user));
        setIsLoggedIn(true);
        // Redirect user based on role
        if (user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label className="block">Email:</label>
              <Field type="email" name="email" className="border p-2 w-full" />
              <ErrorMessage name="email" component="div" className="text-red-500" />
            

              <label className="block">Password:</label>
              <Field type="password" name="password" className="border p-2 w-full" />
              <ErrorMessage name="password" component="div" className="text-red-500" />

            <button 
              type="submit" 
              className="bg-blue-500 text-white px-4 py-2 rounded w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
            </div>
          </Form>
        )}
      </Formik>

      <p className="mt-4">
  <button 
    onClick={() => window.location.href='/signup'} 
    className="text-blue-500 bg-transparent border-0 cursor-pointer"
  >
    Sign Up
  </button>
</p>
    </div>
  );
};

export default Login;
