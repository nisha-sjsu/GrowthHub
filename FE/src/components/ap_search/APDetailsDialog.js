import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button } from '@material-ui/core';

const APDetailsDialog = ({ ap, open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{ap.name}</DialogTitle>
      <DialogContent>
        <Typography gutterBottom>
          Age: {ap.age}
        </Typography>
        <Typography gutterBottom>
          Gender: {ap.gender}
        </Typography>
        <Typography gutterBottom>
          Email: {ap.email}
        </Typography>
        <Typography gutterBottom>
          Interests: {ap.interests.join(', ')}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button onClick={handleRequestClick} color="primary" variant="contained">
          Send Request
        </Button>
      </DialogActions>
    </Dialog>
  );

  function handleRequestClick() {
    // Handle request click
  }
};

export default APDetailsDialog;
