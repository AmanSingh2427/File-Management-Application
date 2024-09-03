import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Home = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(''); // State to store error messages
  const [success, setSuccess] = useState(''); // State to store success message
  const fileInputRef = useRef(null); // Reference for the file input
  const navigate = useNavigate(); // Initialize useNavigate

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
      'application/vnd.ms-excel', // .xls
      'text/csv', // .csv
      'text/plain', // .txt
    ];

    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setError(''); // Clear error if file type is correct
      setSuccess(''); // Clear any previous success message
    } else {
      setFile(null);
      setError('Unsupported file type! Please select a file with one of the following types: .xlsx, .xls, .csv, .txt');
      e.target.value = ''; // Reset the file input
      setSuccess(''); // Clear any previous success message
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a file before uploading.'); // Set error message if no file is selected
      setSuccess(''); // Clear any previous success message
      return; // Stop the function execution
    }

    const formData = new FormData();
    formData.append('file', file);
    const userId = localStorage.getItem('userId');
    console.log('User ID from localStorage:', userId); // Debugging line
    formData.append('upload_users_id', userId); // Add user ID to form data
    console.log("user id from local storage in upload " + userId);

    try {
      const response = await fetch('http://localhost:8000/api/files/upload', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        setSuccess('File uploaded successfully!'); // Set success message
        setError(''); // Clear any previous error message
        setFile(null); // Reset file state
        fileInputRef.current.value = ''; // Clear the file input field using the reference
        setTimeout(() => setSuccess(''), 3000); // Clear success message after 3 seconds
      } else {
        const data = await response.json();
        setError(`Upload failed: ${data.message || 'An error occurred'}`);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('Error uploading file: ' + error.message);
    }
  };

  const handleViewData = () => {
    navigate('/viewdata'); // Redirect to the ViewData page
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />
        <div className="mt-16 p-4">
          {/* File upload form */}
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="mb-4">
              <label htmlFor="file" className="block text-gray-700">Select a file:</label>
              <input
                type="file"
                id="file"
                name="file"
                ref={fileInputRef} // Reference to the file input
                onChange={handleFileChange}
                accept=".xlsx,.xls,.csv,.txt"
                className="mt-2 block w-full text-sm text-gray-700 border rounded-md"
              />
            </div>
            {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
            {success && <p className="text-green-500">{success}</p>} {/* Display success message */}
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Upload File
              </button>
              <button
                type="button"
                onClick={handleViewData}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
              >
                View Data
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
