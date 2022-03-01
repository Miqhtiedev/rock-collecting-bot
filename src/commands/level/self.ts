import { CommandData, MessageEmbed } from "discord.js";
import { calculateExperience, calculateLevel } from "../../utils/calculateLevel";

const command: CommandData = {
  run: async (client, message) => {
    if (!message.guild) return;

    const userData = await client.database.user.upsert({
      where: {
        discordId_guildId: { discordId: message.author.id, guildId: message.guild.id },
      },
      create: {
        discordId: message.author.id,
        guildId: message.guild.id,
      },
      update: {},
      select: {
        levelingExperience: true,
      },
    });

    const currentLevel = Math.floor(calculateLevel(userData.levelingExperience));
    const experienceTillNextLevel = calculateExperience(currentLevel + 1) - userData.levelingExperience;

    const embed = new MessageEmbed()
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setTitle(`You are currently level ${currentLevel}`)
      .setDescription(`You need **${experienceTillNextLevel}** experience to level up\nYou currently have **${userData.levelingExperience}** experience`);
    message.reply({ embeds: [embed] });
  },
  usage: "level",
  defaultSubcommand: true,
};

export default command;
