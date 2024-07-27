import React, { useState } from 'react';
import { Avatar, Grid, Typography, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import UserHomeProfile from '../../pages/UserHomeProfile';
import { aToken } from '../../config';
import axios from 'axios';

const styles = {
    profileSection: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1rem',
        justifyContent: 'space-between', // To ensure the settings icon is on the right
    },
    avatar: {
        marginRight: '1rem',
        background: 'purple', // Example avatar color
    },
    userInfo: {
        flexGrow: 1, // Ensures the user info takes the necessary space
        textAlign: 'left',
    },
    settingsIcon: {
        color: 'gray', // Style for the settings icon button
    }
};

const UserProfileBlock = ({ userProfile }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Grid container style={styles.profileSection}>
            <Grid item>
                <Avatar style={styles.avatar}>{userProfile.name[0]}</Avatar>
            </Grid>
            <Grid item xs style={styles.userInfo}>
                <Typography variant="subtitle1">{userProfile.name}</Typography>
                <Typography variant="body2">{userProfile.email}</Typography>
            </Grid>
            <Grid item>
                <IconButton onClick={handleOpen} style={styles.settingsIcon}>
                    <SettingsIcon />
                </IconButton>
            </Grid>
            <UserHomeProfile open={open} onClose={handleClose} userProfile={userProfile} />
        </Grid>
    );
};

export default UserProfileBlock;
