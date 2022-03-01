import { CommandData } from "discord.js";
import { calculateExperience } from "../utils/calculateLevel";

const command: CommandData = {
  run: async (client, message, args) => {
    if (!message.guild || !args[0]) return;
    message.reply(calculateExperience(parseInt(args[0])).toString());
  },
  minimumArguments: 1,
  usage: "test <number>",
};

export default command;
