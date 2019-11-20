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
                return (<MCServerCardInfo info={props.serverInfo.navData}/>)
            case "rules":
                return (<MCServerCardRules rules={props.serverInfo.rules}/>)
            case "bannedItems":
                return (<MCServerCardRestrictList bannedItems={props.serverInfo.bannedItems}/>)
            case "staff":
                return (<MCServerCardStaff staff={props.serverInfo.serverStaff}/>)
            default:
                return (<MCServerCardInfo info={props.serverInfo.navData}/>)
          }
    }

    return (
        <div>
            <MCServerCardTabSelect serverTabSelect={props.serverTabSelect}/>
            {renderSelectedTab()}
            {/* <MCServerCardInfo info={props.serverInfo.navData}/>
            <MCServerCardRules rules={props.serverInfo.rules}/>
            <MCServerCardRestrictList bannedItems={props.serverInfo.bannedItems}/>
            <MCServerCardStaff staff={props.serverInfo.serverStaff}/> */}
        </div>
    )
}

export default MCServerCard;

