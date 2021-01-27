function addDays(date, days) {
    const copy = new Date(Number(date))
    copy.setDate(date.getDate() + days)
    return copy
}

// load discord
const Discord = require('discord.js');
const client = new Discord.Client();

// load datefns to help with making dates readable
const datefns = require('date-fns');

// load ical to get information from UH

const ical = require('node-ical');


const config = require('./config.json');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content === '!lectures nextweek') {


        ical.fromURL(config.ical_link, {}, function(err, data) {

            const now = new Date();
            const oneWeek = addDays(now, 7);
            const weekEmbed = new Discord.MessageEmbed()
                .setTitle('Lectures for the next 7 days')
            for (let k in data) {
                const ev = data[k];
                if (ev.summary.includes('/Lec/')) {
                    eventDate = new Date(ev.start)
                    if (now < eventDate && eventDate < oneWeek) {
                        weekEmbed.addField('Event Summary', ev.summary, false)
                        englishDate = datefns.format(eventDate, 'DD/MM/YYYY - H:mm');
                        weekEmbed.addField('Starting time', englishDate, true)
                    }
                }



            }
            msg.reply(weekEmbed);
        })
    }
});

client.login(config.token);