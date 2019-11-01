const CLI_TXT = require ('./converterTextHelp.js');
const fs = require('fs')
const yaml = require('js-yaml');
const path = require('path');
const ServerDataFldr = "../MCServerData/";
const COLOUR_CODE_CHECK = /&[0-9A-z]/g
const RULE_NO_CHECK = /[1-9]?[0-9][.]/g

let serverDirList

let serverDataJSON = []

function cliInputCheck(args){
    if(args.length !== 3){
        console.log(CLI_TXT.invalidCmd)
        process.exit(9);
    }
    cmdCheck(args[2])
}
function cmdCheck(cmd){
    switch(cmd) {
        case "h":
        case "help":
            console.log(CLI_TXT.help)
            process.exit(0);
            break;
        case "start":
        case "s":
            console.log(CLI_TXT.start)
            searchServerFolder()
            break;
        case "docs":
        case "d":
            console.log(CLI_TXT.docs)
            process.exit(0);
            break;
        default:
            console.log('not a valid command')
            process.exit(0)
      }
}

//Search ServerDataFldr
function searchServerFolder(){
    serverDirList =  fs.readdirSync(ServerDataFldr)
    .filter((dir) => fs.lstatSync(path.join(ServerDataFldr, dir)).isDirectory());

    serverDirList.map(dir =>console.log(`Found ${dir} directory, adding to list`))

    return serverDirList
};

function scanEachServer(directoryList){
    console.log("\n----Scanning server directories----\n")

    directoryList.forEach(function(dir){
        let directoryObj = {server: dir, files: null}

        directoryObj.files = fs.readdirSync(dir).filter((file) => fs.lstatSync(path.join(dir, file)).isFile());
        
        console.log("Found " + directoryObj.files.length + ` in ${dir} folder.`)
        
        serverDataJSON.push(directoryObj)
        
    })
    return serverDataJSON
}

function loadFilesFromServerDirectory(serverData){
    console.log("\n----Moving to file loading within server directories----\n")

    serverData.forEach(function(dir){

            dir.navData = dir.files.includes('navData.yml') ? 
                        yaml.safeLoad(fs.readFileSync(`./${dir.server}/navData.yml`, {encoding: 'utf-8'})) 
                        : null

            if(dir.navData){
                console.log(`./${dir.server}/navData.yml was found. Continuing to read other files`)

                dir.rules = dir.files.includes('rules.txt') ? 
                            fs.readFileSync(`./${dir.server}/` +'rules.txt', {encoding: 'utf-8'})
                            : null
    
                dir.bannedItems = dir.files.includes('Restrict List.yml') ? 
                            yaml.safeLoad(fs.readFileSync(`./${dir.server}/Restrict List.yml`, {encoding: 'utf-8'})) 
                            : null
    
                dir.serverStaff = dir.files.includes('users.yml') ? yaml.safeLoad(fs.readFileSync(`./${dir.server}/users.yml`, {encoding: 'utf-8'})) 
                            : null
            }
            else{
                console.log(`./${dir.server}/navData.yml was not found. Server data will not be added to list`)
            }
    })
    return serverData
}

function convertEachFileFromServer(serverFiles){
    console.log("\n----Converting files to JSON format----\n")

    for(let i = 0; i < serverFiles.length; i ++){
        if(serverFiles[i].navData){

            console.log(`navData file exists in ${serverFiles[i].server} folder. Continuing with conversion`)

            //final check for rules file
            if(serverFiles[i].rules){
                console.log(`Rules file exists in ${serverFiles[i].server} folder. Converting...`)

                serverFiles[i].rules = convertRulesToArray(serverFiles[i].rules)
            }
            else{
                console.log(`Rules file does not exist in ${serverFiles[i].server} folder. Continuing with conversion`)
            }
            //final check for Restrict List file
            if(serverFiles[i].bannedItems){
                console.log(`Restrict List exists in ${serverFiles[i].server} folder. Converting...`)

                serverFiles[i].bannedItems = convertBannedItemsToObjects(serverFiles[i].bannedItems)
            }
            else{
                console.log(`Restrict List file does not exist in ${serverFiles[i].server} folder. Continuing with conversion`)
            }

            if(serverFiles[i].serverStaff){
                console.log(`Users file exists in ${serverFiles[i].server} folder. Converting...`)

                serverFiles[i].serverStaff = convertUsersToStaffArray(serverFiles[i].serverStaff)
            }
            else{
                console.log(`Users file does not exist in ${serverFiles[i].server} folder. Continuing with conversion`)
            }
            //delete file names array
            console.log(`Completed file conversion for ${serverFiles[i].server}.\nRemoving file names array from ${serverFiles[i].server} object\n`)
            delete serverFiles[i].files
            
        }else{
            console.log(`navData file does NOT exist in ${serverFiles[i].server} folder. Removing from list`)
        }

    }
    return serverFiles
}

