const { MessageEmbed } = require('discord.js'),
  st = require('../../core/settings').bot;


module.exports = {
  name: 'antinuke',
  aliases: ['antiwizz', 'an'],
  category: 'security',
  run: async (client, message, args) => {
    let prefix = message.guild.prefix || '&';
    const option = args[0];
    const isActivatedAlready = await client.db.get(`${message.guild.id}_antinuke`);
    const antinuke = new MessageEmbed()
      .setThumbnail(`${client.user.avatarURL({ dynamic: true })}`)
      .setColor(client.color)
      .setTitle(`__**Antinuke**__`)
      .setDescription(`<:Dot:1219578817031700530> It bans admins for doing suspicious activites in the server.\n<:Dot:1219578817031700530> It ignores the ones who are whitelisted.\n<:Dot:1219578817031700530> Antinuke must me enabled to protect the server.`)
      .addFields([
        { name: `__**Antinuke Enable**__`, value: `To Enable Antinuke, Use - \`${prefix}antinuke enable\`` },
        { name: `__**Antinuke Disable**__`, value: `To Disable Antinuke, Use - \`${prefix}antinuke disable\`` }
      ])

    if (message.author.id === message.guild.ownerId) {
      if (!option) {
        message.reply({ embeds: [antinuke] });
      } else if (option === 'enable') {
        if (isActivatedAlready) {
          const enabnble = new MessageEmbed()
            .setThumbnail(client.user.displayAvatarURL())
            .setColor(client.color)
            .setDescription(`**  ${message.guild.name} security settings <:Profile:1219949431676342312>
Ohh uh! looks like your server has already enabled security

Current Status : <:tick:1219578388721696849>

To disable use ${prefix}antinuke disable **`)
          message.channel.send({ embeds: [enabnble] })
        } else {
          await client.db.set(`${message.guild.id}_antinuke`, true);
          const enable = new MessageEmbed()
            .setThumbnail(client.user.displayAvatarURL())
            .setAuthor({name: `${client.user.username} Security`, iconURL: client.user.displayAvatarURL()})
            .setColor(client.color)
            .setDescription(`
    **  ${message.guild.name} Security Settings ** <:Profile:1219949431676342312>
Also move my role to top of roles for me to work properly <:ServerAuthority:1219949960150126593>
      ** 
Anti Ban <:xx:1219578429817622610><:tick:1219578388721696849>
Anti Kick <:xx:1219578429817622610><:tick:1219578388721696849>
Anti Unban <:xx:1219578429817622610><:tick:1219578388721696849>
Anti Role-Create <:xx:1219578429817622610><:tick:1219578388721696849>
Anti Role-Delete <:xx:1219578429817622610><:tick:1219578388721696849>
Anti Role-Update <:xx:1219578429817622610>
<:tick:1219578388721696849>
Anti Channel-Create <:xx:1219578429817622610>
<:tick:1219578388721696849>
Anti Channel-Delete <:xx:1219578429817622610>
<:tick:1219578388721696849>
Anti Channel-Update <:xx:1219578429817622610>
<:tick:1219578388721696849>
Anti Emoji Create <:xx:1219578429817622610>
<:tick:1219578388721696849>
Anti Emoji Update <:xx:1219578429817622610>
<:tick:1219578388721696849>
Anti Emoji Delete <:xx:1219578429817622610>
<:tick:1219578388721696849>
Anti Webhook Create <:xx:1219578429817622610>
<:tick:1219578388721696849>
Anti Webhook Update <:xx:1219578429817622610>
<:tick:1219578388721696849>
Anti Webhook Delete <:xx:1219578429817622610>
<:tick:1219578388721696849>
Anti Sticker Create <:xx:1219578429817622610>
<:tick:1219578388721696849>
Anti Sticker Update <:xx:1219578429817622610>
<:tick:1219578388721696849>
Anti Sticker Delete <:xx:1219578429817622610>
<:tick:1219578388721696849>
Anti Everyone/Here <:xx:1219578429817622610>
<:tick:1219578388721696849>
Anti Server-Update <:xx:1219578429817622610>
<:tick:1219578388721696849>
Anti Prune 
<:xx:1219578429817622610>
<:tick:1219578388721696849>
Anti Bot Add 
<:xx:1219578429817622610>
<:tick:1219578388721696849>
Anti Vanity Steal <:xx:1219578429817622610>
<:tick:1219578388721696849>
Auto Recovery <:tick:1219578388721696849>
Enabled antinuke for this server
      **`)
          message.channel.send({ embeds: [enable] })
          await client.db.set(`${message.guild.id}_wl`, { whitelisted: [] });
        }
      } else if (option === 'disable') {
        if (!isActivatedAlready) {
          const dissable = new MessageEmbed().setThumbnail(client.user.displayAvatarURL())
            .setColor(client.color)
            .setDescription(` ** ${message.guild.name} security settings <:Profile:1219949431676342312>
Ohh NO! looks like your server doesn't enabled security

Current Status : <:xx:1219578429817622610>

To enable use ${prefix}antinuke enable ** `)
          message.channel.send({ embeds: [dissable] })
        } else {
          await client.db.set(`${message.guild.id}_antinuke`, null);
          const disable = new MessageEmbed().setThumbnail(client.user.displayAvatarURL())
            .setColor(client.color)
            .setDescription(`** ${message.guild.name} security settings <:tick:1219578388721696849>
Successfully disabled security settings.

Current Status : <:xx:1219578429817622610> 

To enable again use ${prefix}antinuke enable **`)
          message.channel.send({ embeds: [disable] })
        }
      }
    } else {
      message.reply({ embeds: [new MessageEmbed().setColor(client.color).setDescription('<:vbVoteCrossCyan:1027966735153905724> | Only Server Owner Can Run This Command.')] });
    }
  }
}