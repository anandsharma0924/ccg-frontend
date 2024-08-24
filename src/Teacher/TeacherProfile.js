import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';

const TeacherProfile = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/teachers/1');
        setCurrentUser(response.data);
      } catch (err) {
        setError('Failed to fetch user data.');
      }
    };

    fetchUserProfile();
  }, []);

  if (error) {
    console.error(error);
    return <div>Error loading profile.</div>;
  }

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const teachSclass = currentUser.teachSclass;
  const teachSubject = currentUser.teachSubject;
  const teachSchool = currentUser.school;

  return (
    <ProfileCard>
      <ProfileCardContent>
        <ProfileText>Name: {currentUser.name}</ProfileText>
        <ProfileText>Email: {currentUser.email}</ProfileText>
        <ProfileText>Class: {teachSclass.sclassName}</ProfileText>
        <ProfileText>Subject: {teachSubject.subName}</ProfileText>
        <ProfileText>School: {teachSchool.schoolName}</ProfileText>
      </ProfileCardContent>
    </ProfileCard>
  );
};

export default TeacherProfile;

const ProfileCard = styled(Card)`
  margin: 20px;
  width: 400px;
  border-radius: 10px;
`;

const ProfileCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileText = styled(Typography)`
  margin: 10px;
`;
