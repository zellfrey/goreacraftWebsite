import React from 'react';
import VotingList from './Components/votingList.js'
import ServerList from './Components/serverList.js'
import HomePage from './Components/homePage.js'

var userName = 'https://api.minetools.eu/profile/ec1375dca6fc42f8ba3e4ebf4614de4c';
var statInfinity = 'https://api.minetools.eu/query/infinity.goreacraft.com/25567';
var statUltimate = 'https://api.minetools.eu/query/145.239.6.135/25577';

//https://api.minetools.eu/

export default class App extends React.Component{

  constructor(){
    super();
    this.state={
      page: '',
      userMC: null,
      infinityPing: null,
      ultimatePing: null,
    }
  }

  componentDidMount() {
      fetch(userName).then(resp => resp.json()).then(status => this.setState({userMC: status}))
      fetch(statInfinity).then(resp => resp.json()).then(serverState => this.setState({infinityPing: serverState}))
      fetch(statUltimate).then(resp => resp.json()).then(serverState => this.setState({ultimatePing: serverState}))
  }
  
  
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
          {this.getInfinity}
      </div>
    </div>
    );
  }
}


