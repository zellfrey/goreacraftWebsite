
const fs = require('fs')

const URfilePath = './URrules.txt';

const IEfilePath = './IErules.txt';

const rulesData = fs.readFileSync(URfilePath, { encoding: 'utf8' });

const rulesObjArray = convertRulesToJSON(rulesData)

fs.writeFileSync('IErules.json', rulesObjArray, 'utf8', function(){
    if(error) throw error;
    console.log('successfully converted to JSON format')
})

function convertRulesToJSON(txt){
    let rulesJSON;
    const colourCodeCheck = /&[0-9A-z]/g
    const ruleNoCheck = /[1-9]?[0-9][.]/g

    let dataArray = txt.split('\n').map(str => str.replace(colourCodeCheck, ''))
    let rulesArray = dataArray.filter(rule => rule.match(ruleNoCheck))
 
    rulesJSON = rulesArray.map(line =>{
        let dotIndex = line.indexOf('.')
        let ruleObj = {number: line.slice(0, dotIndex+1), desc: line.slice(dotIndex+2)}
        if(ruleObj.desc.includes('\r')){
            ruleObj.desc = ruleObj.desc.slice(0,-1)
        }
        return ruleObj
     })
    return JSON.stringify(rulesJSON)
}
