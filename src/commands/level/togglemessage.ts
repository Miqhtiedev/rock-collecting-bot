import { CommandData } from "discord.js";

const command: CommandData = {
  run: async (client, message) => {
    if (!message.guild) return;

    const user = await client.database.user.findFirst({
      where: {
        discordId: message.author.id,
        guildId: message.guild.id,
      },
      select: {
        sendLevelupMessage: true,
      },
    });

    if (!user) return;

    await client.database.user.update({
      where: {
        discordId_guildId: { discordId: message.author.id, guildId: message.guild.id },
      },
      data: {
        sendLevelupMessage: !user.sendLevelupMessage,
      },
    });

    message.reply(`You will ${user.sendLevelupMessage ? "no longer" : "now"} recieve level up messages.`);
  },
  usage: "level togglemessage",
  aliases: ["tmsg"],
};

export default command;
