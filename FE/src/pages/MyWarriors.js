import { Typography, Grid, Paper, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { aToken } from '../config';
import api from "../utils/api";

const MyWarriors = () => {
    const [missions, setMissions] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [usernames, setUsernames] = useState({});

    const headers = { 'token': aToken };
    const fetchMissions = async () => {
        try {
            const response = await axios.get('http://localhost:3001/missions/warrior-missions', { headers });
            const missionsWithUserNames = await Promise.all(response.data.map(async (mission) => {
            const userResponse = await axios.get(`http://localhost:3001/users/user-profile/${mission.Mission.userId}`, { headers });
            let userName = userResponse.data.data.name;
            usernames[mission.Mission.userId] = userName;
            mission.Mission.userName = userName;

            const apResponse = await axios.get(`http://localhost:3001/users/user-profile/${mission.Mission.assignedAPId}`, { headers });
            userName = apResponse.data.data.name;
            usernames[mission.Mission.assignedAPId] = userName;
            return mission;
                
            }));
            setMissions(missionsWithUserNames);
        } catch (error) {
            console.error('There was a problem fetching missions:', error);
        }
    };

    const fetchPendingApRequests = async () => {
        try {
            const response = await api.get('/apRequests/fetch-all-requests');
            console.log("apRequestsPending", response);
        } catch (error) {
            console.error('There was a problem fetching missions:', error);
        }
    };

    useEffect(() => {
        fetchMissions();
        fetchPendingApRequests();
    }, []);

    const handleAddComment = async (missionId, assignedAPId) => {
        try {
            const requestBody = {
                comments: [
                    {
                        userId: assignedAPId,
                        comment: newComment
                    }
                ]
            };

            const response = await axios.patch(`http://localhost:3001/missions/mission/${missionId}`, requestBody, { headers });

            if (response.status === 200) {
                // Refresh missions after adding a new comment
                await fetchMissions();
                setNewComment('');
            } else {
                console.error('Failed to add comment');
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const styles = {
        cardSection: {
            marginTop: '20px',
        },
        card: {
            padding: '20px',
        },
        missionInfo: {
            textAlign: 'left',
        },
        missionName: {
            fontWeight: 'bold',
        },
        label: {
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: '#333',
            padding: '2px 8px',
            borderRadius: '4px',
            display: 'inline-block',
            marginBottom: '4px',
        },
        infoText: {
            marginLeft: '10px',
        },
        commentsSection: {
            marginTop: '20px',
        },
        comment: {
            marginBottom: '5px',
            padding: '5px',
            borderRadius: '5px',
        },
        userId: {
            fontWeight: 'bold',
            marginRight: '5px',
        },
    };

    return (
        <Grid container spacing={2} style={styles.cardSection} alignItems="center">
            {missions.map((mission) => ( 
                <Grid item xs={6} key={mission.missionId}>
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
        </Grid>
    );
};

export default MyWarriors;
