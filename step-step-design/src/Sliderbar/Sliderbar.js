import React, { useState } from 'react';

const steps = [
  { name: 'Select campaign settings', id: 1 },
  { name: 'Create an ad group', id: 2 },
  { name: 'Create an ad', id: 3 },
];

const Sliderbar = () => {
  const [activeStep, setActiveStep] = useState(1); // Starting at step 1

  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '20px' }}>
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '15px',
                backgroundColor: activeStep === step.id ? 'blue' : 'grey',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
              }}
            >
              {step.id}
            </div>
            <div style={{ width: '150px', textAlign: 'center' }}>{step.name}</div>
          </div>
          {index < steps.length - 1 && (
            <div
              style={{
                flex: '1',
                height: '2px',
                backgroundColor: activeStep > step.id ? 'blue' : 'grey',
              }}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Sliderbar;