import React from 'react';
import VotingList from './Components/votingList.js'
import ServerList from './Components/serverList.js'
import HomePage from './Components/homePage.js'



export default class App extends React.Component{
  render(){
    return (
      <div>
        <div className="navBarleft">
          <h1>Gallery</h1>
          <h1>Staff</h1>
          <h1>Wiki</h1>
        </div>
          <div>
            <HomePage/>
          </div>
        <div className="navBarRight">
          <ServerList/>
          <VotingList/>
          <h1>Discord</h1>
      </div>
    </div>
    );
  }
}


