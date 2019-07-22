import React from 'react'
import './LoadMoreBtn.css'
import PropTypes from "prop-types";

const LoadMoreBtn = ({onclick, text}) => {
  return(
    <div className="rmdb-loadmorebtn" onClick={onclick}>
      <p>{text}</p>
    </div>
  )
};

LoadMoreBtn.propTypes = {
  onclick: PropTypes.func,
  text: PropTypes.string
};

export default LoadMoreBtn
