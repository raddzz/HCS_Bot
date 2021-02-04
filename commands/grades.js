//Algorithim from https://github.com/C-H-Fahy/ModuleGradeCalc/blob/main/GradeCalc.py

//Import weightedGrade function
const {weightedGrade} = require('../utils/weightedgrade.js');

const Discord = require("discord.js");

exports.run = function(bot, message, args){
	let config = bot.config;

	//Split message
	const messageArgs = message.content.slice(config.prefix.length).replace(/ /g,'').split('-');
	//Remove first argument
	const command = messageArgs.shift().toLowerCase();
	//Split array further into grades,maxgrades and weights
	const grades = messageArgs[0].split(',');
	const maxgrades = messageArgs[1].split(',');
	const weights = messageArgs[2].split(',');

	//Calculating highest possible, and current grades.
    const high = weightedGrade(maxgrades,weights);
    const grade = weightedGrade(grades,weights);
    percentage = grade / high * 100;

   	// Discord Embed Generated
    const gradeEmbed = new Discord.MessageEmbed()
                .setTitle('Grade Calculator')
                .setColor('#4345ff')

            
            gradeEmbed.addField("__**Weighted Grade**__", grade.toFixed(2), false);
            gradeEmbed.addField("__**Percentage**__", percentage.toFixed(2)+"%", false);
            message.reply(gradeEmbed);
}

exports.props = {
    usage: "grades",
    description: "Used to calculate grades, usage is !grades - grades - maxgrades - weights"
}
