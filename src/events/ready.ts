import type { Event, EventExecuteCallback } from "../client/events";

const ready: EventExecuteCallback = async (client) => {
  console.log(`Bot ${client.user?.tag} is ready to serve in ${client.guilds.cache.size} guilds!`);
};

const ReadyEvent: Event = {
  type: "ready",
  execute: ready,
};

export default ReadyEvent;
