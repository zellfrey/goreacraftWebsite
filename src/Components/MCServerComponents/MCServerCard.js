import React from 'react';
import MCServerCardInfo from './MCServerCardInfo'
import MCServerCardRestrictList from './MCServerCardRestrictList'
import MCServerCardRules from './MCServerCardRules'
import MCServerCardStaff from './MCServerCardStaff'

const MCServerCard = (props) =>{

    return (
        <div>
            <li>test</li>
            <MCServerCardInfo info={props.serverInfo.navData}/>
            <MCServerCardRules rules={props.serverInfo.rules}/>
            <MCServerCardRestrictList bannedItems={props.serverInfo.bannedItems}/>
            <MCServerCardStaff staff={props.serverInfo.serverStaff}/>
        </div>
    )
}

export default MCServerCard;

