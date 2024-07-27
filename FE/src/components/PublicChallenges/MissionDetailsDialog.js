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

const MissionDetailsDialog = ({ mission, open, onClose, onClone }) => {
    const handleCloningMission = async (mission) => {
        console.log(mission);

        try {
            const response = await api.post('/missions/clone', { mission });
            if (response.status === 201) {
                alert('Mission cloned successfully!');
                onClose(); // Optionally close the dialog upon successful cloning
            }
        } catch (error) {
            console.error('Failed to clone the mission:', error);
            alert('Failed to clone the mission');
        }
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
                            {mission?.tasks?.map((task, index) => (
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
                <Button onClick={() => handleCloningMission(mission)} color="secondary">
                    Clone Mission
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default MissionDetailsDialog;
