const Discord = require("discord.js");

exports.run = function(bot, message, args){
    let prefix = bot.config.prefix;
    const helpEmbed = new Discord.MessageEmbed()
        .setTitle('Help Menu')
        .setDescription(`**Command prefix: ${prefix}\n\n**`)
        .setColor('#98ffa3')

    let data = bot.commandProps;
    let commands = Object.keys(data);
    for(let i = 0; i < commands.length; i++){
        let cmd = commands[i];
        let info = data[cmd];
        helpEmbed.addField("__**"+cmd+"**__", `- Usage: **${prefix}${info.usage}**\n${info.description}`, false);
    }
    message.reply(helpEmbed);
}

exports.props = {
    usage: "help",
    description: "Displays Help Menu"
}