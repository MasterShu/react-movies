import React from 'react'
import './Navigation.css'
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const Navigation = ({movie}) => {
  return (
    <div className="rmdb-navigation">
      <div className="rmdb-navigation-content">
        <Link to="/">
          <p>Home</p>
        </Link>
        <p>/</p>
        <p>{movie}</p>
      </div>
    </div>
  )
};

Navigation.propTypes = {
  movie: PropTypes.string
};

export default Navigation
