const CLI_TXT = require ('../converterTextHelp.js');
const SERVER_LIST = require('../serverNavData.js').ftbServers
const fs = require('fs')
const yaml = require('js-yaml');
const path = require('path');
const ServerDataFldr = "../testData/";

let serverDirList

let serverDataJSON = []

function searchServerFolder(){
    serverDirList =  fs.readdirSync(ServerDataFldr)
    .filter((dir) => fs.lstatSync(path.join(ServerDataFldr, dir)).isDirectory());

    serverDirList.map(dir =>console.log(`Found ${dir} directory, adding to list`))

    return serverDirList
};

function scanEachServer(directoryList){
    directoryList.forEach(function(dir){
        let directoryObj = {server: dir, files: null}

        directoryObj.files = fs.readdirSync(dir).filter((file) => fs.lstatSync(path.join(dir, file)).isFile());

        serverDataJSON.push(directoryObj)
        
    })
    return serverDataJSON
}

function loadFilesFromServerDirectory(serverData){
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


searchServerFolder()
scanEachServer(serverDirList)
loadFilesFromServerDirectory(serverDataJSON)

let serverDirObjArray =[
    // {modPack: null,staffList: {},banneditems:[],rules:[],},
    // {modPack: null,staffList: {},banneditems:[],rules:[],},
    // {modPack: null,staffList: {},banneditems:[],rules:[],},
]

