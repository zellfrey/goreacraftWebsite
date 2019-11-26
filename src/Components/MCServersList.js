import React from 'react';
import MCServerCard from './MCServerComponents/MCServerCard.js'


export default class MCServersList extends React.Component{

  constructor(props){
    super(props);
    this.state={
      data: this.props.mcData,
      serverTab: null,
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.serverPingList !== prevProps.serverPingList) {
      this.renderMCServerCards()
    }
  }

  serverTabSelect = (e)  => {this.setState({serverTab: e.target.getAttribute('id')})}

  renderMCServerCards = () =>{
    const mcServerCards = this.state.data.map((ftb, idx)=>{
        let pingData = this.props.serverPingList === null ? null : this.props.serverPingList.filter(pingData => pingData.server === ftb.server)

          return <MCServerCard 
                    key={idx} 
                    id={ftb.server} 
                    serverInfo={ftb}
                    serverPing={pingData}
                    serverTab={this.state.serverTab}
                    serverTabSelect={this.serverTabSelect}
                    copyToClipboard={this.props.copyToClipboard}/>
        
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


