import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography, Grid, Paper, TextField, Button, List, ListItem, ListItemText,
  Tabs, Tab, Box
} from '@mui/material';
import { aToken } from '../config';
import api from "../utils/api";
import ViewAllWarriiors from '../components/warriorsPage/ViewAllWarriors';
import ApPendingRequests from '../components/warriorsPage/ApPendingRequests';

const MyWarriorsV2 = () => {
    const [missions, setMissions] = useState([]);
    const [apRequests, setApRequests] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [usernames, setUsernames] = useState({});
    const [currentTab, setCurrentTab] = useState(0);

    const headers = { 'token': aToken };

    const handleChangeTab = (event, newValue) => {
        setCurrentTab(newValue);
    };

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

    const fetchPendingApRequestss = async () => {
        try {
            const response = await api.get('/apRequests/fetch-all-requests');
            setApRequests(response.data.data);
        } catch (error) {
            console.error('There was a problem fetching AP requests:', error);
        }
    };

    const fetchPendingApRequests = async () => {
        try {
            const response = await api.get('/apRequests/fetch-all-requests');
            // Use Promise.all to handle multiple asynchronous requests simultaneously
            const requestsWithUserNames = await Promise.all(response.data.data.map(async (request) => {
                // Fetch AP username
                const apResponse = await axios.get(`http://localhost:3001/users/user-profile/${request.apId}`, { headers });
                const apUserName = apResponse.data.data.name || 'Unknown AP';
    
                // Fetch Warrior username
                const warriorResponse = await axios.get(`http://localhost:3001/users/user-profile/${request.warriorId}`, { headers });
                const warriorUserName = warriorResponse.data.data.name || 'Unknown Warrior';
    
                // Return the request object augmented with usernames
                return {
                    ...request,
                    apUserName, // Add AP username to the request object
                    warriorUserName // Add Warrior username to the request object
                };
            }));
            setApRequests(requestsWithUserNames); // Update state with enriched requests
        } catch (error) {
            console.error('There was a problem fetching AP requests:', error);
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
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Tabs value={currentTab} onChange={handleChangeTab} centered>
                    <Tab label="Missions" />
                    <Tab label="Pending AP Requests" />
                </Tabs>
            </Grid>
            {currentTab === 0 && (
                <ViewAllWarriiors
                    missions={missions}
                    handleAddComment={handleAddComment}
                    newComment={newComment}
                    setNewComment={setNewComment}
                    usernames={usernames}
                    styles={styles}
                />
            )}
            {currentTab === 1 && (
                <ApPendingRequests
                    apRequests={apRequests}
                    styles={styles}
                />
            )}
        </Grid>
    );
};

export default MyWarriorsV2;
