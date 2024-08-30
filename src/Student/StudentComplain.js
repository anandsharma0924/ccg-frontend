import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Popup from "../Conponent/Popup";
import { BlueButton } from "../Conponent/buttonStyles";
import axios from "axios";

const StudentComplain = () => {
  const [complaint, setComplaint] = useState("");
  const [date, setDate] = useState("");
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const currentUser = {
    _id: "current_user_id", // Replace with actual user data
    school: { _id: "school_id" }, // Replace with actual school data
  };

  const user = currentUser._id;
  const school = currentUser.school._id;
  const address = "Complain"; // This can be used as part of your API endpoint if necessary

  const fields = {
    user,
    date,
    complaint,
    school,
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoader(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/complains",
        fields
      );
      if (response.status === 200 || response.status === 201) {
        setMessage("Done Successfully");
      } else {
        setMessage("An error occurred");
      }
    } catch (error) {
      console.error(error);
      setMessage("Network Error");
    } finally {
      setLoader(false);
      setShowPopup(true);
    }
  };

  return (
    <>
      <Box
        sx={{
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Complain</Typography>
            </Stack>
            <form onSubmit={submitHandler}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Select Date"
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  fullWidth
                  label="Write your complain"
                  variant="outlined"
                  value={complaint}
                  onChange={(event) => {
                    setComplaint(event.target.value);
                  }}
                  required
                  multiline
                  maxRows={4}
                />
              </Stack>
              <BlueButton
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                variant="contained"
                type="submit"
                disabled={loader}
              >
                {loader ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Add"
                )}
              </BlueButton>
            </form>
          </div>
        </Box>
      </Box>
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </>
  );
};

export default StudentComplain;
