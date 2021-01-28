exports.run = function(bot, message, args){
    message.reply("Pong!");
}

exports.props = {
    usage: "ping",
    description: "Ping the bot"
}