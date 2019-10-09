import React from 'react';
import ServerRules from './ServerRules.js'


export default class ServerWiki extends React.Component{

  constructor(props){
    super(props);
    this.state={
    }
  }

  render(){
    return (
    <div >
        <h1>Wiki</h1>
        <ServerRules/>
    </div>
    );
  }
}


