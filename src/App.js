import React from 'react';
import VotingList from './Components/votingList.js'
import ServerList from './Components/serverList.js'
import HomePage from './Components/homePage.js'
// import './Styles/Navbar.css'

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
          <ServerList copyValue={this.copyToClipboard}/>
          <VotingList/>
      <h2>Discord</h2>
          <iframe  title="discordFrame" src="https://discordapp.com/widget?id=226856884731248640&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0"></iframe>
      </div>
      
    </div>
    );
  }
}


// import React, { useState, useEffect } from 'react';
// import { VotingList, ServerList, HomePage } from './Components';
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
