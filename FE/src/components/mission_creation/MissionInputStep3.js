import React, { useState } from 'react';
import { Typography, Button, List, ListItem, ListItemText, Paper } from '@material-ui/core';
import TaskInput from '../TaskInput';
// import OpenAIPromptSender from '../OpenAIPromptSender';

const MissionInputStep3 = ({ onNext, onBack, data }) => {
    const [tasks, setTasks] = useState(data.tasks || []);

    const handleAddTask = (newTask) => {
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
    };

    const handleNext = () => {
        if (tasks.length > 0) { // Check if there is at least one task
            onNext({ tasks: tasks });
        }
    };

    const handleBack = () => {
        onBack();
    };

    const isNextButtonEnabled = tasks.length > 0; // Enable the Next button only if there are tasks

    return (
        <div style={{ padding: '20px', display: 'grid', justifyContent: 'center' }}>
            <TaskInput onAddTask={handleAddTask} />
            <Typography variant="h6">Tasks:</Typography>
            <List>
                {tasks.map((task, index) => (
                    <Paper key={index} style={{ marginBottom: '20px', padding: '10px' }}>
                        <ListItem>
                            <ListItemText
                                primary={task.taskTitle}
                                secondary={`Start: ${task.taskStartDate}, End: ${task.taskEndDate}, Repetition: ${task.repetitionType}`}
                            />
                        </ListItem>
                    </Paper>
                ))}
            </List>
            {/* <OpenAIPromptSender /> */}
            <div style={{ padding: '20px', textAlign: 'center', width: '800px' }}>
                <Button variant="contained" color="primary" onClick={handleNext} disabled={!isNextButtonEnabled} style={{ margin: '20px' }}>
                    Next
                </Button>
                <Button variant="contained" color="primary" onClick={handleBack} style={{ margin: '20px' }}>
                    Back
                </Button>
            </div>
        </div>
    );
};

export default MissionInputStep3;
