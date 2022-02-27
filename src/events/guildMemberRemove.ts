import { GuildMember } from "discord.js";
import { Event, EventExecuteCallback } from "../client/events";
import { formatWelcomeMessage } from "../utils/formatWelcomeMessage";

const execute: EventExecuteCallback = async (client, member: GuildMember) => {
  const guildData = await client.database.server.upsert({
    where: {
      guildId: member.guild.id,
    },
    create: {
      guildId: member.guild.id,
    },
    select: {
      leaveChannel: true,
      leaveMessage: true,
    },
    update: {},
  });

  if (!guildData.leaveChannel || !guildData.leaveMessage) return;

  const channel = member.guild.channels.cache.get(guildData.leaveChannel);
  if (!channel || !channel.isText()) return;

  const message = formatWelcomeMessage(guildData.leaveMessage, member);

  channel.send(message);
};

const event: Event = {
  execute: execute,
  type: "guildMemberRemove",
};

export default event;
