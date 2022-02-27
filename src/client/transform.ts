import { PrismaClient } from "@prisma/client";
import { Client, Collection } from "discord.js";
import { Command } from "./command";

export interface ClientExtensions {
  database: PrismaClient;
  commands: Collection<string, Command>;
}

export const transformClient = (client: Client) => {
  const ext: ClientExtensions = {
    database: new PrismaClient({ log: ["warn", "error"] }),
    commands: new Collection(),
  };
  Object.assign(client, ext);
};
