import React from 'react';

const MCServerCardRules = (props) =>{

    return (
        <div>
            Rules
            <div>
                {props.rules.map((rl, idx)=>{
                    return(
                        <li key={idx}>{idx+1}. {rl}</li>)
                })}
            </div>
        </div>
    )
}

export default MCServerCardRules;

