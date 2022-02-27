import Discord from "discord.js";
import { config } from "dotenv";
import path from "path";
import invariant from "tiny-invariant";
import { registerCommands } from "./client/command";
import { registerEvents } from "./client/events";
import { transformClient } from "./client/transform";
config();

invariant(process.env.BOT_TOKEN, "BOT_TOKEN is a reuired environment variable");
invariant(process.env.DATABASE_URL, "DATABASE_URL is a required environment variable");

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"], partials: ["GUILD_MEMBER"] });
transformClient(client);

registerCommands(client, path.join(__dirname, "commands"));
registerEvents(client, path.join(__dirname, "events"));

client.login(process.env.BOT_TOKEN);
