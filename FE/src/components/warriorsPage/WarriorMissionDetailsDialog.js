import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core';
import api from '../../utils/api';

const WarriorMissionDetailsDialog = ({
  mission,
  selectedApRequest,
  open,
  onClose,
  showAcceptReject = false  // New prop to control the visibility of accept/reject buttons
}) => {

    const bufferToUUIDString = (taskId) => {
        const bytes = taskId;
        const byteToHex = (byte) => byte.toString(16).padStart(2, '0');
        const byteToString = (start, end) => bytes.slice(start, end).map(byteToHex).join('');
        return `${byteToString(0, 4)}-${byteToString(4, 6)}-${byteToString(6, 8)}-${byteToString(8, 10)}-${byteToString(10, 16)}`;
    };

    // Handlers for accept and reject actions
    const handleAccept = async () => {
        console.log("Accepting mission...");
        try {
            console.log("selectedAp", selectedApRequest);
            const response = await api.post('/apRequests/accept-request', { missionId:bufferToUUIDString(selectedApRequest.missionId.data), warriorId:selectedApRequest.warriorId, apId:selectedApRequest.apId });
            if (response.status === 201) {
                onClose(); // Optionally close the dialog upon successful cloning
            }
        } catch (error) {
            console.error('Failed to accept the mission:', error);
            alert('Failed to accept the mission');
        }
        // Implement acceptance logic, potentially calling an API
    };

    const handleReject = async () => {
        console.log("Rejecting mission...");
        try {
            console.log("selectedAp", selectedApRequest.missionId.data.toString());
            const response = await api.post('/apRequests/reject-request', { missionId:bufferToUUIDString(selectedApRequest.missionId.data), warriorId:selectedApRequest.warriorId, apId:selectedApRequest.apId });
            if (response.status === 201) {
                onClose(); // Optionally close the dialog upon successful cloning
            }
        } catch (error) {
            console.error('Failed to reject the mission:', error);
            alert('Failed to reject the mission');
        }
        // Implement rejection logic, potentially calling an API
    };

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="mission-dialog-title" maxWidth="md" fullWidth>
            <DialogTitle id="mission-dialog-title">{mission.missionName}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Objective: {mission.missionObjective}
                </DialogContentText>
                <DialogContentText>
                    Category: {mission.missionCategory}
                </DialogContentText>
                <DialogContentText>
                    Status: {mission.status}
                </DialogContentText>
                <DialogContentText>
                    Start Date: {new Date(mission.startDate).toLocaleDateString()}
                </DialogContentText>
                <DialogContentText>
                    Expectation from AP: {mission.expectationFromAp}
                </DialogContentText>
                <TableContainer component={Paper}>
                    <Table aria-label="tasks table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Task Title</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right">Expected Completion</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mission.tasks && mission.tasks.map((task, index) => (
                                <TableRow key={task._id}>
                                    <TableCell component="th" scope="row">
                                        {task.taskTitle}
                                    </TableCell>
                                    <TableCell align="right">{task.taskStatus}</TableCell>
                                    <TableCell align="right">
                                        {new Date(task.expectedCompletionDate).toLocaleDateString()}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
                {showAcceptReject && (
                    <>
                        <Button onClick={handleAccept} color="primary">
                            Accept
                        </Button>
                        <Button onClick={handleReject} color="secondary">
                            Reject
                        </Button>
                    </>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default WarriorMissionDetailsDialog;
