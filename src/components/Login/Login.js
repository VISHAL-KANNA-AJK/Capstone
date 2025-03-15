import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

const Login = () => {
  const { login } = useUserContext();
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
        login(user);
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
    <div>
      <h2 >Login</h2>
      {error && <p className="text-red-500">{error}</p>}

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ isSubmitting }) => (
          <Form>
            <div >
              <label >Email:</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />


              <label >Password:</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" />

              <button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <p >
        <button
          onClick={() => window.location.href = '/signup'}
        >
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default Login;
