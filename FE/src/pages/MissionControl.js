import React, { useState, useEffect } from 'react';
import AlarmIcon from '@mui/icons-material/Alarm';
import DoneIcon from '@mui/icons-material/Done';
import Tooltip from '@mui/material/Tooltip';
import {
    Container, Grid, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Typography, FormControl, Select, MenuItem
} from '@mui/material';
import UserProfileBlock from '../components/mission_control/UserProfileBlock';
import MissionDetailsCard from './../components//mission_control/MissionDetails';
import { MissionComments } from './../components//mission_control/CommentBlock';
import { aToken } from '../config';
import axios from 'axios';
import { getToken } from '../utils';
import { isEmpty } from 'lodash';

const token = aToken;
const styles = {
    paper: {
        padding: '20px',
        textAlign: 'center',
        color: 'white',
        marginBottom: '1rem'
    },
    late: {
        backgroundColor: 'red',
    },
    onTime: {
        backgroundColor: 'green',
    },
};

const headers = { 'token': getToken() };

const MissionControl = () => {
    const [selectedMission, setSelectedMission] = useState();
    const [tasks, setTasks] = useState([]);
    const [apName, setApName] = useState('');
    const [missions, setMissions] = useState([]);
    const [allTasks, setAllTasks] = useState({});
    const [completedTasks, setCompletedTasks] = useState(0);
    const [lateTasks, setLateTasks] = useState(0);
    const [userProfile, setUserProfile] = useState({});

    useEffect(() => {
        fetchUserProfile()
        getMissions()
        const { completedCount, lateCount } = calculateTaskStats(tasks);
        setCompletedTasks(completedCount);
        setLateTasks(lateCount);
    }, [selectedMission])

    const fetchUserProfile = async () => {
        try {
            const userResponse = await axios.get(`http://localhost:3001/users/user-profile`, { headers });
            setUserProfile(userResponse.data.user);
        } catch (error) {
            console.error('There was a problem fetching userProfile:', error);
        }
        console.log(userProfile)
    }

    const getMissions = async () => {
        const headers = new Headers({
            'token': token
        });
        try {
            const response = await fetch(`http://localhost:3001/missions/created-missions`, { headers });
            if (response.ok) {
                const data = await response.json();
                setMissions(data);
                data.forEach((missionData) => {
                    const { Mission } = missionData;
                    const { missionId, tasks } = Mission;
                    allTasks[missionId] = tasks;
                });
                setAllTasks(allTasks);
            }
        } catch (error) {
            // Handle error
            console.error('Failed to fetch Missions:', error);
        }
    }

    // Function to handle mission click
    const handleMissionClick = async (mission) => {
        if (!mission) {
            setSelectedMission(null);
            setTasks([]);
            return;
        }
        setSelectedMission(mission);
        setTasks(allTasks[mission.missionId] || []);
        const headers = new Headers({
            'token': token
        });
        try {
            const response = await fetch(`http://localhost:3001/users/user-profile/${mission.assignedAPId}`, { headers });
            if (response.ok) {
                const data = await response.json();
                setApName(data.data.name);
            } else {
                // Handle error
                console.error('Failed to fetch AP name');
            }
        } catch (error) {
            // Handle error
            console.error('Failed to fetch AP name:', error);
        }
    };

    const bufferToUUIDString = (taskId) => {
        const bytes = taskId.data;
        const byteToHex = (byte) => byte.toString(16).padStart(2, '0');
        const byteToString = (start, end) => bytes.slice(start, end).map(byteToHex).join('');
        return `${byteToString(0, 4)}-${byteToString(4, 6)}-${byteToString(6, 8)}-${byteToString(8, 10)}-${byteToString(10, 16)}`;
    };

    const handleStatusChange = async (taskId, status) => {
        const taskIdString = bufferToUUIDString(taskId)
        // Find the index of the task in the tasks array
        const taskIndex = tasks.findIndex(task => task.taskId === taskId);

        if (taskIndex !== -1) {
            // Create a copy of tasks array to avoid mutating state directly
            const updatedTasks = [...tasks];

            // Update the status of the task
            updatedTasks[taskIndex] = {
                ...updatedTasks[taskIndex],
                taskStatus: status
            };

            // Update state with the modified tasks array
            setTasks(updatedTasks);
        }
        try {
            const headers = new Headers({
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'token': token
            });
            // Make a fetch request to update the task status
            const response = await fetch(`http://localhost:3001/missions/task/${taskIdString}`, {
                method: 'PATCH',
                headers: headers,
                body: JSON.stringify({
                    taskStatus: status,
                    completionDate: status === 'completed' ? new Date().toISOString() : null
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update task status');
            }
        } catch (error) {
            console.error('Error updating task status:', error);
            // Handle error
        }
    };

    // Function to calculate status color
    const calculateStatusColor = (expectedEndDate, completionDate, status) => {
        const currentDate = new Date();
        const expectedEnd = new Date(expectedEndDate);
        const completion = new Date(completionDate);
        if ((status === 'in-progress' && expectedEnd < currentDate) || (status === 'completed' && expectedEnd < completion)) {
            return styles.late;
        } else if (status === 'completed') {
            return styles.onTime;
        } else {
            return styles.default;
        }
    };

    const calculateTaskStats = (tasks) => {
        let completedCount = 0;
        let lateCount = 0;

        const currentDate = new Date();

        tasks.forEach((task) => {
            const expectedEnd = new Date(task.expectedCompletionDate);
            const completion = task.completionDate ? new Date(task.completionDate) : null;

            if (task.taskStatus === 'completed' && (!completion || expectedEnd < completion)) {
                lateCount++;
            } else if (task.taskStatus === 'completed') {
                completedCount++;
            }
        });
        return { completedCount, lateCount };
    };

    return (
        <>
           { true &&
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <Paper style={styles.paper}>
                            {/* User Profile Section */}
                            {!isEmpty(userProfile) && <UserProfileBlock userProfile={userProfile} />}
                        </Paper>
                    </Grid>

                    <Grid container item xs={12} spacing={3}>
                        <Grid item xs={3}>
                            {/* Mission List */}
                            <TableContainer component={Paper} style={styles.paper}>
                                <Table style={styles.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell onClick={() => handleMissionClick()}>Missions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {missions.map((mission) => (
                                            <TableRow key={mission.Mission.missionId} hover onClick={() => handleMissionClick(mission.Mission)}>
                                                <TableCell component="th" scope="row">{mission.Mission.missionName}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>


                        <Grid item xs={6}>
                            {/* Task List for Selected Mission */}
                            <TableContainer component={Paper} style={styles.paper}>
                                <Typography variant="h6">{selectedMission ? `Tasks for ${selectedMission.missionName}` : 'Select a mission to view tasks'}</Typography>
                                {selectedMission && (
                                    <Table style={styles.table} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Description</TableCell>
                                                <TableCell>Complete By</TableCell>
                                                <TableCell>Status</TableCell>
                                                <TableCell>Mark Status</TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {tasks.map((task) => (
                                                <TableRow key={task.taskId} style={calculateStatusColor(task.expectedCompletionDate, new Date(), task.taskStatus)}>
                                                    <TableCell>{task.taskTitle}</TableCell>
                                                    <TableCell>{task.expectedCompletionDate.split('T')[0]}</TableCell>
                                                    <TableCell>{task.taskStatus}</TableCell>
                                                    <TableCell>
                                                        <FormControl variant="standard" sx={{ minWidth: 120 }}>
                                                            <Select
                                                                value={task.taskStatus}
                                                                onChange={(e) => handleStatusChange(task.taskId, e.target.value)}
                                                            >
                                                                <MenuItem value="in-progress">In Progress</MenuItem>
                                                                <MenuItem value="completed">Completed</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Tooltip title="Late">
                                                            <span>
                                                                {calculateStatusColor(task.expectedCompletionDate, new Date(), task.taskStatus) === styles.late && (
                                                                    <AlarmIcon />
                                                                )}
                                                            </span>
                                                        </Tooltip>
                                                        <Tooltip title="Completed on time">
                                                            <span>
                                                                {calculateStatusColor(task.expectedCompletionDate, new Date(), task.taskStatus) === styles.onTime && (
                                                                    <DoneIcon />
                                                                )}
                                                            </span>
                                                        </Tooltip>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                )}
                            </TableContainer>
                        </Grid>
                        <Grid item xs={3}>
                            {selectedMission && <MissionDetailsCard mission={selectedMission} ap={apName}
                                completedTasks={completedTasks} lateTasks={lateTasks} />}
                            {selectedMission && <MissionComments selectedMission={selectedMission} setSelectedMission={setSelectedMission} />}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
}
        </>
    );
};

export default MissionControl;
