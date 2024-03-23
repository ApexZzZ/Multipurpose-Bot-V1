const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'whitelist',
  aliases: ['wl'],
  category: 'security',
  run: async (client, message, args) => {
    const wl = new MessageEmbed()
      .setColor(client.color)
      .setTitle(`__**Whitelist Commands**__`)
      .setDescription(`**Adds user to whitelisted users which means that there will be no actions taken on the whitelisted members if they trigger the antinuke module.**`)
      .addFields([
        { name: `__**Usage**__`, value: `<:Dot:1219578817031700530> \`${message.guild.prefix}whitelist @user\`\n<:Dot:1219578817031700530> \`${message.guild.prefix}wl @user\`` }
      ])
    if (message.author.id !== message.guild.ownerId) {
      return message.reply({ embeds: [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.cross} | Only owner of this server can use this command.`)]});
    } 
    const antinuke = await client.db.get(`${message.guild.id}_antinuke`);
    if (!antinuke) {
      const dissable = new MessageEmbed()
        .setColor(client.color)
        .setDescription(` ** ${message.guild.name} security settings <:Profile:1219949431676342312>
Ohh NO! looks like your server doesn't enabled security

Current Status : <:xx:1219578429817622610>

To enable use antinuke enable ** `)
      message.channel.send({ embeds: [dissable]})
    } else {
      await client.db.get(`${message.guild.id}_wl`).then(async (data) => {
        if (!data) {
          await client.db.set(`${message.guild.id}_wl`, { whitelisted: [] });
          return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.cross} | Please again run this command as the database was earlier not assigned.`)]})
        } 
        const user = message.mentions.users.first();
        if (!user) {
          return message.reply({ embeds: [wl] });
        } else {
          const userId = user.id;
          if (data.whitelisted.includes(userId)) {
             message.reply({ embeds: [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.cross} | <@${user.id}> is already a whitelisted member.`)] });
          } else {
            await client.db.push(`${message.guild.id}_wl.whitelisted`, userId);
            message.reply({ embeds: [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.tick} | Successfully added <@${user.id}> as whitelisted user.`)] });
          }
        }
      })
    }
  }
}