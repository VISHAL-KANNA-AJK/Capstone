import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useUserContext } from '../../context/UserContext';

const SignUp = () => {
  const navigate = useNavigate();
  const { setUser } = useUserContext();
  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Please include an '@'").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  // Function to handle sign-up
  const handleSignUp = async (values) => {
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: Date.now(), // Generate a unique ID
          name: values.name,
          email: values.email,
          password: values.password,
          role: "user", // Default role as 'user'
        }),
      });

      if (response.ok) {
        const user = await response.json();
        setUser(user); // Update the user context with the newly registered user
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/login"); // Redirect to login page after signup
      } else {
        console.error("Sign-up failed");
      }
    } catch (err) {
      console.error("Error signing up:", err);
    }
  };
  return (
    <div>
      <h2>Sign Up</h2>

      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSignUp}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label >Name:</label>
              <Field type="text" name="name" />
              <ErrorMessage name="name" component="div" />

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
                {isSubmitting ? "Signing up..." : "Sign Up"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
