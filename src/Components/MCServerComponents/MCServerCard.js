import React from 'react';
import MCServerCardInfo from './MCServerCardInfo'
import MCServerCardRestrictList from './MCServerCardRestrictList'
import MCServerCardRules from './MCServerCardRules'
import MCServerCardStaff from './MCServerCardStaff'

const MCServerCard = () =>{

    return (
        <div>
            <li>test</li>
            <MCServerCardInfo/>
            <MCServerCardRestrictList/>
            <MCServerCardRules/>
            <MCServerCardStaff/>
        </div>
    )
}

export default MCServerCard;

