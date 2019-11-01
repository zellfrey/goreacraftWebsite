

const invalidCmd = `
Wrong number of cmds. Please enter the correct command 
or type 'help' for a list of commands`

const docs = `
This programme works by converting the data of servers
that are either txt files or yaml into JSON format. This allows the backend
to send the data to the frontend(i.e the website).

To add data from a server create a folder within ./MCServerData and name in accordance. 
Navigate to the newly created folder and add the files listed below:


"Restrict List.yml"  ---    banneditems list
"users.yml"          ---    staff list
"rules.txt"          ---    rules list
"navData.yml"        ---    navigation data

You will need to create the navData.yml file or copy it from another server data folder
and then fill it out with the related info of the server.

#################
IF YOU DO NOT include "navData.yml" in the folder, the data within that folder will not be
read as the website needs the basic data in order to map out the website.
You can cheat and add the file and have some blank spaces BUT this will cause unexpected problems.
If you are curious what those problems are, message Beardedflea on Discord
#################

If all steps are followed. You should see a JSON file added or updated in the '/MCServerData'
folder named "mcServerData.json".
`

const start = `Starting scan of folders for relevant files

`

const help = `
List of commands:

help    h   Shows a list of commands. What you see now

docs    d   How the programme works. Highly recommended

start   s   Starts the programme`

module.exports ={help,docs,start,invalidCmd,}