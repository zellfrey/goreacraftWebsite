const cliTxt = require ('./converterTextHelp.js');
const ftbServers = require('./serverNavData.js')
const fs = require('fs')
const ServerRulesFldr = "./serverRules/";

let serverRulesData;

// Command line input Check ----------------------
cliInputCheck(process.argv)

function cliInputCheck(args){
    if(args.length !== 3){
        console.log(cliTxt.invalidCmd)
        process.exit(9);
    }
    cmdCheck(args[2])
}
function cmdCheck(cmd){
    switch(cmd) {
        case "h":
        case "help":
            console.log(cliTxt.help)
            process.exit(0);
            break;
        case "start":
        case "s":
            console.log(cliTxt.start)
            scanServerRulesFolder()
            break;
        case "docs":
        case "d":
            console.log(cliTxt.docs)
            process.exit(0);
            break;
        default:
            console.log('not a valid command')
      }
}
//Command line input Check ----------------------

//Scan rulesData find & keep only files--------------------------------
function scanServerRulesFolder(){
    serverRulesData = fs.readdirSync(ServerRulesFldr, function (err, files) {
        if (err) {
          console.error("Could not list the directory.", err);
          process.exit(0);
        }
        return files
    
    })
    removeFoldersFromData(serverRulesData);
}

function removeFoldersFromData(serverData){
    serverData.forEach(function(file){
        fs.stat(ServerRulesFldr+file,function(err, stat){
            if (err) {
                console.error("Error stating file.", error);
                return;
            }
            if (stat.isFile()){
                console.log(`Found ${file} in ${ServerRulesFldr}.\nKeeping ${file}`);
            }
            else if (stat.isDirectory()){
                console.log(`Found ${file} directory in ${ServerRulesFldr}.\nRemoving ${file} from list`);
                let dataIndx = serverData.findIndex(el => el === file)
                serverData.splice(dataIndx, 1)
            }
        })
    });
}


setTimeout(()=>{console.log(serverRulesData)},100)
//Scan rulesData---------------

// function convertRulesToJSON(txt){
//     let rulesJSON;
//     console.log(txt)
//     const colourCodeCheck = /&[0-9A-z]/g
//     const ruleNoCheck = /[1-9]?[0-9][.]/g

//     let dataArray = txt.split('\n').map(str => str.replace(colourCodeCheck, ''))
//     console.log(dataArray)
//     let rulesArray = dataArray.filter(rule => rule.match(ruleNoCheck))
//     console.log(rulesArray)
//     rulesJSON = rulesArray.map(line =>{
//         let dotIndex = line.indexOf('.')
//         let ruleObj = {number: line.slice(0, dotIndex+1), desc: line.slice(dotIndex+2)}
//         if(ruleObj.desc.includes('\r')){
//             ruleObj.desc = ruleObj.desc.slice(0,-1)
//         }
//         return ruleObj
//      })
//     console.log(rulesJSON)
//     return JSON.stringify(rulesJSON)
// }


// const rulesData = fs.readFileSync(URfilePath, { encoding: 'utf8' });

// const rulesObjArray = convertRulesToJSON(rulesData)

// fs.writeFileSync('IErules.json', rulesObjArray, 'utf8', function(){
//     if(error) throw error;
//     console.log('successfully converted to JSON format')
// })