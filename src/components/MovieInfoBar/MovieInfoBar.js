import React from 'react'
import FontAwesom from 'react-fontawesome'

import './MovieInfoBar.css'
import {calcTime, convertMoney} from "../../utils/helpers";
import PropTypes from "prop-types";

const MovieInfoBar = ({time, budget, revenue}) => {
  return(
    <div className="rmdb-movieinfobar">
      <div className="rmdb-movieinfobar-content">
        <div className="rmdb-movieinfobar-content-col">
          <FontAwesom className="fa-time" name="clock-0" size="2x"/>
          <span className="rmdb-movieinfobar-info">Running time: {calcTime(time)}</span>
        </div>
        <div className="rmdb-movieinfobar-content-col">
          <FontAwesom className="fa-budget" name="money" size="2x" />
          <span className="rmdb-movieinfobar-info">Budget: {convertMoney(budget)}</span>
        </div>
         <div className="rmdb-movieinfobar-content-col">
          <FontAwesom className="fa-revenue" name="ticket" size="2x" />
          <span className="rmdb-movieinfobar-info">Revenue: {convertMoney(revenue)}</span>
        </div>
      </div>
    </div>
  )
};

MovieInfoBar.propTypes = {
  time: PropTypes.number,
  budget: PropTypes.number,
  revenue: PropTypes.number
};

export default MovieInfoBar
