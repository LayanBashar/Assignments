import React from 'react';
import AlertButton from './AlertButton';

const StudentCard = ({ name, grade }) => {
  const message = `Student: ${name} — Grade: ${grade}`;
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
      <h3>{name}</h3>
      <p>Grade: {grade}</p>
      <span>
        {grade >= 85 ? "🏅 Excellent Student" : "📘 Needs Improvement"}
      </span>
      <br />
      <AlertButton message={message} />
    </div>
  );
};

export default StudentCard;
