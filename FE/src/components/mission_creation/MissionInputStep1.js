import React, { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Paper,
  IconButton,
  Popover,
  Tooltip,
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

const MissionInputStep1 = ({ onNext, data }) => {
  const [title, setTitle] = useState(data.title || '');
  const [missionObjective, setMissionObjective] = useState(data.missionObjective || '');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleNext = () => {
    if (title && missionObjective) { // Check if both title and mission objective are not empty
      onNext({ title, missionObjective }); // Pass title and mission objective back to the parent component
    }
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const isNextButtonEnabled = title && missionObjective; // Enable button only if both fields are filled

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
      <Paper style={{ padding: '20px', textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Mission Creation
        </Typography>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              label="Mission Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
              style={{ width: '800px' }}
            />
            <Tooltip title="Information about the mission title">
              <IconButton onClick={handlePopoverOpen}>
                <InfoIcon />
              </IconButton>
            </Tooltip>
            <Popover
              id="mission-title-info"
              open={open}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <Typography style={{ padding: '20px' }}>
                The mission title should be descriptive and to the point.
              </Typography>
            </Popover>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              label="Mission Objective"
              variant="outlined"
              value={missionObjective}
              onChange={(e) => setMissionObjective(e.target.value)}
              margin="normal"
              multiline
              minRows={3}
              style={{ width: '800px' }}
            />
            <Tooltip title="Information about the mission objective">
              <IconButton onClick={handlePopoverOpen}>
                <InfoIcon />
              </IconButton>
            </Tooltip>
            <Popover
              id="mission-objective-info"
              open={open}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <Typography style={{ padding: '20px' }}>
                The mission objective should clearly state the goal or purpose of the mission.
              </Typography>
            </Popover>
          </div>
        </div>
        
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleNext} 
          style={{ marginTop: '20px' }}
          disabled={!isNextButtonEnabled} // Button is disabled if fields are not filled
        >
          Next
        </Button>
      </Paper>
    </div>
  );
};

export default MissionInputStep1;
