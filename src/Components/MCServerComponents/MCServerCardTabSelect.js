import React from 'react';

const MCServerCardTabSelect = (props) =>{

    return (
        <div>
            <button id="navData" onClick={props.serverTabSelect}>Info</button>
            <button id="rules" onClick={props.serverTabSelect}>Rules</button>
            <button id="bannedItems" onClick={props.serverTabSelect}>Restrict List</button>
            <button id="staff" onClick={props.serverTabSelect}>Staff</button>
        </div>
    )
}

export default MCServerCardTabSelect;

