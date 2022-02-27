import { Guild, GuildBasedChannel, MessageMentions } from "discord.js";

export const parseChannel = (str: string, guild: Guild): GuildBasedChannel | undefined => {
  let channel = guild.channels.cache.get(str);
  if (channel) return channel;
  if (str.match(MessageMentions.CHANNELS_PATTERN)) {
    channel = guild.channels.cache.get(str.slice(2, -1));
  }
  return channel;
};
