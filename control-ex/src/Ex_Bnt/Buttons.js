import React from 'react';
import './Buttons.css'; // Ensure you have the CSS file in the same directory

// A simple Button component that takes text and color as props
const Button = ({ text, color }) => (
  <button className={`button ${color.toLowerCase()}`}>{text}</button>
);

const Buttons = () => {
  // An array of button properties
  const buttonProps = [
    { text: 'Standard', color: 'Standard' },
    { text: 'Red', color: 'Red' },
    { text: 'Orange', color: 'Orange' },
    { text: 'Yellow', color: 'Yellow' },
    { text: 'Olive', color: 'Olive' },
    { text: 'Green', color: 'Green' },
    { text: 'Teal', color: 'Teal' },
    { text: 'Blue', color: 'Blue' },
    { text: 'Violet', color: 'Violet' },
    { text: 'Purple', color: 'Purple' },
    { text: 'Pink', color: 'Pink' },
    { text: 'Brown', color: 'Brown' },
    { text: 'Grey', color: 'Grey' },
    { text: 'Black', color: 'Black' },
  ];

  // Render a Button component for each item in the array
  return (
    <div className="button-container">
      {buttonProps.map((prop, index) => (
        <Button key={index} {...prop} />
      ))}
    </div>
  );
};

export default Buttons;