import React from 'react';
import serverData from '../data/serverNavData.js';
import '../Styles/Navbar.css'
const serverList = (props) =>{

    return (
        <div className='serverListDropDown'>
            <h1 className='serverDropBtn'>Servers</h1>
            {
            serverData.ftbServers.map((ftb, idx)=>{
                return (
                    <div className='serverCard-content' key={idx}>
                        <h2>{ftb.modPack}</h2>
                        <ul onClick={props.copyValue} value={ftb.serverIP} id={ftb.serverIP}>{ftb.serverIP}</ul>
                        <a href={ftb.packAddress[1]} target="_blank" rel="noopener noreferrer" >{ftb.packAddress[0]}</a>
                    </div>)
                })
            }
        </div>
    )
}

export default serverList;