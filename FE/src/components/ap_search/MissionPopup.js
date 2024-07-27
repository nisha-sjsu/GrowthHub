import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Select, MenuItem } from '@material-ui/core';
import api from "../../utils/api";

const MissionPopup = ({ open, onClose, onSendRequest, missions, selectedAP }) => {
    const [selectedMission, setSelectedMission] = useState({
        missionId: '',
        missionName: '',
        expectationFromAP: ''
    });

    const handleMissionChange = (event) => {
        setSelectedMission({ missionId: event.currentTarget.getAttribute('missionId'), missionName: event.target.value, expectationFromAP: event.currentTarget.getAttribute('expectationFromAP') });
    };

    const handleSendRequest = async () => {
        try {
            const response = await api.post(
                '/apRequests/ap-request',
                {
                    apId: selectedAP.userId, // Use the AP ID from the selected AP object
                    missionId: selectedMission.missionId,
                    expectationFromAp: selectedMission.expectationFromAP, // Replace with the expectation
                }
            );

            // Call the onSendRequest function with the selectedMission
            onSendRequest(selectedMission);

            // Close the dialog
            onClose();

            // Log success message
            console.log('Request sent successfully:', response.data);
        } catch (error) {
            // Handle error: log the error and potentially display an error message to the user
            console.error('Error sending request:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle style={{
                'width': '398px',
                'text-align': 'center'
            }}>Select Mission</DialogTitle>
            <DialogContent>
                <Select value={selectedMission.missionName} onChange={handleMissionChange} fullWidth>
                    {missions.map((mission) => {
                        return (
                            <MenuItem key={mission.Mission.missionId} value={mission.Mission.missionName} missionId={mission.Mission.missionId} expectationFromAP={mission.Mission.expectationFromAp}>
                                {mission.Mission.missionName}
                            </MenuItem>
                        )
                    })}
                </Select>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSendRequest} color="primary">
                    Send
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default MissionPopup;
