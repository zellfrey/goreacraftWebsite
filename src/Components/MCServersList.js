import React from 'react';
import MCServerCard from './MCServerComponents/MCServerCard.js'


export default class MCServersList extends React.Component{

  constructor(props){
    super(props);
    this.state={
      Data: this.props.mcData
    }
  }

  renderMCServerCards = () =>{
    
  }

  render(){
    return (
    <div >
        <h1>ServerList</h1>
        <MCServerCard/>
    </div>
    );
  }
}


