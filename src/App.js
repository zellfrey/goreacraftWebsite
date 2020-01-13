import React from 'react';
import { VotingList, ServerNavList, HomePage, MCServersList } from './Components';
import DiscordWidget from './Components/DiscordWidget.js';
import './Styles/MainNavBar.css';
import articlesData from './data/dummyArticleData.js';
import serverData from './data/MCServerData/mcServerData.json';

var userName = 'https://api.minetools.eu/profile/ec1375dca6fc42f8ba3e4ebf4614de4c';
const PLAYER_STAT_SERVER = 'https://api.minetools.eu/query/145.239.6.135/';

//https://api.minetools.eu/

export default class App extends React.Component{

  constructor(){
    super();
    this.state={
      pageShow: null,
      mcCardId: null,
      userMC: null,
      serverPingList: null,
      mcServerData: serverData,
      articlesArray: articlesData.articles.filter(a => a.visible === true),
    }
  }

  componentDidMount() {
      fetch(userName).then(resp => resp.json()).then(status => this.setState({userMC: status}))
      this.addServerPingToServerData(serverData)
  }


  fetchServerPing = (serverID,portNum) =>{
    let serverPing={
      server: serverID,
      currentPlayerCount: 0,
      maxPlayerCount: 0,
      serverStatus: null
    }
    fetch(PLAYER_STAT_SERVER+portNum).then(resp =>resp.json())
              .then(serverState=>{
                serverPing.currentPlayerCount = serverState.Players
                serverPing.maxPlayerCount = serverState.MaxPlayers
                serverPing.serverStatus = serverState.status
              }) 
    return serverPing
  }

  addServerPingToServerData = (data) =>{
    let serverPingArray = []
    data.map(ftb =>{serverPingArray.push(this.fetchServerPing(ftb.server,ftb.navData.port))})
    return this.setState({serverPingList: serverPingArray})
  }

  copyToClipboard = (e) => {
    // Clear any current selection
    console.log(e.target.getAttribute('id'))
    const selection = window.getSelection();
    selection.removeAllRanges();
    const ElementId = e.target.getAttribute('id')
    // Select paragraph
    const range = document.createRange();
    range.selectNodeContents(document.getElementById(ElementId));
    selection.addRange(range);
    try {
      document.execCommand('copy');
      alert(`${ElementId} copied to clipboard`);
    }
    catch (err) {
      alert('unable to copy text');
    }
  }

  getServerName = (e) =>{
    console.log(e.target.className, e.target.getAttribute('id'))
    
    const serverIDSelect = e.target.getAttribute('id')
    // this.setState(pageShow: )
    return this.setState({mcCardId: serverIDSelect})
    // return null
  }
  
  render(){
    return (
      <div>
        <div className="navBarleft">
          <h1>Gallery</h1>
          <h1>Donate</h1>
          <MCServersList 
            mcData={this.state.mcServerData} 
            copyToClipboard={this.copyToClipboard} 
            serverPingList={this.state.serverPingList}
            mcCardIdShow={this.state.mcCardId}/>
        </div>
          <div>
            <HomePage articles={this.state.articlesArray}/>
          </div>
          <nav>
            <ul className="nav">
            <ServerNavList copyValue={this.copyToClipboard} mcData={this.state.mcServerData} getServerName={this.getServerName}/>
            <VotingList mcData={this.state.mcServerData}/>
            <DiscordWidget/>
            </ul>
          </nav>
    </div>
    );
  }
}


// import React, { useState, useEffect } from 'react';
// import ServerData from './data/serverNavData';
// // import './Styles/Navbar.css'

// const userName = 'https://api.minetools.eu/profile/ec1375dca6fc42f8ba3e4ebf4614de4c';
// const statInfinity = 'https://api.minetools.eu/query/145.239.6.135/25567';
// const statUltimate = 'https://api.minetools.eu/query/145.239.6.135/25577';

// //https://api.minetools.eu/

// const copyToClipboard = e => {
//   // Clear any current selection
//   console.log(e.target.getAttribute('id'))
//   const selection = window.getSelection();
//   selection.removeAllRanges();
//   const ElementId = e.target.getAttribute('id')
//   // Select paragraph
//   const range = document.createRange();
//   range.selectNodeContents(document.getElementById(ElementId));
//   selection.addRange(range);
//   try {
//     document.execCommand('copy');
//     alert(`${ElementId} copied to clipboard`);
//   }
//   catch (err) {
//     alert('unable to copy text');
//   }
// }

// const App = () => {
//   const [page, setPage] = useState('');
//   const [userMC, setUserMc] = useState(null);
//   const [infinityPing, setInfinityPing] = useState(null);
//   const [ultimatePing, setUltimatePing] = useState(null);

//   useEffect(() => {
//     fetch(userName).then(resp => resp.json()).then(status => setUserMc(status));
//     fetch(statInfinity).then(resp => resp.json()).then(serverState => setInfinityPing(serverState));
//     fetch(statUltimate).then(resp => resp.json()).then(serverState => setUltimatePing(serverState));
//   }, []);

//     return (
//       <div>
        // <nav role="navigation">
        //   <ul>
        //     <li><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">One</a></li>
        //     <li><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Two</a>
        //       <ul class="dropdown">
        //         <li><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Sub-1</a></li> Discord hates me? oof
        //         <li><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Sub-2</a></li>
        //         <li><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Sub-3</a></li>
        //       </ul>
        //     </li>
        //      <li><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Three</a></li>
        //     </ul>
        // </nav>
//         <div className="navBarleft">
//           <h1>Gallery</h1>
//           <h1>Staff</h1>
//           <h1>Wiki</h1>
//         </div>
//           <div>
//             <HomePage/>
//           </div>
//         <div className="navBarRight">
//           <ServerList copyValue={copyToClipboard}/>
//           <VotingList/>
//       <h2>Discord</h2>
//           {/* <iframe  title="discordFrame" src="https://discordapp.com/widget?id=226856884731248640&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0"></iframe> */}
//       </div>      
//     </div>
//     );
//   }

// export default App;
