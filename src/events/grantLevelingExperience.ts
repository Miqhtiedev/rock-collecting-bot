import { Message } from "discord.js";
import { Event, EventExecuteCallback } from "../client/events";
import { calculateLevel } from "../utils/calculateLevel";

const execute: EventExecuteCallback = async (client, message: Message) => {
  if (!message.guild || !message.member || message.author.bot) return;

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
      server: {
        select: {
          levelingRoles: true,
        },
      },
      levelingExperience: true,
      levelingExperienceCooldown: true,
    },
  });

  if (userData.levelingExperienceCooldown > Date.now()) return;

  const currentLevel = Math.floor(calculateLevel(userData.levelingExperience));
  const gainedXp = Math.floor(Math.random() * 50) + 5;
  const nextCooldown = Date.now() + 1000 * 60 * 2;
  const newLevel = Math.floor(calculateLevel(userData.levelingExperience + gainedXp));

  if (newLevel > currentLevel) {
    message.reply(`You have leveled up to level ${newLevel}!`);
    const roleData = userData.server.levelingRoles.find((role) => role.level === newLevel);
    if (roleData) {
      const role = message.guild.roles.cache.get(roleData.roleId);
      if (role) {
        message.member.roles.add(role);
      }
    }
  }

  await client.database.user.update({
    where: {
      discordId_guildId: { discordId: message.author.id, guildId: message.guild.id },
    },
    data: {
      levelingExperience: userData.levelingExperience + gainedXp,
      levelingExperienceCooldown: nextCooldown,
    },
  });
};

const event: Event = {
  execute: execute,
  type: "messageCreate",
};

export default event;
