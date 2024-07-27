import React from 'react';
import {
    Paper, Typography
} from '@mui/material';

const MissionDetailsCard = ({ mission, ap, completedTasks, lateTasks }) => {
    const cardStyles = {
        paper: {
            padding: '20px',
            textAlign: 'left', // Align content to the left
            color: 'white',
            marginBottom: '1rem',
        },
        label: {
            fontWeight: 'bold', // Make labels thicker
        },
    };

    return (
        <Paper style={cardStyles.paper}>
            <Typography variant="h6">{mission.missionName}</Typography>
            <Typography variant="body1">{mission.missionObjective}</Typography>
            {ap?<Typography variant="body2" style={cardStyles.label}>AP: {ap}</Typography>:null}
            <Typography variant="body2" style={cardStyles.label}>Completed Tasks: {completedTasks}</Typography>
            <Typography variant="body2" style={cardStyles.label}>Late Tasks: {lateTasks}</Typography>
        </Paper>
    );
};

export default MissionDetailsCard;