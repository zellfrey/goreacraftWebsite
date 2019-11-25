import React from 'react';

const MCServerCardInfo = (props) =>{

    const getHostName = (url)  => {
        var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
        if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
        return match[2];
        }
        else {
            return null;
        }
    }

    const getPingData = (pingData) =>{
        if(pingData === null){
            return(
                <div className="mcServerPingInfo">
                    <li>Connecting to server</li>
                </div>
            )
        }
        else{
            return(
                <div className="mcServerPingInfo">
                    <li>{pingData[0].serverStatus}</li>
                    <li>{pingData[0].currentPlayerCount}/{pingData[0].maxPlayerCount}</li>
                </div>
                )     
        }
    }

    return (
        <div>
            <div>
                <div>
                    <li>Info</li>
                    <li>{props.navData.modPack}</li>
                    <img src="" alt="Modpack Image" height="42" width="42"></img>
                    {getPingData(props.pingData)}
                    <button onClick={props.copyValue} value={props.navData.serverIP} id={props.navData.serverIP}>{props.navData.serverIP}</button>
                </div>
                <div>
                    <li>{props.navData.packAddress[0]}</li>
                    <li>Download: <a href={props.navData.packAddress[1]} target="_blank" rel="noopener noreferrer" >{props.navData.packAddress[0]}</a></li>
                    <li><a href={props.navData.voteLinks[0]} target="_blank" rel="noopener noreferrer" >{getHostName(props.navData.voteLinks[0])}</a></li>
                    <li><a href={props.navData.voteLinks[1]} target="_blank" rel="noopener noreferrer" >{getHostName(props.navData.voteLinks[1])}</a></li>
                </div>
            </div>
            <div>
                <p>Some text about the server</p>
            </div>
        </div>
    )
}

export default MCServerCardInfo;

