import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from "../assets/images/logo.png";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import useAuth from '../hooks/useAuth';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, logout } = useAuth();

  // Define the routes for your tabs here
  const routes = {
    '/mission-control': 0,
    '/mission-creation': 1,
    '/ap-search': 2,
    '/public-challenges': 3,
    '/my-warriors': 4,
    '/help': 5,
  };

  const handleRouteChange = (event, newValue) => {
    const path = Object.keys(routes).find(key => routes[key] === newValue);
    navigate(path);
  };

  const onLogout = () => {
    logout();
    navigate('/login');
  }

  // Determine the current tab index based on the current route
  const currentTabIndex = routes[location.pathname] || false;

  return (
    <AppBar position="static" sx={{ backgroundColor: '#000', color: '#fff' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div></div>
          <img
            src={Logo}
            alt="Logo"
            style={{ marginRight: '10px', cursor: 'pointer', width: '30px', height: '30px' }}
            onClick={() => navigate('/')}
          />
          <Typography
            variant="h6"
            noWrap
            component="div"
            onClick={() => navigate('/')}
            sx={{ flexGrow: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            GrowthHub
          </Typography>
          <Tabs value={currentTabIndex} onChange={handleRouteChange} aria-label="Navigation Tabs" sx={{ marginLeft: '24px', flexGrow: 1 }}>
            <Tab sx={{ color: '#fff' }} label="Mission Control" />
            <Tab sx={{ color: '#fff' }} label="Mission Creation" />
            <Tab sx={{ color: '#fff' }} label="Find AP" />
            <Tab sx={{ color: '#fff' }} label="Challenges" />
            <Tab sx={{ color: '#fff' }} label="My Warriors" />
            <Tab sx={{ color: '#fff' }} label="Help" />
          </Tabs>
          <Button variant="text" onClick={onLogout}> Logout</Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;