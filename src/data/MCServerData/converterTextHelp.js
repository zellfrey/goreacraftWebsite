

const invalidCmd = `
Wrong number of cmds. Please enter the correct command 
or type 'help' for a list of commands`

const docs = `
This programme works by converting the rules of servers
that are txt files into JSON format. This allows the backend
to send the data to the frontend(i.e the website).

To add a server's rules.txt file to this list, navigate to
the folder named '/serverRules'. Once there add your rules.txt
file into the folder.

Rename the rules.txt with the server that it relates to, 
e.g 'Infinityrules.txt'. Do not add a space between.


####
IF YOU DO NOT follow this step the programme will NOT be able to find
the relative server it belongs to and so your file will not be read and not
be picked up by the Website server.
####

If all steps are followed. You should see a JSON file added to the '/serverRules'
folder.
`

const start = `Starting scan of folders for relevant files

`

const help = `
List of commands:

help    h   Shows a list of commands. What you see now

docs    d   How the programme works. Highly recommended

start   s   Starts the programme`

module.exports ={help,docs,start,invalidCmd,}