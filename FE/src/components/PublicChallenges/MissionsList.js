import React from 'react';
import MissionCard from './MissionCard';

const MissionsList = ({ missions, onMissionClick, paginate, currentPage, totalPages }) => {
    return (
        <div>
            {missions.map(mission => (
                <MissionCard
                    key={mission.missionId}
                    mission={mission}
                    onClick={() => onMissionClick(mission)}
                />
            ))}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        style={{ margin: '0 5px', padding: '5px 10px', cursor: 'pointer', background: currentPage === index + 1 ? 'blue' : 'grey', color: 'white' }}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MissionsList;
