import React from 'react';
import serverData from '../data/serverNavData.js';

const votingList = () =>{

    function getHostName(url) {
        var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
        if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
        return match[2];
        }
        else {
            return null;
        }
    }

    return (
        <div className='votingList'>
            <h1>Vote</h1>
            {
            serverData.ftbServers.map((ftb, idx)=>{
                return (
                    <div className='voteCard' key={idx}>
                        <h2>{ftb.modPack}</h2>
                        <a href={ftb.voteLinks[0]} target="_blank" rel="noopener noreferrer" >{getHostName(ftb.voteLinks[0])}</a>
                        <a href={ftb.voteLinks[1]} target="_blank" rel="noopener noreferrer" >{getHostName(ftb.voteLinks[1])}</a>
                    </div>)
                })
            }
        </div>
    )
}

export default votingList;