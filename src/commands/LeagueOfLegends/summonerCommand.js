let Command = require('../../command');
let request = require('request');
let Ligz = require('./Ligz')
const Discord = require('discord.js');

const commandName = "lol:summoner";
const lol_summoner = new Command(commandName, null, null);

lol_summoner.embedDescription = new Discord.RichEmbed()
    .setTitle(commandName)
    .setDescription("League of Legends: Rankings of a summoner :eyeglasses:")
    .addField("Usage", Command.PREFIX + " " + commandName + " [summoner name]");

lol_summoner.action = function (bot, message, args) {

    if (typeof args !== 'undefined' && args.length === 1) {
        Ligz.getSummonerInfoByName(args[0], function (summonerInfo) {
           sendSummonerInfo(summonerInfo, bot, message);
        });

        Ligz.getSummonerRankingByName(args[0], function (summonerRankings) {
            sendSummonerRanking(summonerRankings, bot, message);
        })
    }

};

function sendSummonerInfo(summonerInfo, bot, message)
{
    let messageEmbed = new Discord.RichEmbed()
        .setAuthor(summonerInfo.name, summonerInfo.profileIcon)
        .addField("Level", summonerInfo.summonerLevel);
    message.channel.send(messageEmbed);
}

function sendSummonerRanking(summonerRankings, bot, message)
{

    summonerRankings.forEach(function (queueRanking) {
        const attachment = new Discord.Attachment(queueRanking.iconUrl, queueRanking.iconName + ".png");


        let messageEmbed = new Discord.RichEmbed()
            .setTitle(queueRanking.queueType)
            .attachFile(attachment)
            .setThumbnail('attachment://' + queueRanking.iconName + ".png")
            .setColor(queueRanking.color)
            .addField("Rank",queueRanking.tier + " " + queueRanking.rank + " " + queueRanking.leaguePoints + " LP")
            .addField("WIN/LOSSES",queueRanking.wins + "W - " + queueRanking.losses + "L " + getWinratePercentage(queueRanking.wins, queueRanking.losses) + "%");
        message.channel.send(messageEmbed);
    });



}

function getWinratePercentage(win, losses)
{
    if (parseFloat(win) === 0.0) {
        return 0;
    }
    let value = 100 * parseFloat(win) / (parseFloat(win) + parseFloat(losses));
    return Number(value).toFixed(2);
}

module.exports = lol_summoner;
