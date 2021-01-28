// load datefns to help with making dates readable
const datefns = require('date-fns');

const Discord = require("discord.js");

// load ical to get information from UH
const ical = require('node-ical');
const {getDate} = require('../utils/datetime');

exports.run = function (bot, message, args) {
    let config = bot.config;

    // if (args[0] === "nextweek") {
        ical.fromURL(config.ical_link, {}, function (err, data) {
            const now = getDate();
            const oneWeek = getDate(7);

            const weekEmbed = new Discord.MessageEmbed()
                .setTitle('View full timetable here')
                .setDescription('**Lectures for the next 7 days:\n\n**')
                .setURL('https://www.studynet1.herts.ac.uk/ptl/common/timetable.nsf')
                .setColor('#4345ff')
                .setFooter("Note: tutorials and practicals are not shown.")

            for (let k in data) {
                const ev = data[k];
                if (ev.summary.includes('/Lec/')) {
                    let eventDate = new Date(ev.start);
                    if (now < eventDate && eventDate < oneWeek) {
                        let englishDate = datefns.format(eventDate, 'dd/MM/yyyy - H:mm');
                        weekEmbed.addField("__**"+englishDate+"**__", ev.summary, false)
                        // weekEmbed.addField('Starting time', englishDate, false)
                    }
                }
            }
            message.reply(weekEmbed);
        })
    // }
}

exports.props = {
    usage: "lectures",
    description: "Shows all lectures for the next 7 days."
}
