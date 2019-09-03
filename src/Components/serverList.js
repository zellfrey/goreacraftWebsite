import React from 'react';
import serverData from '../data/serverNavData.js';

const serverList = () =>{

    return (
        <div className='serverList'>
            <h1>Servers</h1>
            {
            serverData.ftbServers.map((ftb, idx)=>{
                return (
                    <div className='serverCard' key={idx}>
                        <h2>{ftb.modPack}</h2>
                        <ul>{ftb.serverIP}</ul>
                        <a href={ftb.packAddress[1]} target="_blank" rel="noopener noreferrer" >{ftb.packAddress[0]}</a>
                    </div>)
                })
            }
        </div>
    )
}

export default serverList;