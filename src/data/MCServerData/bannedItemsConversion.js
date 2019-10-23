const cliTxt = require ('./converterTextHelp.js');
const serverList = require('./serverNavData.js').ftbServers;
const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');
const ServerBannedItemsFldr = "./serverBannedItems/";

let serverBannedItemsData;
let bannedItemsData;


scanServerRulesFolder()
//Scan bannedItemsData find & keep only files--------------------------------
function scanServerRulesFolder(){
    serverBannedItemsData =  fs.readdirSync(ServerBannedItemsFldr)
    .filter((file) => fs.lstatSync(path.join(ServerBannedItemsFldr, file)).isFile());

    serverBannedItemsData.map(file=>console.log(`${file} == valid file`))

    return checkRelativeServer(serverBannedItemsData)
};

function checkRelativeServer (fileListArray){
    let txtList = []

    for(let i = 0; i < fileListArray.length; i++){
        let serverCheckString;
        if(fileListArray[i].includes("Restrict List")){
            serverCheckString = fileListArray[i].replace("Restrict List.yml","")

            if(serverList.find(ftb=> ftb.modPack.includes(serverCheckString))){
                console.log(`Found ${serverCheckString} in Server list.\nContinuing with conversion of ${fileListArray[i]}`)
                txtList.push(fileListArray[i])
            }
            else{
                console.log(`${serverCheckString} was not in Server list.\nSkipping conversion of ${fileListArray[i]}`)
            }
        }
    }
    if(txtList.length === 0){
        console.log(`There are no files that relate to the server list.\nPlease check the name of files.\nProgramme shutting down`)
        return process.exit(0)
    }else{
        console.log(`${txtList} files remaining. Moving to conversion`)

        return collectDataSet(txtList)
    }
}

//Collect/Scrape Text files----------------------
function collectDataSet(fileArray){
    console.log(`looping through data: ${fileArray}`)

    dataList = fileArray.map(file =>{
        let serverCheckString = file.replace("Restrict List.yml","")
        let relatedServer = serverList.find(ftb=> ftb.modPack.includes(serverCheckString))
        let serverBannedItemsObj = {
            modPack: relatedServer.modPack,
            bannedItemsFile: yaml.safeLoad(fs.readFileSync(ServerBannedItemsFldr+file, {encoding: 'utf-8'})),
        }
        return serverBannedItemsObj
    })
    bannedItemsData = dataList
    // console.log(bannedItemsData)
    return convertRulesToJSON(bannedItemsData)
}

// Convert DataSet---------
function convertRulesToJSON(dataLists){
    for(let i = 0; i < dataLists.length; i++){
        // console.log(dataLists[i].bannedItemsFile)
       bannedItemsData[i].bannedItemsFile= convertRulesToObjects(dataLists[i].bannedItemsFile)
    }
//    return bannedItemsData =  JSON.stringify(bannedItemsData)
}

function convertRulesToObjects(jsonFile){
    let bannedItemsArray = []
    let itemsArray = Object.keys(jsonFile)
    for(let i = 0; i < itemsArray.length; i++){

        let itemTemplate = {
            name: null,
            restrictLvl: null,
            townyBypass: null,
            countBlock: null,
            limit:[],
            reason: null,
        }

        if(jsonFile[itemsArray[i]] !== jsonFile.DEFAULT_VALUES){
            if(!jsonFile[itemsArray[i]].Name.toLowerCase().includes("creative")){
                itemTemplate.name = `${jsonFile[itemsArray[i]].Name}`
                console.log(itemTemplate.name)
            }
        }
    }

}
// console.log(bannedItemsData)
// writeDataToJSONFile(JSON.stringify(bannedItemsData))

// Write JSON File -------------------
function writeDataToJSONFile(data){
    fs.writeFileSync('serverBannedItems.json', data, 'utf8', function(){
        if(error) throw error;
        console.log('successfully converted to JSON format')
    })
}
// fs.writeFileSync(outputfile, JSON.stringify(obj, null, 2));


// let bannedItemsArray =[
//     {
//         name: `${SourceMod} ${Name}`,
//         restrictLvl: "BAN,RESTRICT,NONE",
//         townyBypass: true,
//         countBlock: true,
//         Limit:[
//             {
//                 Default: 2,
//                 VIP1: 3,
//                 VIP2: 4,
//             }
//         ],
//         reason: "Specific reason"
//     },
//     {
//         name: `Towny bypass block`,
//         restrictLvl: "Towny bypass",
//     },
//     {
//         name: `World bypass`,
//         restrictLvl: "RESTRICT",
//         //Majority disabled in Overworld
//     },
//     {
//         name: `Limited Placement`,
//         restrictLvl: "Limited Placement",
//         Limit:[
//             {
//                 Default: 2,
//                 VIP1: 3,
//                 VIP2: 4,
//             }
//         ],
//         reason: "Most likely a reason is needed"
//     },
//     {
//         name: `Banned Across the board`,
//         restrictLvl: "BAN",
//         reason: "Specific reason"
//     },
// ]

/*
Catergories:
    least ----> most
    towny bypass
    Disabled in Overworld
    Limited Placement
    Banned/Non-obtainable

*/