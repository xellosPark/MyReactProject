import React from 'react';
import './StepProgress.css'; // Make sure to create a CSS file with the name StepProgress.css



const StepProgress = () => {
  const steps = [
    {
      name: "Select master blaster campaign settings",
      icon: "✓",
      completed: true,
    },
    { name: "Create an ad group", icon: "2", current: true },
    { name: "Create an ad", icon: "3" },
  ];

  return (
    <div className="step-progress">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="step">
            <div
              className={`step-icon ${
                step.completed ? "completed" : step.current ? "current" : ""
              }`}
            >
              {step.icon}
            </div>
            <div className="step-text">{step.name}</div>
          </div>
          {index < steps.length - 1 && <div className="step-connector"></div>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepProgress;