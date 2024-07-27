import React, { useState } from 'react';
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

  const handlePreviousStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleNextStep = async (data) => {
    const newMissionData = { ...missionData, ...data };
    setMissionData(newMissionData);

    if (step < 4) {
      setStep(step + 1);
      console.log(step, missionData);
    } else {
      console.log("step 5", missionData)
      try {
        const response = await api.post('/missions/mission', newMissionData);
        console.log('Mission created successfully:', response.data);
        setStep(step + 1);
      } catch (error) {
        console.error('Error creating mission:', error);
      }
    }
  };

  return (
    <div>
      {step === 0 && <MissionCreationIntro onNext={() => handleNextStep({})} onBack={handlePreviousStep} />}
      {step === 1 && <MissionInputStep1 data={missionData} onNext={handleNextStep} onBack={handlePreviousStep} />}
      {step === 2 && <MissionInputStep2 data={missionData} onNext={handleNextStep} onBack={handlePreviousStep} />}
      {step === 3 && <MissionInputStep3 data={missionData} onNext={handleNextStep} onBack={handlePreviousStep} />}
      {step === 4 && <MissionInputStep4 data={missionData} onNext={handleNextStep} onBack={handlePreviousStep} />}
      {step === 5 && <MissionCreationComplete />}
    </div>
  );
};

export default MissionCreationPage;
