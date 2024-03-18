import React from 'react';
import './Slat.css'; // Assuming you have a CSS file named Slat.css
import { Link } from 'react-router-dom';

const Slat = ({ date, projectName, link, projectDescription }) => {
  return (
    <Link to={link}>
        <div className="slat">
            <div className="date">{date}</div>
            <div className="spacer"></div>
            <div className="project-info">
                <div className="project-name">{projectName}</div>
                <div className="project-description">{projectDescription}</div>
            </div>
        </div>
    </Link>
  );
};

export default Slat;