import fs from "fs";
import { Client } from "discord.js";
import path from "path";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type EventExecuteCallback = (client: Client, ...args: any[]) => void;

export interface Event {
  type: string;
  execute: EventExecuteCallback;
}

export function registerEvents(client: Client, eventsDir: string) {
  const files = fs.readdirSync(eventsDir);

  for (const file of files) {
    const filePath = path.join(eventsDir, file);
    const stats = fs.statSync(filePath);

    if (!file.endsWith(".js") || !stats.isFile()) continue;

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const event = require(filePath).default;

    client.on(event.type, event.execute.bind(null, client));
  }
}
