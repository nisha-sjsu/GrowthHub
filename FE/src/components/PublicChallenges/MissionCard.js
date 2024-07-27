import React from 'react';
import { Card, CardContent, Typography, CardActionArea } from '@material-ui/core';

const MissionCard = ({ mission, onClick }) => {
    return (
        <Card style={{ margin: '20px', maxWidth: 345 }}>
            <CardActionArea onClick={() => onClick(mission)}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {mission.missionName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {mission.missionObjective}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default MissionCard;
