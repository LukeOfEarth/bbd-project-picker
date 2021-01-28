import React, { Component } from "react";

import '../../styles/footer.css';

export default class footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="footer-content">
        <h3>Created By BBD</h3>
         <ul>
              <li>Luke Van Aardt </li>
        
              <li>Gauri Patil</li>
       
              <li>Shimane Mthembu</li>
       
              <li>Vanitha Doddapuneni</li>
        </ul>
           
            
      
        </div>
        <div className="footer-bottom">
            &copy; BBD-Software Development | Designed By Project Pitcher Team
        </div>
      </div>
    ); 
  }
}
