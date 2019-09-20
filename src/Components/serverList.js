import React from 'react';
import serverData from '../data/serverNavData.js';
import '../Styles/Navbar.css'
const ServerList = (props) =>{

    return (
        <div className='votingNav'>
            <h2>Servers</h2>
            {
            serverData.ftbServers.map((ftb, idx)=>{
                return ftb.visible ? (
                    <ul className='voteCard' key={idx}>
                        <li>{ftb.modPack}
                        <ul id='serverInfo'>
                            <li onClick={props.copyValue} value={ftb.serverIP} id={ftb.serverIP}>{ftb.serverIP}</li>
                            <li><a href={ftb.packAddress[1]} target="_blank" rel="noopener noreferrer" >{ftb.packAddress[0]}</a></li>
                        </ul>
                        </li>
                    </ul>) : null
                })
            }
        </div>
    )
}

export default ServerList;