// server rules conversion to Array
function convertRulesToArray(rulesFile){
    let rulesArray = [];
    let dataArray = rulesFile.split('\n').map(str => str.replace(COLOUR_CODE_CHECK, ''))
   
    let rulesOnlyList = dataArray.filter(line => line.match(RULE_NO_CHECK))

    rulesOnlyList.map(rule =>{
        let dotIndex = rule.indexOf('.')
        
        if(rule.includes('\r')){
            rulesArray.push(rule.slice(dotIndex+2,-1))
        }else{
            rulesArray.push(rule.slice(dotIndex+2))
        }
     })
    return rulesArray
}
//server banneditems conversion to JSON
function convertBannedItemsToObjects(bannedItemsFile){

    let bannedItemsArray = []
    let itemsArray = Object.keys(bannedItemsFile)
    for(let i = 0; i < itemsArray.length; i++){

        let bItemObject = {}
        //removes example items from list
        if(bannedItemsFile[itemsArray[i]] !== bannedItemsFile.DEFAULT_VALUES){

            //checks whether an items is creative or used just for display(which is most likely creative)
            if(!bannedItemsFile[itemsArray[i]].Name.toLowerCase().includes("creative") && !bannedItemsFile[itemsArray[i]].Name.toLowerCase().match(COLOUR_CODE_CHECK)){

                bItemObject.name = `${bannedItemsFile[itemsArray[i]].Name}`

                //is item banned?
                if(bannedItemsFile[itemsArray[i]]["Restrict Level"] === "BAN"){
                    bItemObject.restrictLvl = "Global Ban"

                    //outlier cases checking for reason, gives clarity to user
                    if(bannedItemsFile[itemsArray[i]]["Mini Reason"]){
                        bItemObject.reason = bannedItemsFile[itemsArray[i]]["Mini Reason"].replace(COLOUR_CODE_CHECK, "")
                    }
                }

                //is item world restricted?
                else if(bannedItemsFile[itemsArray[i]]["Restrict Level"] === "RESTRICT"){
                    bItemObject.restrictLvl = "Disabled in Overworld"

                    //outlier cases checking for reason, gives clarity to user
                    if(bannedItemsFile[itemsArray[i]]["Count Block"]){
                        bItemObject.limit = bannedItemsFile[itemsArray[i]].Limit
                    }
                }
                //is item limited?
                else if(bannedItemsFile[itemsArray[i]]["Count Block"]){
                    bItemObject.restrictLvl = "Limited Placement"
                    bItemObject.limit = bannedItemsFile[itemsArray[i]].Limit
                }
                //does it bypass towny?
                else if(bannedItemsFile[itemsArray[i]]["Check Towny"]){
                    bItemObject.restrictLvl = "Towny Bypass"

                }
                bannedItemsArray.push(bItemObject)
            }
        }
    }
    return bannedItemsArray
}
//server users file conversion to staff Object List
function convertUsersToStaffArray(usersFile){
    const staffRanks = ["Helper", "Mod", "SrMod", "Admin", "Headmin"]
    let staffList = {
        "Helper":[],
        "Mod":[],
        "SrMod":[],
        "Admin":[],
        "Head Admin":null,
        }

    for(const user in usersFile.users){
        if(usersFile.users[user].info && usersFile.users[user].info.suffix){
            let playerName = usersFile.users[user].lastname
            let playerRank = usersFile.users[user].info.suffix.replace(COLOUR_CODE_CHECK, "").slice(1,-1)
            
            if(playerRank.length > 0){

                switch(staffRanks.findIndex(rank => rank.startsWith(playerRank))){

                    //index number corresponds to staff rank. 0 -> 10
                    case 0:
                        staffList["Helper"].push(playerName)
                        break;
                    case 1:
                        staffList["Mod"].push(playerName)
                        break;
                    case 2:
                        staffList["SrMod"].push(playerName)
                        break;
                    case 3:
                        staffList["Admin"].push(playerName)
                        break;
                    case 4:
                        staffList["Head Admin"] = playerName
                        break;
                    default:        
                        console.log(`no staff rank found for ${playerRank}`)
                        break;
                }
                        
            }

        }

    }
    return staffList
}

function writeServerDataToJSONFile(serverData){
    //filter serverData if navData does not exist
    let filteredData = serverData.filter(ser => ser.navData != null)

    fs.writeFileSync('../MCServerData/mcServerData.json', JSON.stringify(filteredData, null, '\t'), 'utf8', function(){
        if(error) throw error;
        console.log('successfully converted to JSON format')
    })
}
cliInputCheck(process.argv)

scanEachServer(serverDirList)
loadFilesFromServerDirectory(serverDataJSON)
convertEachFileFromServer(serverDataJSON)
writeServerDataToJSONFile(serverDataJSON)


