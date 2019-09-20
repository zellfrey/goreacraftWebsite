import React from 'react';
import serverData from '../data/serverNavData.js';
import '../Styles/Navbar.css'


const VotingList = () =>{

    const getHostName = (url)  => {
        var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
        if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
        return match[2];
        }
        else {
            return null;
        }
    }

    return (
        <div className='votingNav'>
            <h2>Vote</h2>
            {
            serverData.ftbServers.map((ftb, idx)=>{
                return (
                    <ul className='voteCard' key={idx}>
                        <li>{ftb.modPack}
                        <ul id='serverInfo'>
                            <li><a href={ftb.voteLinks[0]} target="_blank" rel="noopener noreferrer" >{getHostName(ftb.voteLinks[0])}</a></li>
                            <li><a href={ftb.voteLinks[1]} target="_blank" rel="noopener noreferrer" >{getHostName(ftb.voteLinks[1])}</a></li>
                        </ul>
                        </li>  
                    </ul>)
                })
            }  
        </div>
    )
}

export default VotingList;

