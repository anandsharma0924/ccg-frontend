import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card, CardContent, Typography, Avatar } from '@mui/material';
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
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (!currentUser) {
    return <LoadingMessage>Loading...</LoadingMessage>;
  }

  const teachSclass = currentUser.teachSclass;
  const teachSubject = currentUser.subject;
  const teachSchool = currentUser.school;

  return (
    <ProfileContainer>
      <ProfileCard>
        <AvatarStyled src={currentUser.profileImage || '/default-avatar.png'} alt="Profile Image" />
        <ProfileCardContent>
          <ProfileName variant="h5">{currentUser.name}</ProfileName>
          <ProfileText variant="body1">Email: {currentUser.email}</ProfileText>
          <ProfileText variant="body1">Subject: {teachSubject}</ProfileText>
        
          {/* <ProfileText variant="body1">Class: {teachSclass.sclassName}</ProfileText> */}
          {/* <ProfileText variant="body1">School: {teachSchool.schoolName}</ProfileText> */}
        </ProfileCardContent>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default TeacherProfile;

// Styled Components
const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f6f8;
`;

const ProfileCard = styled(Card)`
  width: 360px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: center;
  background-color: #ffffff;
`;

const AvatarStyled = styled(Avatar)`
  width: 100px;
  height: 100px;
  margin: 20px auto 0;
  border: 4px solid #4caf50;
`;

const ProfileCardContent = styled(CardContent)`
  padding: 20px;
`;

const ProfileName = styled(Typography)`
  font-weight: 600;
  margin: 10px 0;
`;

const ProfileText = styled(Typography)`
  margin: 8px 0;
  color: #6c757d;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin-top: 20px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  margin-top: 20px;
`;
