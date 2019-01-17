import React from "react";
import icon from "../../img/icon-128.png"
import { hot } from "react-hot-loader";
import storage from "../storage";

class Selector extends React.Component {
    constructor(props) {
        super(props); 
        this.state = { options: [], selected: '' };
      }

    componentDidMount() {
        storage.getSettings((settings) => {
            fetch('http://localhost:83/regions.json')
                .then(response => {
                    return response.json();
                }).then(data => {
                console.log(JSON.stringify(settings));
                this.setState({
                    options: data,
                    selected: settings.ip
                });
            });
        });
    }

    createSelectItems() {
        let items = [];     
        items.push(<option key={0} value="None">None</option>);
                for (let i = 0; i < this.state.options.length; i++) { 
                    const option = this.state.options[i];
                    const selected = option.ip === this.state.selected;
                    items.push(<option key={i + 1} value={option.ip}>{option.name}</option>); 
                }
        return items;
    }  
  
   onDropdownSelected(e) {
       var index = e.nativeEvent.target.selectedIndex;
       var target = e.nativeEvent.target[index]
       let ip = (target.value).trim();                
       let region = (target.text).trim();
       console.log(ip);
       console.log(region);       
       storage.setSettings(ip, region);
       this.setState({
        selected: region
    });
   }

  render () {
    return (
        <div>
            <label htmlFor="region">Select Region</label>&nbsp;&nbsp;  
            
            <select type="select" name="region" onChange={this.onDropdownSelected} value={this.state.selected}>
            {this.createSelectItems()}
            </select>
        </div>
    )
  }
};

export default hot(module)(Selector)