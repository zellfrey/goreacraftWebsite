const CLI_TXT = require ('./converterTextHelp.js');
const SERVER_LIST = require('./serverNavData.js').ftbServers
const fs = require('fs')
const path = require('path');
const ServerRulesFldr = "./serverRules/";

let serverRulesData;
let rulesData;

// Command line input Check ----------------------
cliInputCheck(process.argv)

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
            scanServerRulesFolder()
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

//Scan rulesData find & keep only files--------------------------------
function scanServerRulesFolder(){
    serverRulesData =  fs.readdirSync(ServerRulesFldr)
    .filter((file) => fs.lstatSync(path.join(ServerRulesFldr, file)).isFile());

    serverRulesData.map(file=>console.log(`${file} == valid file`))

    return checkRelativeServer(serverRulesData)
};

function checkRelativeServer (fileListArray){
    let txtList = []

    for(let i = 0; i < fileListArray.length; i++){
        let serverCheckString;
        if(fileListArray[i].includes("rules")){
            serverCheckString = fileListArray[i].replace("rules.txt","")

            if(SERVER_LIST.find(ftb=> ftb.modPack.includes(serverCheckString))){
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

    rulesData = fileArray.map(file =>{
        let serverCheckString = file.replace("rules.txt","")
        let relatedServer = SERVER_LIST.find(ftb=> ftb.modPack.includes(serverCheckString))
        let serverRulesObj = {
            modPack: relatedServer.modPack,
            rules: fs.readFileSync(ServerRulesFldr+file, { encoding: 'utf8' }),
        }
        return serverRulesObj
    })
    return convertRulesToJSON(rulesData)
}

//Convert DataSet---------
function convertRulesToJSON(dataLists){
    for(let i = 0; i < dataLists.length; i++){
       rulesData[i].rules= convertRulesToObjects(dataLists[i].rules)
    }
   return rulesData =  JSON.stringify(rulesData, null, '\t')
}

function convertRulesToObjects(txt){
    let rulesList;
    // console.log(txt)
    const colourCodeCheck = /&[0-9A-z]/g
    const ruleNoCheck = /[1-9]?[0-9][.]/g

    let dataArray = txt.split('\n').map(str => str.replace(colourCodeCheck, ''))
    // console.log(dataArray)
    let rulesArray = dataArray.filter(rule => rule.match(ruleNoCheck))
    // console.log(rulesArray)
    rulesList = rulesArray.map(line =>{
        let dotIndex = line.indexOf('.')
        let ruleObj = {num: line.slice(0, dotIndex+1), desc: line.slice(dotIndex+2)}
        if(ruleObj.desc.includes('\r')){
            ruleObj.desc = ruleObj.desc.slice(0,-1)
        }
        return ruleObj
     })
    console.log(rulesList)
    return rulesList
}
console.log(rulesData)
writeDataToJSONFile(rulesData)

//Write JSON File -------------------
function writeDataToJSONFile(data){
    fs.writeFileSync('./serverDataJSON/serverRules.json', data, 'utf8', function(){
        if(error) throw error;
        console.log('successfully converted to JSON format')
    })
}
