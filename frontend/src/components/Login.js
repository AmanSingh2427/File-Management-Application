import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState(''); // State for displaying login error messages
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear error message on change
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
    setErrorMessage(''); // Clear any error message when input changes
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password.trim()) newErrors.password = 'Password is required';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:8000/api/auth/login', formData);
        localStorage.setItem('authToken', response.data.token); // Store JWT token
        localStorage.setItem('userName', response.data.userName); // Store username
        localStorage.setItem('userId', response.data.userId); // Store user ID

        setSuccessMessage('Successfully logged in!');
        setTimeout(() => {
          navigate('/home'); // Redirect to home page after a delay
        }, 2000); // Adjust delay as needed (2 seconds in this case)
      } catch (error) {
        console.error('Login error:', error.response ? error.response.data : error.message);
        setErrorMessage(error.response?.data?.message || 'An error occurred during login'); // Set the error message from the server response
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">Login</h2>
      {successMessage && (
        <div className="p-4 mb-4 text-green-800 bg-green-200 rounded-lg text-center">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="p-4 mb-4 text-red-800 bg-red-200 rounded-lg text-center">
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={`w-full p-3 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className={`w-full p-3 border rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>
        <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300 ease-in-out">Login</button>
        <div className="text-center mt-4">
          <p className="text-gray-600">Don't have an Account? <Link to="/" className="text-blue-500 hover:underline">Sign up</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
