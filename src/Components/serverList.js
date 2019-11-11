import React from 'react';

const ServerList = (props) =>{

    return (
        <li><a href="#">Servers</a>
            <ul>
            {
            props.mcData.map((ftb, idx)=>{
                return ftb.navData.visible ? (
                <li key={idx}>
                    <a href="#" onClick={props.getServerName}id={ftb.server}>{ftb.navData.modPack}</a>
                    <ul>
                        <li onClick={props.copyValue} value={ftb.navData.serverIP} id={ftb.navData.serverIP}>{ftb.navData.serverIP}</li>
                        <li><a href={ftb.navData.packAddress[1]} target="_blank" rel="noopener noreferrer" >{ftb.navData.packAddress[0]}</a></li>
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
