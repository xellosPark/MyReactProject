import React from 'react';
import './ProfileCard.css'; // Make sure this path is correct for the CSS file

// Card component
const Card = ({ label, value, imageSrc, name }) => {
  return (
    <div className={`card ${name ? 'stat-card' : 'date-card'}`}>
      {imageSrc && <img src={imageSrc} alt={`Profile of ${name}`} className="profile-image" />}
      {label && <div className="label">{label}</div>}
      {value && <div className="value">{value}</div>}
      {name && <span className="star-icon">⭐</span>} {/* Conditional rendering of the star */}
    </div>
  );
};

// ProfileCard component that utilizes the Card component
const ProfileCard = () => {
  const imageSrc = 'path-to-kim-cheol-soo-image.jpg'; // Replace with the actual path to the image
  return (
    <div className="dashboard">
      <Card label="To Day" value="03.27" />
      <Card label="김철수" value="1" imageSrc={imageSrc} name="Kim Cheol-soo" />
      {/* ... You can add more Card components as needed with different props */}
    </div>
  );
};

export default ProfileCard;