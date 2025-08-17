import chalk from "chalk";
import Table from "cli-table3";
import { version as djsVersion } from "discord.js";

export function printStartBanner(client, { version, commandCount }) {
  const header = chalk.cyan.bold(`NovaCord v${version} gestartet`);
  const info = new Table({
    head: ["Bot", "ID", "Discord.js", "Commands", "Guilds", "Latency"],
    style: { head: ["cyan"] }
  });

  info.push([
    chalk.green(client.user.tag),
    chalk.magenta(client.user.id),
    chalk.yellow(djsVersion),
    String(commandCount),
    String(client.guilds.cache.size),
    `${client.ws.ping}ms`
  ]);

  console.log("");
  console.log(header);
  console.log(info.toString());
  console.log("");
}
