import React, { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Paper,
  IconButton,
  Popover,
  Tooltip,
  Select,
  MenuItem,
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

const MissionInputStep4 = ({ onNext, onBack, data }) => {
  const [expectationFromAp, setExpectationFromAp] = useState(data.expectationFromAp || '');
  const [selectedAP, setSelectedAP] = useState(data.selectedAP || '');
  const [anchorElMessage, setAnchorElMessage] = useState(null);
  const [anchorElAP, setAnchorElAP] = useState(null);

  const handleNext = () => {
    if (expectationFromAp) { // Only check if expectationFromAp is filled
      onNext({ expectationFromAp, selectedAP });
    }
  };

  const handleBack = () => {
    onBack();
  };

  const handlePopoverOpenMessage = (event) => {
    setAnchorElMessage(event.currentTarget);
  };

  const handlePopoverCloseMessage = () => {
    setAnchorElMessage(null);
  };

  const handlePopoverOpenAP = (event) => {
    setAnchorElAP(event.currentTarget);
  };

  const handlePopoverCloseAP = () => {
    setAnchorElAP(null);
  };

  const openMessage = Boolean(anchorElMessage);
  const openAP = Boolean(anchorElAP);
  const isCreateButtonEnabled = !!expectationFromAp; // Enable the Create Mission button only if expectation is provided

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
      <Paper style={{ padding: '20px', textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Mission Creation
        </Typography>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              label="Expectation from AP"
              variant="outlined"
              value={expectationFromAp}
              onChange={(e) => setExpectationFromAp(e.target.value)}
              margin="normal"
              style={{ width: '800px' }}
            />
            <Tooltip title="Information about the Message to AP">
              <IconButton onClick={handlePopoverOpenMessage}>
                <InfoIcon />
              </IconButton>
            </Tooltip>
            <Popover
              id="field-message-info"
              open={openMessage}
              anchorEl={anchorElMessage}
              onClose={handlePopoverCloseMessage}
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
                Explain how your Accountability Partner (AP) can help you with your mission.
              </Typography>
            </Popover>
          </div>

          {/* <div style={{ display: 'flex', alignItems: 'center' }}>
            <Select
              value={selectedAP}
              onChange={(e) => setSelectedAP(e.target.value)}
              displayEmpty
              variant="outlined"
              style={{ width: '800px' }}
              inputProps={{ 'aria-label': 'Select AP' }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="AP1">AP1</MenuItem>
              <MenuItem value="AP2">AP2</MenuItem>
              <MenuItem value="AP3">AP3</MenuItem>
            </Select>
            <Tooltip title="Information about AP">
              <IconButton onClick={handlePopoverOpenAP}>
                <InfoIcon />
              </IconButton>
            </Tooltip>
            <Popover
              id="ap-info"
              open={openAP}
              anchorEl={anchorElAP}
              onClose={handlePopoverCloseAP}
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
                Choose your Accountability Partner (AP) for the mission.
              </Typography>
            </Popover>
          </div> */}
        </div>

        <Button variant="contained" color="primary" onClick={handleNext} disabled={!isCreateButtonEnabled} style={{ margin: '20px' }}>
          Create Mission
        </Button>
        <Button variant="contained" color="primary" onClick={handleBack} style={{ margin: '20px' }}>
          Back
        </Button>
      </Paper>
    </div>
  );
};

export default MissionInputStep4;
