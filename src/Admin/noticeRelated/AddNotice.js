import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import Popup from '../../Conponent/Popup';

const AddNotice = () => {
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [description, setDetails] = useState('');
  const [date, setDate] = useState('');
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');

  const currentUser = JSON.parse(localStorage.getItem('currentUser')); // Assuming currentUser is stored in local storage
  const adminID = currentUser?._id;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoader(true);

    const fields = { title, description  };
    try {
      const response = await axios.post('http://localhost:5000/api/notice/', fields); // Replace with your actual API endpoint
      console.log(response)
      if (response.status === 201) {
        navigate('Admin/notices');
      }
    } catch (error) {
      setMessage('Network Error');
      setShowPopup(true);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <div className="register">
        <form className="registerForm" onSubmit={handleSubmit}>
          <span className="registerTitle">Add Notice</span>
          <label>Title</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Enter notice title..."
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />

          <label>Details</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Enter notice details..."
            value={description}
            onChange={(event) => setDetails(event.target.value)}
            required
          />

          <label>Date</label>
          <input
            className="registerInput"
            type="date"
            placeholder="Enter notice date..."
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />

          <button className="registerButton" type="submit" disabled={loader}>
            {loader ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Add'
            )}
          </button>
        </form>
      </div>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  );
};

export default AddNotice;
