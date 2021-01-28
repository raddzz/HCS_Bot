const Discord = require("discord.js");
let bot, config;

exports.init = function(client){
    bot = client;
    config = client.config;
}

exports.run = async function(message){
    if (message.author.bot) return;
    if (message.channel.type === "dm") {
        let noBotChannelEmbed = new Discord.RichEmbed()
            .setAuthor(`Something went wrong`)
            .setDescription(`Bot commands are restricted to the server`)
            .setColor("#f4ad42");

        return message.channel.send(noBotChannelEmbed);
    }

    let prefix = config.prefix;
    if (message.content.startsWith(prefix)) {
        let messageArray = message.content.split(" ");
        let cmd = messageArray[0].toLowerCase().slice(prefix.length);
        let args = messageArray.slice(1);

        let commandExec = bot.commands[cmd];
        if (commandExec) commandExec(bot, message, args);

    } else {
        //could do something with levels/xp here
    }

};
