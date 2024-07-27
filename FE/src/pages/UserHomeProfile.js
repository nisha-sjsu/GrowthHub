import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, InputLabel, Select, MenuItem, Switch, FormControlLabel, FormGroup, Typography, Collapse, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import api from "../utils/api";
import axios from 'axios';
import { aToken } from '../config';
import { categories } from '../config';

const UserHomeProfile = ({ userProfile, open, onClose }) => {
    const [formData, setFormData] = useState({
        name: userProfile.name,
        email: userProfile.email,
        age: userProfile.age,
        gender: userProfile.gender,
        interests: userProfile.interests,
        apActive: userProfile.apActive,
        apOfMissions: userProfile.apOfMissions,
        educationHistory: userProfile.educationHistory || '',
        careerHistory: userProfile.careerHistory || '',
    });
    const [warriorMissionName, setWarriorMissionName] = useState([]);
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleChange = (event) => {
        const { name, value, checked, type } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // const handleSave = async () => {
    //     // TODO save data
    //     console.log("Saving data...", formData);
    //     try {
    //         const requestBody = {
    //             comments: [
    //                 {
    //                     userId: "assignedAPId",
    //                     comment: "newComment"
    //                 }
    //             ]
    //         };
    //         const headers = { 'token': aToken };
    //         const response = await axios.patch('http://localhost:3001/missions/mission/fakeId', requestBody, { headers });
    //         console.log("Save successful:", response.data);
    //         onClose(); // Close the dialog after save
    //     } catch (error) {
    //         console.error("Error saving user data:", error);
    //         alert('Failed to save changes.'); // Provide user feedback
    //     }
    // };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>User Profile</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Name"
                    type="text"
                    fullWidth
                    value={formData.name}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    margin="dense"
                    label="Email"
                    type="email"
                    fullWidth
                    value={formData.email}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    margin="dense"
                    label="Age"
                    type="number"
                    fullWidth
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel id="gender-label">Gender</InputLabel>
                    <Select
                        labelId="gender-label"
                        name="gender"
                        value={formData.gender}
                        label="Gender"
                        onChange={handleChange}
                    >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="dense">
                    <InputLabel id="interests-label">Interests</InputLabel>
                    <Select
                        labelId="interests-label"
                        name="interests"
                        multiple
                        value={formData.interests}
                        onChange={handleChange}
                        renderValue={(selected) => selected.join(', ')}
                    >
                        {categories.map((category) => (
                            <MenuItem key={category} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    margin="dense"
                    label="Education History"
                    type="text"
                    fullWidth
                    multiline
                    name="educationHistory"
                    value={formData.educationHistory}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Career History"
                    type="text"
                    fullWidth
                    multiline
                    name="careerHistory"
                    value={formData.careerHistory}
                    onChange={handleChange}
                />
                <FormGroup>
                    <FormControlLabel
                        control={<Switch checked={formData.apActive} onChange={handleChange} name="apActive" />}
                        label="Active as AP"
                    />
                </FormGroup>
                <IconButton
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                    <Typography>View AP Missions</Typography>
                </IconButton>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Typography paragraph>Warrior Missions:</Typography>
                    {formData.apOfMissions.map((mission, index) => (
                        <Typography key={index} paragraph>{mission}</Typography>
                    ))}
                </Collapse>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Cancel</Button>
                {/* <Button onClick={handleSave} color="primary">Save</Button> */}
            </DialogActions>
        </Dialog>
    );
};

export default UserHomeProfile;
