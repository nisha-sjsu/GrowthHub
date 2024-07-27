import React from 'react';
import { Button, Typography, Paper } from '@material-ui/core';

const MissionCreationComplete = ({ onNext }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
    <Paper style={{ padding: '20px', display: 'grid', justifyContent: 'center', width: '800px' }}>
      <Typography variant="h5" gutterBottom>Mission Creation Complete! 🎉🎉</Typography>
      <Typography variant="body1" gutterBottom>Mission created and request sent to AP successfully.</Typography>
    </Paper>
    </div>
  );
  
};

export default MissionCreationComplete;
