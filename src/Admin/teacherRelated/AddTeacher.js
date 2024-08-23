import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Popup from '../../Conponent/Popup';
import { CircularProgress } from '@mui/material';

const AddTeacher = () => {
  const { id: subjectID } = useParams();
  const navigate = useNavigate();

  const [subjectDetails, setSubjectDetails] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');
  const [loader, setLoader] = useState(false);

  const role = 'Teacher';

  useEffect(() => {
    const fetchSubjectDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/subject/${subjectID}`);
        setSubjectDetails(response.data);
      } catch (error) {
        setMessage('Failed to load subject details');
        setShowPopup(true);
      }
    };
    fetchSubjectDetails();
  }, [subjectID]);

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoader(true);

    const fields = {
      name,
      email,
      password,
      role,
      school: subjectDetails?.school,
      teachSubject: subjectDetails?._id,
      teachSclass: subjectDetails?.sclassName?._id,
    };

    try {
      await axios.post('http://localhost:5000/api/teachers/', fields);
      navigate('/Admin/teachers');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Network Error');
      setShowPopup(true);
      setLoader(false);
    }
  };

  return (
    <div>
      <div className="register">
        <form className="registerForm" onSubmit={submitHandler}>
          <span className="registerTitle">Add Teacher</span>
          <br />
          <label>Subject: {subjectDetails?.subName}</label>
          <label>Class: {subjectDetails?.sclassName?.sclassName}</label>
          <label>Name</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Enter teacher's name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
          />
          <label>Email</label>
          <input
            className="registerInput"
            type="email"
            placeholder="Enter teacher's email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
          <label>Password</label>
          <input
            className="registerInput"
            type="password"
            placeholder="Enter teacher's password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />
          <button className="registerButton" type="submit" disabled={loader}>
            {loader ? <CircularProgress size={24} color="inherit" /> : 'Register'}
          </button>
        </form>
      </div>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </div>
  );
};

export default AddTeacher;
