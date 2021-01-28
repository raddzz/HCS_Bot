let bot, config;
exports.init = function (client) {
    bot = client;
    config = client.config;
}
exports.run = async function () {
    console.log(`Logged in as ${bot.user.tag}!`);
    bot.user.setActivity("!help")
}
