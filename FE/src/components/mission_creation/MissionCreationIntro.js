import React from 'react';
import { Button, Typography, Paper } from '@material-ui/core';

const styles = {
  ul: {
    "list-style-type": "none",
  }
}

const MissionCreationIntro = ({ onNext }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
      <Paper style={{ padding: '20px', display: 'grid', justifyContent: 'center', width: '800px' }}>
        <Typography variant="h5" gutterBottom>Welcome to Mission Creation</Typography>
        <Typography variant="body1" gutterBottom>Embark on your personal growth journey by creating missions that align with your aspirations and goals.</Typography>
        <Typography variant="body1" gutterBottom>Here’s what you need to know to get started:</Typography>
        <ul style={styles.ul}>
          <li><strong>Define Clear Objectives</strong>
            <ul>
              <li>Purpose-Driven Missions: Begin by defining clear, achievable objectives.</li>
              <li>S.M.A.R.T. Goals: Ensure your missions involve Specific, Measurable, Achievable, Relevant, and Time-bound goals.</li>
            </ul>
          </li>
          <li><strong>Select Your Support System</strong>
            <ul>
              <li>Mentor Guidance: Utilize GrowthHub’s advanced algorithmic matching to connect with mentors.</li>
            </ul>
          </li>
          <li><strong>Engage with Dynamic Tools</strong>
            <ul>
              <li>Tracking and Reflection: Leverage our tools to track your progress and reflect on your journey.</li>
              <li>Gamification and Challenges: Participate in group challenges and interactive games that keep you motivated.</li>
            </ul>
          </li>
          <li><strong>Review and Adjust</strong>
            <ul>
              <li>Flexible Missions: Regularly review your progress and adjust your missions as needed.</li>
            </ul>
          </li>
        </ul>
        <Button variant="contained" color="primary" onClick={onNext}>
          Create Mission
        </Button>
      </Paper>
    </div>
  );

};

export default MissionCreationIntro;
