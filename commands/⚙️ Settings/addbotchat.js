const { MessageEmbed } = require(`discord.js`);
const config = require(`${process.cwd()}/botconfig/config.json`);
var ee = require(`${process.cwd()}/botconfig/embed.json`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
module.exports = {
    name: `addbotchat`,
    aliases: [`addbotchannel`],
    category: `⚙️ Settings`,
    description: `Let's you enable a bot only chat where the community is allowed to use commands`,
    usage: `addbotchat <#chat>`,
    memberpermissions: [`ADMINISTRATOR`],
    type: "bot",
    run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
    try{
      
      //get the channel from the Ping
      let channel = message.mentions.channels.filter(ch=>ch.guild.id==message.guild.id).first() || message.guild.channels.cache.get(message.content.trim().split(" ")[0]);
      //if no channel pinged return error
      if (!channel)
      return message.reply({embeds : [new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(client.getFooter(es))
        .setTitle(`<:no:833101993668771842> It seems that the Role does not exist in this Server!`)
      ]});
      //try to find it, just incase user pings channel from different server
      try {
          message.guild.channels.cache.get(channel.id)
      } catch {
        return message.reply({embeds :[new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(client.getFooter(es))
          .setTitle(`<:no:833101993668771842> It seems that the Role does not exist in this Server!`]))
        ]});
      }
      //if its already in the database return error
      if(client.settings.get(message.guild.id,`botchannel`).includes(channel.id))
        return message.reply({embeds : [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(client.getFooter(es))
          .setTitle(`<:no:833101993668771842> This Channel is alerady in the List!`)
        ]});
      //push it into the database
      client.settings.push(message.guild.id, channel.id, `botchannel`);
      //these lines create the string of the Bot Channels
      let leftb = ``;
      if(client.settings.get(message.guild.id, `botchannel`).join(``) ===``) leftb = `no Channels, aka all Channels are Bot Channels`
      else
      for(let i = 0; i < client.settings.get(message.guild.id, `botchannel`).length; i++){
        leftb += `<#` +client.settings.get(message.guild.id, `botchannel`)[i] + `> | `
      }
      //send informational message
      return message.reply({embeds : [new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null)
        .setFooter(client.getFooter(es))
        .setTitle(`<a:yes:833101995723194437> Added the Bot-Chat \\`${channel.name}\\``)
        .setDescription(`All Bot Chats:\\n> ${leftb}`)
      ]});
    } catch (e) {
        console.log(String(e.stack).grey.bgRed)
        return message.reply({embeds : [new MessageEmbed()
            .setColor(es.wrongcolor)
						.setFooter(client.getFooter(es))
            .setTitle(client.la[ls].common.erroroccur)
            .setDescription(e`\\`\\`\\` ${e.message ? e.message : e.stack ? String(e.stack).substr(0, 2000) : String(e).substr(0, 2000)}\\`\\`\\``")
        ]});
    }
  }
};
/**
  * @INFO
  * Bot Coded by Tomato#6966 | https://discord.gg/milrato
  * @INFO
  * Work for Milrato Development | https://milrato.eu
  * @INFO
  * Please mention him / Milrato Development, when using this Code!
  * @INFO
*/
