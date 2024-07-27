import { Search } from "@mui/icons-material";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from '../components/NavBarWithoutLogin';
import Image from "../components/Image";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';

const HomeContainer = () => {
    const navigate = useNavigate();
    const signup = () => {
        navigate('/registration');
    }

    const login = () => {
        navigate('/login');
    }

    return (
        <>
            <NavBar></NavBar>
            <Container>
                <Grid container my={6}>
                    <Grid item xs={6} textAlign='initial' px={2} >
                        <Typography variant="h4" py={2} style={{ wordSpacing: '8px', fontWeight: 'bold' }} >
                            Grow Your Discipline, Achieve Your Goals, Stay Accountable
                        </Typography>
                        <Typography py={2} style={{ wordSpacing: '8px', fontWeight: 'bold' }} lineHeight={2}>
                            Enhance your discipline with the support of an accountability partner through GrowthHub.</Typography>
                        <Typography style={{ wordSpacing: '8px', fontWeight: 'bold' }} lineHeight={2}>
                            Set your goals, track your progress, and connect with like-minded individuals to stay accountable and achieve success with GrowthHub.</Typography>
                        <Typography py={2} style={{ wordSpacing: '8px', fontWeight: 'bold' }} lineHeight={2}>
                            Stay focused and committed to your goals by partnering with others on GrowthHub, where you can share progress, provide encouragement, and celebrate achievements together.</Typography>
                        <Typography py={2} style={{ wordSpacing: '8px', fontWeight: 'bold' }} lineHeight={2}>
                            Empower yourself to reach your full potential with GrowthHub - set clear objectives, find supportive peers, and maintain accountability for a disciplined and productive lifestyle.
                        </Typography>

                    </Grid>
                    <Grid item xs={6} px={2} display='flex' alignItems='center' paddingLeft={20}>
                        <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
                            <ListItem>
                                <Button variant="outlined" onClick={signup}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <WorkIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Register" secondary="Join the Community" />
                                </Button>
                            </ListItem>
                            <ListItem style={{ marginTop: '36px' }}>
                                <Button variant="outlined" onClick={login}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FollowTheSignsIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="login" secondary="Already a member" />
                                </Button>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </Container>
            <Footer />

        </>
    );
}

export default HomeContainer;