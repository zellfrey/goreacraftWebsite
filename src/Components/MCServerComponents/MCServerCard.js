import React from 'react';
import MCServerCardInfo from './MCServerCardInfo'
import MCServerCardRestrictList from './MCServerCardRestrictList'
import MCServerCardRules from './MCServerCardRules'
import MCServerCardStaff from './MCServerCardStaff'
import MCServerCardTabSelect from './MCServerCardTabSelect'


const MCServerCard = (props) =>{

    

    const renderSelectedTab = ()  => {
        switch(props.serverTab) {
            case "navData":
                return (<MCServerCardInfo navData={props.serverInfo.navData} copyValue={props.copyToClipboard} pingData={props.serverPing}/>)
            case "rules":
                return (<MCServerCardRules rules={props.serverInfo.rules}/>)
            case "bannedItems":
                return (<MCServerCardRestrictList bannedItems={props.serverInfo.bannedItems}/>)
            case "staff":
                return (<MCServerCardStaff staff={props.serverInfo.serverStaff}/>)
            default:
                return (<MCServerCardInfo navData={props.serverInfo.navData} copyValue={props.copyToClipboard} pingData={props.serverPing}/>)
          }
    }

    return (
        <div>
            <MCServerCardTabSelect serverTabSelect={props.serverTabSelect}/>
            {renderSelectedTab()}
        </div>
    )
}

export default MCServerCard;

