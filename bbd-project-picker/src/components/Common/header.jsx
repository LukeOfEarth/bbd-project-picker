import React, { Component } from "react";

import '../../styles/header.css';

export default class header extends Component {
  render() {
    return (
      <div id="header">
          <img className="logo" src="/images/pm.png" alt="img"/>
               <h1 id="heading">Project Pitcher</h1>
              
      </div>
      
    ); 
  }
}
