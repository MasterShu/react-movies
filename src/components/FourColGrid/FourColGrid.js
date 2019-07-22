import React from 'react'
import './FourColGrid.css'
import PropTypes from "prop-types";

const FourColGrid = (props) => {
  const renderElements = () => {
    return props.children.map((item, i) => {
      return (
        <div key={i} className="rmdb-grid-element">
          {item}
        </div>
      )
    })
  };
  
  return (
    <div className="rmdb-grid">
      {props.header && !props.loading ? <h1>{props.header}</h1> : null }
      <div className="rmdb-grid-content">
        {renderElements()}
      </div>
    </div>
  )
};

FourColGrid.prototype = {
  head: PropTypes.string,
  loading: PropTypes.bool.isRequired
};

export default FourColGrid
