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

    return convertRulesToJSON(bannedItemsData)
}

// Convert DataSet---------
function convertRulesToJSON(dataLists){
    for(let i = 0; i < dataLists.length; i++){

       bannedItemsData[i].bannedItemsFile= convertRulesToObjects(dataLists[i].bannedItemsFile)
    }
   return bannedItemsData =  JSON.stringify(bannedItemsData, null, '\t')
}

function convertRulesToObjects(jsonFile){
    const colourCodeCheck = /&[0-9A-z]/g
    let bannedItemsArray = []
    let itemsArray = Object.keys(jsonFile)
    for(let i = 0; i < itemsArray.length; i++){

        let bItemObject = {}
        //removes example items from list
        if(jsonFile[itemsArray[i]] !== jsonFile.DEFAULT_VALUES){

            //checks whether an items is creative or used just for display(which is most likely creative)
            if(!jsonFile[itemsArray[i]].Name.toLowerCase().includes("creative") && !jsonFile[itemsArray[i]].Name.toLowerCase().match(colourCodeCheck)){

                bItemObject.name = `${jsonFile[itemsArray[i]].Name}`

                //is item banned?
                if(jsonFile[itemsArray[i]]["Restrict Level"] === "BAN"){
                    bItemObject.restrictLvl = "Global Ban"

                    //outlier cases checking for reason, gives clarity to user
                    if(jsonFile[itemsArray[i]]["Mini Reason"]){
                        bItemObject.reason = jsonFile[itemsArray[i]]["Mini Reason"].replace(colourCodeCheck, "")
                    }
                }

                //is item world restricted?
                else if(jsonFile[itemsArray[i]]["Restrict Level"] === "RESTRICT"){
                    bItemObject.restrictLvl = "Disabled in Overworld"

                    //outlier cases checking for reason, gives clarity to user
                    if(jsonFile[itemsArray[i]]["Count Block"]){
                        bItemObject.limit = jsonFile[itemsArray[i]].Limit
                    }
                }
                //is item limited?
                else if(jsonFile[itemsArray[i]]["Count Block"]){
                    bItemObject.restrictLvl = "Limited Placement"
                    bItemObject.limit = jsonFile[itemsArray[i]].Limit
                }
                //does it bypass towny?
                else if(jsonFile[itemsArray[i]]["Check Towny"]){
                    bItemObject.restrictLvl = "Towny Bypass"

                }
                bannedItemsArray.push(bItemObject)
            }
        }
    }
    return bannedItemsArray
}
console.log(bannedItemsData)
writeDataToJSONFile(bannedItemsData)

// Write JSON File -------------------
function writeDataToJSONFile(data){
    fs.writeFileSync('./serverDataJSON/serverBannedItems.json', data, 'utf8', function(){
        if(error) throw error;
        console.log('successfully converted to JSON format')
    })
}

/*
Catergories:
    least ----> most
    towny bypass
    Limited Placement
    Disabled in Overworld
    Banned/Non-obtainable

*/