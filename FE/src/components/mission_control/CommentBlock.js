import React, { useState, useEffect } from 'react';
import {
    Paper, Typography, TextField, Button
} from '@mui/material';
import { aToken } from '../../config';
import axios from 'axios';

const styles = {
    paper: {
        padding: '20px',
        color: 'white',
        marginBottom: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    commentContainer: {
        width: '100%',
        marginBottom: '10px',
    },
    userId: {
        fontWeight: 'bold',
        marginRight: '5px',
    },
}

export const MissionComments = ({ selectedMission, setSelectedMission }) => {
    const [newComment, setNewComment] = useState('');
    const [usernames, setUsernames] = useState({}); // Store usernames for each user ID
    
    useEffect(() => {
        // Fetch usernames for each user ID in comments
        const fetchUsernames = async () => {
            const ids = selectedMission.comments.map(comment => comment.userId);
            const uniqueIds = Array.from(new Set(ids)); // Get unique user IDs
            
            const requests = uniqueIds.map(async (userId) => {
                try {
                    const response = await fetch(`http://localhost:3001/users/user-profile/${userId}`, {headers:{'token': aToken}});
                    if (response.ok) {
                        const data = await response.json();
                        setUsernames(prevState => ({
                            ...prevState,
                            [userId]: data.data.name,
                        }));
                    } else {
                        console.error('Failed to fetch username');
                    }
                } catch (error) {
                    console.error('Failed to fetch username:', error);
                }
            });
            
            await Promise.all(requests);
        };
        
        if (selectedMission) {
            fetchUsernames();
        }
    }, [selectedMission]);
    
    const handleAddComment = async () => {
        try {
            // Prepare the request body
            const requestBody = {
                comments: [
                    {
                        userId: selectedMission.userId,
                        comment: newComment
                    }
                ]
            };
    
            // Send PATCH request using Axios
            const response = await axios.patch(`http://localhost:3001/missions/mission/${selectedMission.missionId}`, requestBody, {
                headers: {
                    "token": aToken
                }
            });
    
            if (response.status === 200) {
                // If the update is successful, update the local state
                const updatedMission = { ...selectedMission };
                updatedMission.comments.push({ userId: selectedMission.userId, comment: newComment });
                setSelectedMission(updatedMission);
                setNewComment('');
            } else {
                console.error('Failed to update comments');
            }
        } catch (error) {
            console.error('Error updating comments:', error);
        }
    };

    return (
        <>
                <Paper style={styles.paper}>
                    <Typography variant="h6">Comments</Typography>
                    <div style={styles.commentContainer}>
                        {selectedMission.comments.map((comment, index) => (
                            <Typography key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={styles.userId}>{usernames[comment.userId]}:</span>
                                <span>{comment.comment}</span>
                            </Typography>
                        ))}
                    </div>
                    <TextField
                        label="Add a comment"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" onClick={handleAddComment}>Add Comment</Button>
                </Paper>
        </>
    );
}
