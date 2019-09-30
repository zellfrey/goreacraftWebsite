import React from 'react';
import serverData from '../data/serverNavData.js';
const ServerList = (props) =>{

    return (
        <li><a href="#">Servers</a>
            <ul>
            {
            serverData.ftbServers.map((ftb, idx)=>{
                return ftb.visible ? (
                <li key={idx}><a href="#">{ftb.modPack}</a>
                    <ul>
                        <li onClick={props.copyValue} value={ftb.serverIP} id={ftb.serverIP}>{ftb.serverIP}</li>
                        <li><a href={ftb.packAddress[1]} target="_blank" rel="noopener noreferrer" >{ftb.packAddress[0]}</a></li>
                    </ul>
                </li>
                ) : null;
            })
            }
            </ul>
        </li> 
    )
}

export default ServerList;
