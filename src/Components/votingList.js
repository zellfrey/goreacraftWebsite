import React from 'react';
import '../Styles/MainNavBar.css'


const VotingList = (props) =>{

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
        <li><a href="#">Vote</a>
            <ul>
            {
            props.mcData.map((ftb, idx)=>{
                return ftb.navData.visible ? (
                <li key={idx}>
                    <a href="#">{ftb.navData.modPack}</a>
                    <ul>
                        <li><a href={ftb.navData.voteLinks[0]} target="_blank" rel="noopener noreferrer" >{getHostName(ftb.navData.voteLinks[0])}</a></li>
                        <li><a href={ftb.navData.voteLinks[1]} target="_blank" rel="noopener noreferrer" >{getHostName(ftb.navData.voteLinks[1])}</a></li>
                    </ul>
                </li>
                ) : null;
            })
            }
            </ul>
        </li>
    )
}

export default VotingList;

// <li><a href="#">VoteLayout</a>
//                     <ul>
//                         <li><a href="#">{ftb[0].modPack}</a>
//                         <ul>
//                             <li><a href={ftb[0].voteLinks[0]} target="_blank" rel="noopener noreferrer" >{ftb[0].voteLinks[0]}</a></li>
//                             <li><a href={ftb[0].voteLinks[1]} target="_blank" rel="noopener noreferrer" >{ftb[0].voteLinks[1]}</a></li>
//                         </ul>
//                         </li>
//                         <li><a href="#">{ftb[1].modPack}</a>
//                         <ul>
//                             <li><a href={ftb[1].voteLinks[0]} target="_blank" rel="noopener noreferrer" >{ftb[1].voteLinks[0]}</a></li>
//                             <li><a href={ftb[1].voteLinks[1]} target="_blank" rel="noopener noreferrer" >{ftb[1].voteLinks[1]}</a></li>
//                         </ul>
//                         </li>  
//                     </ul>
//                 </li>