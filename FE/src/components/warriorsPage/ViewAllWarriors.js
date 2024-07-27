import React, { useState } from 'react';
import { Grid, Paper, Typography, TextField, Button, List } from '@mui/material';
import WarriorMissionDetailsDialog from './WarriorMissionDetailsDialog';
import api from '../../utils/api';

const ViewAllWarriiors = ({ missions, handleAddComment, newComment, setNewComment, usernames, styles }) => {
    const [open, setOpen] = useState(false);
    const [selectedMission, setSelectedMission] = useState(null);
    
    const bufferToUUIDString = (taskId) => {
        console.log(taskId);
        const bytes = taskId;
        const byteToHex = (byte) => byte.toString(16).padStart(2, '0');
        const byteToString = (start, end) => bytes.slice(start, end).map(byteToHex).join('');
        return `${byteToString(0, 4)}-${byteToString(4, 6)}-${byteToString(6, 8)}-${byteToString(8, 10)}-${byteToString(10, 16)}`;
    };

    const handleOpenMissionDetails = async (missionId) => {
        console.log(missionId);
        try {
            const response = await api.get(`http://localhost:3001/missions/mission/${missionId}`);
            setSelectedMission(response.data); // Set the fetched mission data
            setOpen(true); // Open the dialog
        } catch (error) {
            console.error('Failed to fetch mission details:', error);
            alert('Failed to fetch mission details');
        }
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    return (
        <Grid container spacing={2} style={styles.cardSection} alignItems="center">
            {missions.map((mission) => (
                <Grid item xs={6} key={mission.Mission.missionId}>
                    <Paper style={styles.card}>
                        <div style={styles.missionInfo}>
                            <Typography variant="h6" style={styles.missionName}>{mission.Mission.missionName}</Typography>
                            <Typography variant="body1" style={styles.label}>Warrior ⚔️:</Typography>
                            <Typography variant="body1" style={styles.infoText}>{mission.Mission.userName}</Typography>
                            <Typography variant="body1" style={styles.label}>Objective:</Typography>
                            <Typography variant="body1" style={styles.infoText}>{mission.Mission.missionObjective}</Typography>
                            <Typography variant="body1" style={styles.label}>Expectation:</Typography>
                            <Typography variant="body1" style={styles.infoText}>{mission.Mission.expectationFromAp}</Typography>
                            <Typography variant="body1" style={styles.label}>Status:</Typography>
                            <Typography variant="body1" style={styles.infoText}>{mission.Mission.status}</Typography>
                            <Typography variant="body1" style={styles.label}>Start Date:</Typography>
                            <Typography variant="body1" style={styles.infoText}>{new Date(mission.Mission.startDate).toLocaleDateString()}</Typography>
                            <Button variant="contained" color="primary" onClick={() => handleOpenMissionDetails(mission.Mission.missionId)}>
                                View Mission
                            </Button>
                            <TextField
                                label="Add a comment"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleAddComment(mission.Mission.missionId, mission.Mission.assignedAPId)}
                            >
                                Add Comment
                            </Button>
                        </div>
                        {/* Comments Section */}
                        <div style={styles.commentsSection}>
                            <Typography variant="h6">Comments</Typography>
                            <List>
                                {mission.Mission.comments.map((comment, index) => (
                                    <Typography key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                        <span style={styles.userId}>{usernames[comment.userId]}:</span>
                                        <span>{comment.comment}</span>
                                    </Typography>
                                ))}
                            </List>
                        </div>
                    </Paper>
                </Grid>
            ))}
            {selectedMission && (
                <WarriorMissionDetailsDialog
                    mission={selectedMission}
                    open={open}
                    onClose={handleCloseDialog}
                />
            )}
        </Grid>
    );
};

export default ViewAllWarriiors;
