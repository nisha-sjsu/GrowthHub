import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from "../assets/images/logo.png";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Container from '@mui/material/Container';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Define the routes for your tabs here
  const routes = {
    '/public-challenges': 0,
    '/registration': 1,
    '/login': 2,
    '/help': 3,
  };

  const handleRouteChange = (event, newValue) => {
    const path = Object.keys(routes).find(key => routes[key] === newValue);
    navigate(path);
  };

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
            <Tab sx={{ color: '#fff' }} label="Challenges" />
            <Tab sx={{ color: '#fff' }} label="Signup" />
            <Tab sx={{ color: '#fff' }} label="Signin" />
            <Tab sx={{ color: '#fff' }} label="Help" />
          </Tabs>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;