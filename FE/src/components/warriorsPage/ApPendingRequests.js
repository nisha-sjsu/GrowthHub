import React, { useState } from 'react';
import { Grid, Paper, Typography, Button } from '@mui/material';
import axios from 'axios';
import WarriorMissionDetailsDialog from './WarriorMissionDetailsDialog';
// import MissionDetailsDialog from '../PublicChallenges/MissionDetailsDialog';
import api from '../../utils/api';

const ApPendingRequests = ({ apRequests, styles }) => {
    const [open, setOpen] = useState(false);
    const [selectedMission, setSelectedMission] = useState(null);
    const [selectedApRequest, setSelectedApRequest] = useState(null);

    const bufferToUUIDString = (taskId) => {
        const bytes = taskId;
        const byteToHex = (byte) => byte.toString(16).padStart(2, '0');
        const byteToString = (start, end) => bytes.slice(start, end).map(byteToHex).join('');
        return `${byteToString(0, 4)}-${byteToString(4, 6)}-${byteToString(6, 8)}-${byteToString(8, 10)}-${byteToString(10, 16)}`;
    };

    const handleOpenMissionDetails = async (request) => {
        console.log(request);
        setSelectedApRequest(request);
        try {
            const response = await api.get(`http://localhost:3001/missions/mission/${bufferToUUIDString(request.missionId.data)}`);
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
            {apRequests.map((request) => (
                <Grid item xs={12} sm={6} key={request._id}>
                    <Paper style={styles.card}>
                        <Typography variant="h6" style={styles.missionName}>AP Request</Typography>
                        <Typography variant="body1" style={styles.label}>AP Name:</Typography>
                        <Typography variant="body1" style={styles.infoText}>{request.apUserName}</Typography>
                        <Typography variant="body1" style={styles.label}>Warrior Name:</Typography>
                        <Typography variant="body1" style={styles.infoText}>{request.warriorUserName}</Typography>
                        <Typography variant="body1" style={styles.label}>Status:</Typography>
                        <Typography variant="body1" style={styles.infoText}>{request.status}</Typography>
                        <Typography variant="body1" style={styles.label}>Expectation from AP:</Typography>
                        <Typography variant="body1" style={styles.infoText}>{request.expectationFromAp}</Typography>
                        <Button variant="contained" color="primary" onClick={() => handleOpenMissionDetails(request)}>
                            View Mission
                        </Button>
                    </Paper>
                </Grid>
            ))}
            {selectedMission && (
                <WarriorMissionDetailsDialog
                    mission={selectedMission}
                    selectedApRequest={selectedApRequest}
                    open={open}
                    onClose={handleCloseDialog}
                    showAcceptReject={true}
                />
            )}
        </Grid>
    );
};

export default ApPendingRequests;
