const fs = require("fs");

//Init all the events and commands
module.exports = async (bot) => {
    const evtDir = "./events/";
    const cmdDir = "./commands/";

    console.log("Loading Bot Events...");
    //get all files in the event folder
    let events = await getFileList(evtDir);

    //load all events
    console.log(`Loading ${events.length} events...`);
    events.forEach((evtName, i) => {
        const handler = require(evtDir + evtName);
        //initialise and set up the event
        handler.init(bot);
        bot.on(evtName, handler.run);
        console.log(`${i + 1}: ${evtName} loaded!`);
    });

    console.log("Loading Bot Commands...");
    //get all files in cmd folder
    let commands = await getFileList(cmdDir);

    //load all commands
    console.log(`Loading ${commands.length} commands...`);
    commands.forEach((cmdName, i) => {
        const cmd = require(cmdDir+cmdName);
        bot.commands[cmdName] = cmd.run;
        bot.commandProps[cmdName] = cmd.props;
        console.log(`${i + 1}: ${cmdName} loaded!`);
    });
};

//gets a list of all js files in a directory without their file extension
async function getFileList(dir) {
    return new Promise(function (resolve, reject) {
        //for all files in the event folder
        fs.readdir(dir, (err, files) => {
            if (err) return console.error(err);

            //filter out any non-js files
            let jsFiles = files.filter(f => f.split(".").pop() === "js");
            if (jsFiles.length <= 0) {
                console.log("There are no events to load...");
                return resolve([]);
            }

            //load all file names
            let list = [];
            jsFiles.forEach((fileName, i) => {
                list.push(fileName.replace(/\.js$/, ''));
            });
            resolve(list);
        });
    })
}