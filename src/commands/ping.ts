import { Command } from "discord.js";

const command: Command = {
  run: (client, message) => {
    message.channel.send("Pong!");
  },
  requiredPermission: "ADMINISTRATOR",
  usage: "ping",
};

export default command;
