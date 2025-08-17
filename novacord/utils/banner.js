import chalk from "chalk";
import { version as djsVersion } from "discord.js";

class Style {
  constructor(tl, tr, bl, br, h, v, m, l, r, t, b) {
    this.TL = tl; this.TR = tr; this.BL = bl; this.BR = br;
    this.H = h; this.V = v; this.M = m; this.L = l; this.R = r;
    this.T = t; this.B = b;
  }
}

const Normal = new Style("╭", "╮", "╰", "╯", "─", "│", "┼", "├", "┤", "┬", "┴");
const Bold   = new Style("╔", "╗", "╚", "╝", "═", "║", "╬", "╠", "╣", "╦", "╩");

function getDefaultInfo(client, commandCount) {
  return [
    ["Bot", client.user?.tag || "Unbekannt"],
    ["ID", client.user?.id || "-"],
    ["Discord.js", djsVersion],
    ["Commands", String(commandCount)],
    ["Guilds", String(client.guilds.cache.size)],
    ["Latency", `${client.ws.ping}ms`],
  ];
}

export function printReady(client, { version, commandCount, style = "table" }) {
  const infos = getDefaultInfo(client, commandCount);
  const title = `NovaCord v${version} gestartet 🚀`;

  switch (style) {
    case "logs":
      console.log(chalk.cyan(title));
      infos.forEach(([k, v]) => console.log(chalk.gray(`${k}:`), chalk.green(v)));
      break;

    case "box":
      printBox(title, infos, Normal);
      break;

    case "box_bold":
      printBox(title, infos, Bold);
      break;

    case "table":
      printTable(title, infos, Normal);
      break;

    case "table_bold":
      printTable(title, infos, Bold);
      break;

    default:
      printTable(title, infos, Normal);
  }
}

function printBox(title, infos, s) {
  const longest = Math.max(...infos.map(([k, v]) => (k + ": " + v).length));
  console.log("\n" + chalk.cyan(title));

  console.log(s.TL + s.H.repeat(longest + 2) + s.TR);
  infos.forEach(([k, v]) => {
    const line = `${k}: ${v}`.padEnd(longest, " ");
    console.log(`${s.V} ${line} ${s.V}`);
  });
  console.log(s.BL + s.H.repeat(longest + 2) + s.BR + "\n");
}

function printTable(title, infos, s) {
  const col1 = Math.max(...infos.map(([k]) => k.length)) + 1;
  const col2 = Math.max(...infos.map(([_, v]) => v.length));
  console.log("\n" + chalk.cyan(title));

  const top = s.TL + s.H.repeat(col1 + col2 + 3).replace(/./g, s.H) + s.TR;
  console.log(top);

  infos.forEach(([k, v], i) => {
    const line =
      `${s.V} ${k.padEnd(col1)}${v.padEnd(col2)} ${s.V}`;
    console.log(line);
    if (i < infos.length - 1) {
      console.log(s.V + s.H.repeat(col1 + col2 + 3) + s.V);
    }
  });

  const bottom = s.BL + s.H.repeat(col1 + col2 + 3) + s.BR;
  console.log(bottom + "\n");
}
