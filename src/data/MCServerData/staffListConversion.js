const cliTxt = require ('./converterTextHelp.js');
const serverList = require('./serverNavData.js').ftbServers;
const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');
const serverStaffFldr = "./serverStaff/";

let serverStaffData;
let staffData;


scanServerRulesFolder()
//Scan staffData find & keep only files--------------------------------
function scanServerRulesFolder(){
    serverStaffData =  fs.readdirSync(serverStaffFldr)
    .filter((file) => fs.lstatSync(path.join(serverStaffFldr, file)).isFile());

    serverStaffData.map(file=>console.log(`${file} == valid file`))

    return checkRelativeServer(serverStaffData)
};

function checkRelativeServer (fileListArray){
    let txtList = []

    for(let i = 0; i < fileListArray.length; i++){
        let serverCheckString;
        if(fileListArray[i].includes("users")){
            serverCheckString = fileListArray[i].replace("users.yml","")

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
        let serverCheckString = file.replace("users.yml","")
        let relatedServer = serverList.find(ftb=> ftb.modPack.includes(serverCheckString))
        let serverStaffObj = {
            modPack: relatedServer.modPack,
            staffList: yaml.safeLoad(fs.readFileSync(serverStaffFldr+file, {encoding: 'utf-8'})),
        }
        return serverStaffObj
    })
    staffData = dataList

    return convertRulesToJSON(staffData)
}

// Convert DataSet---------
function convertRulesToJSON(dataLists){
    for(let i = 0; i < dataLists.length; i++){

       staffData[i].staffList= convertRulesToObjects(dataLists[i].staffList)
    }
   return staffData =  JSON.stringify(staffData, null, '\t')
}

function convertRulesToObjects(jsonFile){
    const colourCodeCheck = /&[0-9A-z]/g
    const staffRanks = ["Helper", "Mod", "SrMod", "Admin", "Headmin"]
    let staffList = {
        "Helper":[],
        "Mod":[],
        "SrMod":[],
        "Admin":[],
        "Head Admin":null,
        }

    for(const user in jsonFile.users){
        if(jsonFile.users[user].info && jsonFile.users[user].info.suffix){
            let playerName = jsonFile.users[user].lastname
            let playerRank = jsonFile.users[user].info.suffix.replace(colourCodeCheck, "").slice(1,-1)
            
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
                        console.log("no staff rank found")
                        break;
                }
                        
            }

        }

    }
    return staffList
}
console.log(staffData)
writeDataToJSONFile(staffData)

// Write JSON File -------------------
function writeDataToJSONFile(data){
    fs.writeFileSync('./serverDataJSON/serverStaffList.json', data, 'utf8', function(){
        if(error) throw error;
        console.log('successfully converted to JSON format')
    })
}

