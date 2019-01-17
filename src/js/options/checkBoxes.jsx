import React from "react";
import { hot } from "react-hot-loader";
import storage from "../storage";

class CheckBoxes extends React.Component {
    constructor(props) {
        super(props); 
        this.state = { sessionChkbox: false, localChkbox: false, cookiesChkbox: false};
      }
    
    updateStorage(){        
        storage.setOptions(this.state);
    }
    componentDidMount() {
        storage.getOptions((settings) => {
            console.log("getOptions: " + JSON.stringify(settings));
            this.setState({
                sessionChkbox: settings.sessionChkbox,
                localChkbox: settings.localChkbox,
                cookiesChkbox: settings.cookiesChkbox
            });
        });
    }
    handleSessionChange(e) {     
       this.setState({
        sessionChkbox: !this.state.sessionChkbox
        }, this.updateStorage);     
   }

   handleLocalChange(e) {   
     this.setState({
        localChkbox: !this.state.localChkbox
        }, this.updateStorage);  
    }

    handleCookieChange(e) {     
        this.setState({
            cookiesChkbox: !this.state.cookiesChkbox
        }, this.updateStorage);    
    }
  render () {
    return (
        <div>
            <h4>On Change Options</h4>
            <div>
            <input type="checkbox" name="session" checked={this.state.sessionChkbox} onChange={this.handleSessionChange.bind(this)} />
            <label htmlFor="session">Clear Session Storage</label>&nbsp;                
            </div>
            <div>
                <input type="checkbox" name="local" checked={this.state.localChkbox} onChange={this.handleLocalChange.bind(this)} />
                <label htmlFor="local">Clear Local Storage</label>&nbsp;                
            </div>
            <div>
            <input type="checkbox" name="cookies" checked={this.state.cookiesChkbox} onChange={this.handleCookieChange.bind(this)} />                
                <label htmlFor="cookies">Clear Cookies</label>&nbsp;                
            </div>
        </div>
    )
  }
};

export default hot(module)(CheckBoxes)