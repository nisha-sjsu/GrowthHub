import React, { useState } from 'react';
import { Button, TextField, Typography, Paper, Grid, MenuItem, Select, FormControl, InputLabel } from '@material-ui/core';

const TaskInput = ({ onAddTask }) => {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskStartDate, setTaskStartDate] = useState('');
    const [taskEndDate, setTaskEndDate] = useState('');
    const [repetitionType, setRepetitionType] = useState('');

    const handleAddTask = () => {
        if (taskTitle && taskStartDate && taskEndDate && repetitionType) {
            onAddTask({ taskTitle, taskStartDate, taskEndDate, repetitionType });
            setTaskTitle('');
            setTaskStartDate('');
            setTaskEndDate('');
            setRepetitionType('');
        }
    };

    return (
        <Paper style={{ padding: '20px', textAlign: 'center', width: '800px' }}>
            <Typography variant="h5" gutterBottom>
                Add Task
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                    <TextField
                        label="Task Title"
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Start Date"
                        type="date"
                        value={taskStartDate}
                        onChange={(e) => setTaskStartDate(e.target.value)}
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="End Date"
                        type="date"
                        value={taskEndDate}
                        onChange={(e) => setTaskEndDate(e.target.value)}
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="repetition-type-label">Repetition Type</InputLabel>
                        <Select
                            labelId="repetition-type-label"
                            value={repetitionType}
                            onChange={(e) => setRepetitionType(e.target.value)}
                            label="Repetition Type"
                        >
                            <MenuItem value="Daily">Daily</MenuItem>
                            <MenuItem value="Alternate days">Alternate Days</MenuItem>
                            <MenuItem value="Weekly">Weekly</MenuItem>
                            <MenuItem value="Monthly">Monthly</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleAddTask}>
                        Add Task
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default TaskInput;
