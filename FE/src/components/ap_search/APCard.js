import React, { useState } from 'react';
import { Card, CardContent, Typography, Button,Chip } from '@material-ui/core';

const APCard = ({ ap, onSendRequest }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleMouseEnter = () => {
    setShowDetails(true);
  };

  const handleMouseLeave = () => {
    setShowDetails(false);
  };

  const handleSendRequest = () => {
    // Call the onSendRequest callback with the AP object when the button is clicked
    onSendRequest(ap);
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {ap.name}
        </Typography>
        {showDetails && (
          <div>
            <Typography>Age: {ap.age}</Typography>
            <Typography>Interests: {<div style={{ marginTop: '8px' }}>
              {ap.interests.map((interest, index) => (
                <Chip key={index} label={interest} style={{ marginRight: '4px', marginBottom: '4px' }} />
              ))}
            </div>}

            </Typography>
            
             
            <Typography>Email: {ap.email}</Typography>
            {/* Add more details if needed */}
          </div>
        )}
        <Button variant="contained" color="primary" onClick={handleSendRequest}>
          Send Request
        </Button>
      </CardContent>
    </Card>
  );
};

export default APCard;
