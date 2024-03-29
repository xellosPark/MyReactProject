import React, { useState } from 'react';
import Slider from './Slider/Slider';
import Sliderbar from './Sliderbar/Sliderbar';
import StepIndicator from './StepIndicator/StepIndicator';
import StepNavigator from './StepNavigator/StepNavigator';
import StepProgress from './StepProgress/StepProgress';
import StepStepMain from './Stepstepbar/StepStepMain';
const App = () => {
  return (
    <div>
      <Slider/>
      <Sliderbar/>
      <StepProgress/>
      <StepStepMain/>
      <StepNavigator/> 
      <StepIndicator/>
      
    </div>
  );
};

export default App;
