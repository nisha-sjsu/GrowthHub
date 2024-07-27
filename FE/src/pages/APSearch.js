// Updated APSearchPage component
import React, { useState, useEffect } from 'react';
import {Container, Grid, Select, MenuItem, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import APCard from '../components/ap_search/APCard';
import MissionPopup from '../components/ap_search/MissionPopup';
import { fetchApi } from '../utils/api';
import { categories } from '../config';

// const categories = ['Self-Care', 'Career', 'Study']; // Example categories

const APSearchPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [aps, setAps] = useState([]);
  const [filteredAps, setFilteredAps] = useState([]);
  const [selectedAP, setSelectedAP] = useState(null);
  const [missionPopupOpen, setMissionPopupOpen] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [selectedMission, setSelectedMission] = useState('');
  const [filteredMissions, setFilteredMissions] = useState([]);
  const [missions, setMissions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchApi('/apRequests/ap-profile');
        if (response.ok) {
          const json = await response.json();
          setAps(json.data);
          setFilteredAps(json.data); // Initially, all APs are shown
        } else if (response.status === 401) {
          console.error('Unauthorized. Token may be invalid or expired.');
          // Handle authorization errors (perhaps by showing an error message)
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const fetchMissions = async () => {
      try {
        const response = await fetchApi('/missions/created-missions');
        if (response.ok) {
          const missions = await response.json();
          
          setMissions(missions);
          if (missions && Array.isArray(missions)) {
          setFilteredMissions(missions.filter(mission => mission.Mission.assignedAPId==""));
          
          }
          else {
            console.error('Invalid data format:', missions);
          }
        } else if (response.status === 401) {
          console.error('Unauthorized. Token may be invalid or expired.');
          // Handle authorization errors (perhaps by showing an error message)
        }
      } catch (error) {
        console.error('Error fetching missions:', error);
      }
    };

    fetchData();
    fetchMissions();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = aps.filter(ap => ap.interests.includes(selectedCategory));
      setFilteredAps(filtered);
    } else {
      setFilteredAps(aps); // If no category is selected, show all APs
    }
  }, [selectedCategory, aps]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  
  const handleOpenMissionPopup = (ap) => {
    setSelectedAP(ap);
    setMissionPopupOpen(true);
  };
  const handleCloseMissionPopup = () => {
    setMissionPopupOpen(false);
  };

  // const handleMissionChange = (mission) => {
  //   setSelectedMission(mission);
  // };

  const handleSendRequest = (selectedMission) => {
    // Logic for sending request
    console.log(`Sending request for mission: ${selectedMission} to AP: ${selectedAP.name}`);
    // After sending the request, setRequestSent(true) to show success message
    setRequestSent(true);
    setSelectedMission(selectedMission);
  };

  return (
    <Container>
      <Select
        value={selectedCategory}
        onChange={handleCategoryChange}
        
        displayEmpty
        fullWidth
        style={{ marginBottom: '20px' }}
      >
        <MenuItem value="">All Categories</MenuItem>
        {categories.map((category, index) => (
          <MenuItem key={index} value={category}>{category}</MenuItem>
        ))}
      </Select>

      <Grid container spacing={2}>
        {filteredAps.map((ap) => (
          <Grid item xs={12} sm={6} md={4} key={ap._id}>
            <APCard ap={ap} onSendRequest={handleOpenMissionPopup} /> {/* Pass the handler function */}
          </Grid>
        ))}
      </Grid>
      <MissionPopup
        selectedAP={selectedAP}
        open={missionPopupOpen}
        onClose={handleCloseMissionPopup}
        onSendRequest={handleSendRequest}
        missions={filteredMissions}
        // selectedMission={selectedMission} // Pass the selectedMission state
        // onMissionChange={handleMissionChange} // Pass the handleMissionChange functio
      />
      {/* Success message dialog */}
      <Dialog open={requestSent} onClose={() => setRequestSent(false)}>
        <DialogTitle>Request Sent</DialogTitle>
        <DialogContent>
          <Typography>Request has been sent successfully.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRequestSent(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default APSearchPage;
