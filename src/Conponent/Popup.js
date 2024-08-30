import * as React from 'react';
import { Snackbar, Alert } from '@mui/material';

const Popup = ({ message, setShowPopup, showPopup }) => {
  const vertical = "top";
  const horizontal = "right";

  const handleClose = (event, reason) => {
    
    if (reason === 'clickaway') {
      return;
    }
    setShowPopup(false);
  };

  return (
    <Snackbar
      open={showPopup}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{ vertical, horizontal }}
      key={vertical + horizontal}
    >
      <Alert onClose={handleClose} severity={message === "Done Successfully" ? "success" : "error"} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Popup;
