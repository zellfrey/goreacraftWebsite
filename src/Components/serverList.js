import React from 'react';
import serverData from '../data/serverNavData.js';

export default class serverList extends React.Component{

    constructor(){
        super();
        this.state={
          list: false,
        }
      }

    dropDownServerList = (e) =>{
            this.setState({list: !this.state.list})
    }

    renderServerInfoCards = () =>{
       const serverInfoCards =  serverData.ftbServers.map((ftb)=>{
                return (
                    <div className='serverCard'>
                        <h2>{ftb.modPack}</h2>
                        <ul>{ftb.serverIP}</ul>
                        <a href={ftb.packAddress[1]} target="_blank" rel="noopener noreferrer" >{ftb.packAddress[0]}</a>
                    </div>)
        })
        return serverInfoCards
    }
    render(){
      return (
        <div className='serverList'>
            <h1>Servers</h1>
            {this.renderServerInfoCards()}
        </div>
      );
    }
  }