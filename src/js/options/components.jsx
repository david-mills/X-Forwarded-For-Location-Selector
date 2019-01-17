import React from "react";
import { hot } from "react-hot-loader";
import CheckBoxes from "./CheckBoxes.jsx";
import Selector from "./Selector.jsx";

class Components extends React.Component {
    constructor(props) {
        super(props); 
      }
    
  render () {
    return (
        <div><Selector/></div>
    )
  }
};

export default hot(module)(Components)