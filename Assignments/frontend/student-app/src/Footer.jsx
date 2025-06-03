import React from 'react';

const Footer = ({ total }) => {
  return (
    <footer style={{ marginTop: "20px", borderTop: "1px solid #ddd", paddingTop: "10px" }}>
      Total Students: {total}
    </footer>
  );
};

export default Footer;
