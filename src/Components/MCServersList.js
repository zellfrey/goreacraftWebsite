import React from 'react';
import MCServerCard from './MCServerComponents/MCServerCard.js'


export default class MCServersList extends React.Component{

  constructor(props){
    super(props);
    this.state={
      data: this.props.mcData
    }
  }

  renderMCServerCards = () =>{
    const mcServerCards = this.state.data.map((ftb, idx)=>{
      return <MCServerCard key={idx} id={ftb.server} serverInfo={ftb}/>
    })
    return mcServerCards
  }

  render(){
    return (
    <div >
        <h1>ServerList</h1>
        {this.renderMCServerCards()}
    </div>
    );
  }
}


