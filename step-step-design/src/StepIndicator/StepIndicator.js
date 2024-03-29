import React, { useState } from 'react';
import './StepIndicator.css';

const steps = [
  { label: 'step 1', icon: '✓' },
  { label: 'step 2', icon: '✓' },
  { label: 'step 3', icon: '3' },
  { label: 'step 4', icon: '4' },
];

function StepIndicator() {
  const [currentStep, setCurrentStep] = useState(0);

  const isStepCompleted = (stepIndex) => stepIndex < currentStep;
  const isCurrentStep = (stepIndex) => stepIndex === currentStep;

  const goBack = () => setCurrentStep((prev) => (prev > 0 ? prev - 1 : 0));
  const goNext = () => setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));

  return (
    <div className="step-indicator-container">
      <div className="steps">
        {steps.map((step, index) => (
          <div key={index} className={`step ${isCurrentStep(index) ? 'current' : ''}`}>
            <div className={`step-icon ${isStepCompleted(index) ? 'completed' : ''}`}>
              {isStepCompleted(index) ? step.icon : index + 1}
            </div>
            <div className="step-label">{step.label}</div>
            {index !== steps.length - 1 && <div className="step-line"></div>}
          </div>
        ))}
      </div>
      <div className="buttons-container">
        <button onClick={goBack} disabled={currentStep === 0}>Back</button>
        <button onClick={goNext} disabled={currentStep === steps.length - 1}>Next</button>
      </div>
    </div>
  );
}

export default StepIndicator;