import React from 'react';
const ServerRules = (props) =>{

    return (
        <div>
            Rules
            <div>
                <ul>{props.modPackRules[0].modPack}</ul>
                {props.modPackRules[0].rules.map((rl, idx)=>{
                    return(
                        <li key={idx}>{rl.num}{rl.desc}</li>)
                })}
            </div>
        </div>
    )
}

export default ServerRules;
