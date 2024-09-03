import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import axios from 'axios'; // Import axios for HTTP requests

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    gender: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    username: '',
    email: '',
    gender: '',
    password: '',
  });

  const [notification, setNotification] = useState(''); // State for notification

  const navigate = useNavigate(); // Hook to navigate to different routes

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
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:8000/api/signup', formData);
        console.log(response.data);
        setNotification('Registered successfully'); // Show notification
        setTimeout(() => {
          setNotification(''); // Clear notification after a few seconds
          navigate('/login'); // Redirect to login page
        }, 2000); // Adjust timing as needed
      } catch (error) {
        console.error('Error submitting form', error);
        setNotification('Failed to register. Please try again.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
      {notification && (
        <div className="mb-4 p-3 text-center text-white bg-green-500 rounded-md">
          {notification}
        </div>
      )}
      <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className={`w-full p-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="username" className="block text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            className={`w-full p-2 border rounded-md ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={`w-full p-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="gender" className="block text-gray-700">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="" disabled>Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className={`w-full p-2 border rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
        <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Sign Up</button>
        <div className="text-center mt-4">
          <p className="text-gray-600">Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link></p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
