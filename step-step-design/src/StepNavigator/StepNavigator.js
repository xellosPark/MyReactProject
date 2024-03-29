import React, { useState } from 'react';
import './StepNavigator.css';

const steps = [
  { label: 'Cart' },
  { label: 'Delivery Address' },
  { label: 'Order Summary' },
  { label: 'Payment Method' },
  { label: 'Track' },
];

function StepNavigator() {
  const [currentStep, setCurrentStep] = useState(0);

  const goBack = () => setCurrentStep((prev) => (prev > 0 ? prev - 1 : 0));
  const goNext = () => setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));

  return (
    <div className="step-navigator">
      <ul className="step-indicator-container">
        {steps.map((step, index) => (
          <li key={index} className={`step ${index <= currentStep ? 'active' : ''}`}>
            <div className="step-content">
              <div className="step-number">{index + 1}</div>
              <div className="step-label">{step.label}</div>
            </div>
            {index < steps.length - 1 && <div className="line"></div>}
          </li>
        ))}
      </ul>
      <div className="navigation-buttons">
        <button onClick={goBack} disabled={currentStep === 0}>
          Back
        </button>
        <button onClick={goNext} disabled={currentStep === steps.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
}

export default StepNavigator;