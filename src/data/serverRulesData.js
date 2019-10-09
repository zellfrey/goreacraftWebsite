
const fsp = require('fs').promises;

let rulesJSON;
const colourCodeCheck = /&[0-9A-z]/g
const ruleNoCheck = /[1-9]?[0-9][.]/g

const filePath = './URrules.txt';
const promise = fsp.readFile(filePath, { encoding: 'utf8' });

promise.then(data => convertRulesToJSON(data))
.then(rules => fsp.writeFile('URrules.js', rules, 'utf8', function(){
    if(error) throw error;
}))

function convertRulesToJSON(txt){
    let dataArray = txt.split('\n').map(str => str.replace(colourCodeCheck, ''))
    
    let rulesArray = dataArray.filter(rule => rule.match(ruleNoCheck))

    rulesJSON = rulesArray.map(line =>{
        let dotIndex = line.indexOf('.')
        let ruleObj = {number: line.slice(0, dotIndex+1), desc: line.slice(dotIndex+2)}
        return ruleObj
     })
    return rulesJSON
}