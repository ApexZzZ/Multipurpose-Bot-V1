const { Client, Collection, MessageEmbed, MessageButton, MessageActionRow, WebhookClient, Intents } = require("discord.js");
const client = new Client({ intents: 32767 });
const wait = require('wait');
const { Database } = require('quickmongo');
const settings = require('./core/settings');
const phin = require('phin').unpromisified;
const chalk = require('chalk');
const { readdirSync } = require("fs");
const util = require('./handler/util.js');
const GiveawayManager = require("./handler/GiveawayManager");
const config = require("./config");
const data = require("./config");

const web = new WebhookClient({url: config.webhook}); 


client.emoji = {
  'tick': '<:tick:1219578388721696849>',
  'cross': '<:xx:1219578429817622610>',
  'dot': '<:Dot:1219578817031700530>',
  'giveaway': '<:SD_giveaway:1219578994836635699>'
};
  const db = new Database(config.mongo);
  db.connect();
  require(`./core/db.js`)

  client.giveawaysManager = new GiveawayManager(client);
  client.commands = new Collection();
  client.slashCommands = new Collection();
  client.categories = readdirSync("./commands/");
  client.util = new util(client);
  client.db = db;
  client.color = '00e3ff';
  require("./database/connect")();
  
  readdirSync("./events/").forEach(file => {
      let eventName = file.split(".")[0];
      require(`./events/${file}`)(client);
      console.log(`Omit | LOADED :: ${eventName} `);
  });
  
  require("./handler")(client);



client.login(data.token);
module.exports = client;

process.on('unhandledRejection',async(err) => {
  console.error(`Omit | ${err}`);
});
process.on('uncaughtException',async(er) => {
  console.error(`Omit | ${er}`)
});