import { CommandData } from "discord.js";

const command: CommandData = {
  run: (client, message) => {
    message.channel.send("Pong!");
  },
  usage: "ping",
};

export default command;
