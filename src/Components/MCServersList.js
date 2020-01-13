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
    else if (this.props.mcCardIdShow !== prevProps.mcCardIdShow) {
      this.setState({serverTab: null})
    }
  }

  serverTabSelect = (e)  => {this.setState({serverTab: e.target.getAttribute('id')})}

  
  renderMCServerCards = () =>{
    if(this.props.mcCardIdShow === null){
      return null

    }else{

      const mcServerCard = this.state.data.find(ftb => ftb.server === this.props.mcCardIdShow)
      // let pingData = this.props.serverPingList === null ? null : this.props.serverPingList.filter(pingData => pingData.server === ftb.server)
      return <MCServerCard 
                id={mcServerCard.server} 
                serverInfo={mcServerCard}
                // serverPing={pingData}
                serverTab={this.state.serverTab}
                serverTabSelect={this.serverTabSelect}
                copyToClipboard={this.props.copyToClipboard}/>
    }
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


