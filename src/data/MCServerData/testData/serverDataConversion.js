const CLI_TXT = require ('../converterTextHelp.js');
const SERVER_LIST = require('../serverNavData.js').ftbServers
const fs = require('fs')
const path = require('path');
const ServerDataFldr = "../testData/";

let serverDirList



function searchServerFolder(){
    serverDirList =  fs.readdirSync(ServerDataFldr)
    .filter((dir) => fs.lstatSync(path.join(ServerDataFldr, dir)).isDirectory());

    serverDirList.map(dir =>console.log(`Found ${dir} directory, adding to list`))

    return scanEachServer(serverDirList)
};

function scanEachServer(directoryList){
    directoryList.forEach(function(dir){
        let directoryObj = {modPack: dir, files: null}

        directoryObj.files = fs.readdirSync(dir).filter((file) => fs.lstatSync(path.join(dir, file)).isFile());

        console.log(directoryObj)
    })
}

searchServerFolder()

let serverDirObjArray =[
    // {modPack: null,staffList: {},banneditems:[],rules:[],},
    // {modPack: null,staffList: {},banneditems:[],rules:[],},
    // {modPack: null,staffList: {},banneditems:[],rules:[],},
]