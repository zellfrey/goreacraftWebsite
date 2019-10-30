const CLI_TXT = require ('../converterTextHelp.js');
const SERVER_LIST = require('../serverNavData.js').ftbServers
const fs = require('fs')
const yaml = require('js-yaml');
const path = require('path');
const ServerDataFldr = "../testData/";
const COLOUR_CODE_CHECK = /&[0-9A-z]/g
const RULE_NO_CHECK = /[1-9]?[0-9][.]/g

let serverDirList

let serverDataJSON = []

function searchServerFolder(){
    serverDirList =  fs.readdirSync(ServerDataFldr)
    .filter((dir) => fs.lstatSync(path.join(ServerDataFldr, dir)).isDirectory());

    serverDirList.map(dir =>console.log(`Found ${dir} directory, adding to list`))

    return serverDirList
};

function scanEachServer(directoryList){
    console.log("scanning server directories")

    directoryList.forEach(function(dir){
        let directoryObj = {server: dir, files: null}

        directoryObj.files = fs.readdirSync(dir).filter((file) => fs.lstatSync(path.join(dir, file)).isFile());

        serverDataJSON.push(directoryObj)
        
    })
    return serverDataJSON
}

function loadFilesFromServerDirectory(serverData){
    console.log("Moving to file loading within server directories")

    serverData.forEach(function(dir){

            dir.rules = dir.files.includes('rules.txt') ? 
                        fs.readFileSync(`./${dir.server}/` +'rules.txt', {encoding: 'utf-8'})
                        : null

            dir.bannedItems = dir.files.includes('Restrict List.yml') ? 
                        yaml.safeLoad(fs.readFileSync(`./${dir.server}/Restrict List.yml`, {encoding: 'utf-8'})) 
                        : null

            dir.serverStaff = dir.files.includes('users.yml') ? yaml.safeLoad(fs.readFileSync(`./${dir.server}/users.yml`, {encoding: 'utf-8'})) 
                        : null
    })
    return serverData
}

function convertEachFileFromServer(serverFiles){
    console.log("converting files to JSON format")

    for(let i = 0; i < serverFiles.length; i ++){
            if(serverFiles[i].rules){
                serverFiles[i].rules = convertRulesToObjects(serverFiles[i].rules)
            }
            else{
                console.log(`Rules file does not exist in ${serverFiles[i].server} folder. Continuing with conversion`)
            }
    }
}

// server rules conversion to JSON
function convertRulesToObjects(rulesFile){
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


searchServerFolder()
scanEachServer(serverDirList)
loadFilesFromServerDirectory(serverDataJSON)
convertEachFileFromServer(serverDataJSON)

let serverDirObjArray =[
    // {modPack: null,staffList: {},banneditems:[],rules:[],},
    // {modPack: null,staffList: {},banneditems:[],rules:[],},
    // {modPack: null,staffList: {},banneditems:[],rules:[],},
]

