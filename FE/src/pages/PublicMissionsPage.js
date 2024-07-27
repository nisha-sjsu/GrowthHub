import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import CategoryFilter from '../components/PublicChallenges/CategoryFilter';
import MissionsList from '../components/PublicChallenges/MissionsList';
import MissionDetailsDialog from '../components/PublicChallenges/MissionDetailsDialog';
import { categories } from '../config'; // Assume categories are imported correctly

const PublicMissionsPage = () => {
    const [missions, setMissions] = useState([]);
    const [filteredMissions, setFilteredMissions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedMission, setSelectedMission] = useState(null);
    const missionsPerPage = 2;

    useEffect(() => {
        const fetchMissions = async () => {
            try {
                const { data } = await api.get('/missions/public-missions');
                setMissions(data.map(item => item.Mission));
                setFilteredMissions(data.map(item => item.Mission));
            } catch (error) {
                console.error('Failed to fetch missions:', error);
            }
        };

        fetchMissions();
    }, []);

    const handleCategoryChange = (selectedCategory) => {
        console.log(selectedCategory);
        console.log({missions});
        if (selectedCategory) {
            const filtered = missions.filter(mission => mission.missionCategory === selectedCategory);
            setFilteredMissions(filtered);
        } else {
            setFilteredMissions(missions);
        }
        setCurrentPage(1); // Reset to first page on filter change
    };

    const handleMissionClick = mission => {
        setSelectedMission(mission);
    };

    const handleCloseDialog = () => {
        setSelectedMission(null);
    };

    // Pagination logic
    const indexOfLastMission = currentPage * missionsPerPage;
    const indexOfFirstMission = indexOfLastMission - missionsPerPage;
    const currentMissions = filteredMissions.slice(indexOfFirstMission, indexOfLastMission);
    const totalPages = Math.ceil(filteredMissions.length / missionsPerPage);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div>
            <CategoryFilter categories={categories} onChange={handleCategoryChange} />
            <MissionsList 
                missions={currentMissions} 
                onMissionClick={handleMissionClick}
                paginate={paginate}
                currentPage={currentPage}
                totalPages={totalPages} 
            />
            {selectedMission && (
                <MissionDetailsDialog
                    mission={selectedMission}
                    open={Boolean(selectedMission)}
                    onClose={handleCloseDialog}
                />
            )}
        </div>
    );
};

export default PublicMissionsPage;
