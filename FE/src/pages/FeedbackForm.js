import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import api from "../utils/api";

const FeedbackForm = () => {
    const [feedbackType, setFeedbackType] = useState('');
    const [message, setMessage] = useState('');

    const handleTypeChange = (event) => {
        setFeedbackType(event.target.value);
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSubmit = () => {
        // Simulate email sending
        alert(`Sending Feedback:\nType: ${feedbackType}\nMessage: ${message}\nTo: growthHub@gmail.com`);
        // In a real application, you would send this data to a server to process and send an email
    };

    // Determine if the button should be disabled
    const isSendDisabled = feedbackType === '' || message === '';

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', fontSize: '16px' }}>
            <FormControl fullWidth style={{ marginBottom: '30px' }}>
                <InputLabel id="feedback-type-label" style={{ fontSize: '20px' }}>Type of Help/Feedback</InputLabel>
                <Select
                    labelId="feedback-type-label"
                    id="feedback-type"
                    value={feedbackType}
                    onChange={handleTypeChange}
                    displayEmpty
                    style={{ backgroundColor: 'white', fontSize: '18px' }}
                >
                    <MenuItem value=""><em>Choose one of the following</em></MenuItem>
                    <MenuItem value="report a bug">Report a Bug</MenuItem>
                    <MenuItem value="request feature">Request Feature</MenuItem>
                    <MenuItem value="connect with customer care">Connect with Customer Care</MenuItem>
                    <MenuItem value="Unable to verify email">Unable to Verify Email</MenuItem>
                    <MenuItem value="All Other Queries">All Other Queries</MenuItem>
                </Select>
            </FormControl>
            <TextField
                label="Your Feedback"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                value={message}
                onChange={handleMessageChange}
                style={{ marginBottom: '30px', backgroundColor: 'white', fontSize: '18px' }}
            />
            <Button 
                variant="contained" 
                color="primary" 
                onClick={handleSubmit} 
                disabled={isSendDisabled} // Disable the button if conditions are not met
                style={{ fontSize: '18px', padding: '10px 20px' }}
            >
                Send
            </Button>
        </div>
    );
};

export default FeedbackForm;
