import React from 'react';
import MCServerCard from './MCServerComponents/MCServerCard.js'


export default class MCServersList extends React.Component{

  constructor(props){
    super(props);
    this.state={
      data: this.props.mcData,
      serverTab: null
    }
  }

  serverTabSelect = (e)  => {this.setState({serverTab: e.target.getAttribute('id')})}

  renderMCServerCards = () =>{
    const mcServerCards = this.state.data.map((ftb, idx)=>{
      return <MCServerCard 
                key={idx} 
                id={ftb.server} 
                serverInfo={ftb}
                serverTab={this.state.serverTab}
                serverTabSelect={this.serverTabSelect}/>
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


