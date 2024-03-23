const { Message, Client, MessageEmbed,MessageActionRow,MessageButton } = require("discord.js");
const discordinfo = require("discordinfo.js");
const data = require("../../config");
const saixd = data.owner;
module.exports = {
  name: "user",
  aliases: ['wl', 'bl'],
  category: 'dev',
  run: async (client, message, args) => {
    try {
      if(!saixd.includes(message.author.id)) return
      const user = new discordinfo({
        token: data.token
     });
      
      const users = args[0]
      if(!users) {
        const embed = new MessageEmbed()
        .setDescription(`Kindly Provide User Id`)
        .setColor("DARK_BUT_NOT_BLACK")
        return message.channel.send({embeds: [embed]})
      }

   
      

      
        const syt = await user.getUser(users)

        const db  = await client.db.get(`blacklist_${syt.id}`);

        if(db){
            await client.db.set(`blacklist_${syt.id}`, false)
            const embed = new MessageEmbed()
            .setDescription(`${syt.username} has been whitelisted`)
            .setColor("DARK_BUT_NOT_BLACK")
            message.channel.send({embeds: [embed]})
        } else {
            const embed = new MessageEmbed()
            .setDescription(`${syt.username} has been blacklisted`)
            .setColor("DARK_BUT_NOT_BLACK")
            message.channel.send({embeds: [embed]})
            await client.db.set(`blacklist_${syt.id}`, true)
        }
      } catch(err){
     const embed = new MessageEmbed()
     .setDescription("Something Went Wrong")
     return message.channel.send({embeds: [embed]})
      } 

  }}