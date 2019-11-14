import React from 'react';
const ServerRules = (props) =>{

    return (
        <div>
            Rules
            <div>
                {props.modPackRules.map((rl, idx)=>{
                    return(
                        <li key={idx}>{idx+1}. {rl}</li>)
                })}
            </div>
        </div>
    )
}

export default ServerRules;
