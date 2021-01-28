//log data with a timestamp
console.raw_log = console.log;
console.log = function (...args) {
    let str = "["+(new Date()).getTime()+"] ";

    //for each arg passed to func, append it to the date string
    for(let i in args){
        let elm = args[i];
        if(typeof elm === "object"){
            //objects are formatted nicely in the terminal when not stringified.
            console.raw_log(elm);
        }else{
            str += elm+" "
        }
    }
    //log the data with the timestamp prepended
    console.raw_log(str);
}

// load discord
const Discord = require('discord.js');
const client = new Discord.Client();

//load config and secrets
const config = require('./config.json');
const secrets = require('./secrets.json');

//copy any relevant data to config file
config.ical_link = secrets.ical_link;

//initialise commands and events
client.commands = {};
client.commandProps = {};
client.config = config;

require('./init')(client);


client.login(secrets.token);