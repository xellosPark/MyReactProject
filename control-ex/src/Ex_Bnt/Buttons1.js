import React, { useState } from 'react';
import './Buttons1.css'; // Make sure to have this CSS file

const Button = ({ text, color, isSelected, onClick }) => (
  <button
    className={`button1 ${color.toLowerCase()} ${isSelected ? 'selected' : ''}`}
    onClick={onClick}
  >
    {text}
  </button>
);

const Buttons1 = () => {
  const [selectedButton, setSelectedButton] = useState(null);

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
  // Function to handle button click, setting the selected state
  const handleButtonClick = (color) => {
    setSelectedButton(color);
  };

  return (
    <div className="button-container">
      {buttonProps.map((prop) => (
        <Button
          key={prop.color}
          {...prop}
          isSelected={selectedButton === prop.color}
          onClick={() => handleButtonClick(prop.color)}
        />
      ))}
    </div>
  );
};

export default Buttons1;