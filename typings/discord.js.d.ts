/* eslint-disable @typescript-eslint/no-empty-interface */
import type { ClientExtensions } from "../src/client/transform";
import type { CommandData as ClientCommandData } from "../src/client/command";
declare module "discord.js" {
  interface Client extends ClientExtensions {}
  interface CommandData extends ClientCommandData {}
}
