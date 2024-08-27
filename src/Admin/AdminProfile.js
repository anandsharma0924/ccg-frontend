import React, { useState, useEffect } from 'react';
import { Button, Collapse } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminProfile = () => {
    const [showTab, setShowTab] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const buttonText = showTab ? 'Cancel' : 'Edit profile';
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user data from an API
        axios.get('http://localhost:5000/api/admin/profile')
            .then(response => setCurrentUser(response.data))
            .catch(error => console.error(error));
    }, []);

    const [name, setName] = useState(currentUser.name || '');
    const [email, setEmail] = useState(currentUser.email || '');
    const [schoolName, setSchoolName] = useState(currentUser.schoolName || '');
    const [password, setPassword] = useState('');

    const fields = password === "" ? { name, email, schoolName } : { name, email, password, schoolName };

    const submitHandler = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:5000/api/admin/profile/${currentUser._id}`, fields)
            .then(response => console.log(response.data))
            .catch(error => console.error(error));
    };

    const deleteHandler = () => {
        axios.delete(`http://localhost:5000/api/admin/profile/${currentUser._id}`)
            .then(() => {
            navigate('/admin/login');
                navigate('/');
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            Name: {currentUser.name}
            <br />
            Email: {currentUser.email}
            <br />
            School: {currentUser.schoolName}
            <br />
            <Button variant="contained" color="error" onClick={deleteHandler}>Delete</Button>
            <Button variant="contained" sx={styles.showButton}
                onClick={() => setShowTab(!showTab)}>
                {showTab ? <KeyboardArrowUp /> : <KeyboardArrowDown />}{buttonText}
            </Button>
            <Collapse in={showTab} timeout="auto" unmountOnExit>
                <div className="register">
                    <form className="registerForm" onSubmit={submitHandler}>
                        <span className="registerTitle">Edit Details</span>
                        <label>Name</label>
                        <input className="registerInput" type="text" placeholder="Enter your name..."
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            autoComplete="name" required />

                        <label>School</label>
                        <input className="registerInput" type="text" placeholder="Enter your school name..."
                            value={schoolName}
                            onChange={(event) => setSchoolName(event.target.value)}
                            autoComplete="name" required />

                        <label>Email</label>
                        <input className="registerInput" type="email" placeholder="Enter your email..."
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            autoComplete="email" required />

                        <label>Password</label>
                        <input className="registerInput" type="password" placeholder="Enter your password..."
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            autoComplete="new-password" />

                        <button className="registerButton" type="submit">Update</button>
                    </form>
                </div>
            </Collapse>
        </div>
    );
};

export default AdminProfile;

const styles = {
    showButton: {
        backgroundColor: "#270843",
        "&:hover": {
            backgroundColor: "#3f1068",
        }
    }
};
