import React, { useState } from "react";
import { Box, Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Popup from "../../Conponent/Popup";
import Classroom from "../../assets/classroom.png";
import styled from "styled-components";

const AddClass = () => {
  const [className, setClassName] = useState("");
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();  
    
    if (loader) return; 
  
    setLoader(true);         
  
    try {
      const response = await axios.post("http://localhost:5000/api/class/", {
        name: className,     
      });
      const classId = response.data.classs.id;
  console.log(response ,"responseee")
      if (response.status === 201) {
        navigate(`/Admin/dashboard/Time/${classId}`);
        console.log(response.data);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Network Error");
      setShowPopup(true);
    } finally {
      setLoader(false); 
    }
  };
  
  return (
    <React.Fragment>

      <StyledContainer>
        <StyledBox>
          <Stack sx={{ alignItems: "center", mb: 3 }}>
            <img src={Classroom} alt="classroom" style={{ width: "80%" }} />
          </Stack>
          <form onSubmit={submitHandler}>
            <Stack spacing={3}>
              <TextField
                label="Create a class"
                variant="outlined"
                value={className}
                onChange={(event) => setClassName(event.target.value)}
                required
              />
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                variant="contained"
                color="primary"
                type="submit"
                disabled={loader}
              >
              
                {loader ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Create"
                )}
              </Button>
              <Button variant="outlined" onClick={() => navigate(-1)}>
                Go Back
              </Button>
            </Stack>
          </form>
        </StyledBox>

      </StyledContainer>
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    <Outlet/>

    </React.Fragment>
  );
};

export default AddClass;

const StyledContainer = styled(Box)`
  flex: 1 1 auto;
  align-items: center;
  display: flex;
  justify-content: center;
`;

const StyledBox = styled(Box)`
  max-width: 550px;
  padding: 50px 3rem 50px;
  margin-top: 1rem;
  background-color: white;
  box-shadow: 
0 0 10px rgba(0, 0, 0, 0.2);
  border: 1px solid #ccc;
  border-radius: 4px;
`;
