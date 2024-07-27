import React, { useState, useEffect } from 'react';
import api from '../utils/api';

import MissionCreationIntro from '../components/mission_creation/MissionCreationIntro';
import MissionInputStep1 from '../components/mission_creation/MissionInputStep1';
import MissionInputStep2 from '../components/mission_creation/MissionInputStep2';
import MissionInputStep3 from '../components/mission_creation/MissionInputStep3';
import MissionInputStep4 from '../components/mission_creation/MissionInputStep4';
import MissionCreationComplete from '../components/mission_creation/MissionCreationComplete';

const MissionCreationPage = () => {
  const [step, setStep] = useState(0);
  const [missionData, setMissionData] = useState({});
  const authToken = 'eyJraWQiOiJscVJ5b1RXMHR2RXdyUkpndmI1Y0hlMFpmNDM2Y0ZVUGQ1Y25ORDRmYk5nPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIwNmM0NWUxMS1lNTc2LTQwZjMtYjIzYS04YWEwYzk4YjU5MzYiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9CUWdPNWkyUkoiLCJjbGllbnRfaWQiOiI3MjJwdDBya25rZzBwMDBmbWwwN2pocWpqdSIsIm9yaWdpbl9qdGkiOiI3MzFhMDhjOS1lNzFmLTRjMjktODk4Mi05MDZhZWE3YzcwNTgiLCJldmVudF9pZCI6IjRjZWY4ODhkLWRmOGUtNDcyNy1hYTFmLTU0MjEyNDNmMTA0NyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3MTQ4NzAzMjAsImV4cCI6MTcxNDg3MzkyMCwiaWF0IjoxNzE0ODcwMzIwLCJqdGkiOiIzYmUwNzFhYS00OGVhLTQ2ZWItOTM4OS0wODQ2YWJhZTVlYjUiLCJ1c2VybmFtZSI6Imdyb3d3d3cifQ.wAeDbG1CxYyn2QUIT0FNVIhNfrqpvejbU-WIDkCC3aN7KHWnLRGtWr_3QOM9HyYiiCVLJSbZnVqa9rGTc-bERTKWN7tkTQ_KeX4_D7_Hsnf1zivOxfpDm_-EuhQTs0Z2wNrRiVn1kHztC4118UFBGw74f5P0YREYSJdjtAG9gJ0LfN-ke4oWbQvf5BGSsN6zOOhfck2Fvb4jfZccxIIPTa9m70DIkWAfeLqjoMbGevPPnwBmJGLEAjpGtscw76BPkzhYDd4f7gkYbgiegIHrvxnTFM6tl0zaDvqTg35b6-rh5Sc5P8_KFmR7a3rwdc8V_cPkg9LCU6qjonbVyj6avA'
  
  useEffect(() => {
    console.log('Step:', step);
  }, [missionData]);

  const handlePreviousStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  }
  
  const handleNextStep = async (data) => {
    const newMissionData = { ...missionData, ...data };
    setMissionData(newMissionData);

    if (step < 4) {
      setStep(step + 1);
      console.log(step, missionData);
    } else {
      console.log("step 5", missionData)
      try {
        const createMissionResponse = await api.post('/missions/mission', newMissionData);
        
        const { missionId } = createMissionResponse.data;

        await api.post('/apRequests/ap-request',
          {
            apId: newMissionData.selectedAP,
            missionId: missionId,
            expectationFromAp: newMissionData.expectationFromAp,
          }
        );
        console.log('Mission created successfully:', createMissionResponse.data);
        setStep(step + 1);
      } catch (error) {
        console.error('Error creating mission:', error);
      }
    }
  };

  /*
  const handleNextStep = async (data) => {
    if (step === 0) {
      setStep(step + 1);
    } else if (step == 1) {
      setStep(step + 1);
      setMissionData({ ...missionData, missionName: data.title, missionObjective: data.missionObjective });
    } else if (step == 2) {
      setStep(step + 1);
      setMissionData({ ...missionData, startDate: data.startDate, endDate: data.endDate, publicMission: data.publicMission, missionCategory: data.category });
    } else if (step == 3) {
      setStep(step + 1);
      setMissionData({ ...missionData, tasks: data });
    } else if (step == 4) {
      try {
        const updatedMissionData = {
          ...missionData,
          expectationFromAp: data.expectationFromAp,
          selectedAP: data.selectedAP
        };
        console.log('Updated Mission Data:', updatedMissionData);

        const createMissionResponse = await axios.post(
          'http://localhost:3001/missions/mission',
          updatedMissionData,
          {
            headers: {
              token: authToken,
            },
          }
        );
        const { missionId } = createMissionResponse.data;

        await axios.post(
          'http://localhost:3001/apRequests/ap-request',
          {
            apId: updatedMissionData.selectedAP,
            missionId: missionId,
            expectationFromAp: updatedMissionData.expectationFromAp,
          },
          {
            headers: {
              token: authToken,
            },
          }
        );

        console.log('Mission created and request sent to AP successfully.');
        setStep(step + 1);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  }
  */

  return (
    <div>
      {step === 0 && <MissionCreationIntro onNext={() => handleNextStep({})} onBack={handlePreviousStep} />}
      {step === 1 && <MissionInputStep1 data={missionData} onNext={handleNextStep} onBack={handlePreviousStep} />}
      {step === 2 && <MissionInputStep2 data={missionData} onNext={handleNextStep} onBack={handlePreviousStep} />}
      {step === 3 && <MissionInputStep3 data={missionData} onNext={handleNextStep} onBack={handlePreviousStep} />}
      {step === 4 && <MissionInputStep4 data={missionData} onNext={handleNextStep} onBack={handlePreviousStep} />}
      {step === 5 && <MissionCreationComplete />}
      {/* Render additional steps as needed */}
    </div>
  );
};

export default MissionCreationPage;
