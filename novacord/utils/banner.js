export function banner({ username, id, guilds, version }) {
  const lines = [
    "",
    "══════════════════════════════════════════════════",
    `  NovaCord v${version} gestartet`,
    `  Bot: ${username} (${id})`,
    `  Guilds: ${guilds}`,
    "══════════════════════════════════════════════════",
    ""
  ];
  return lines.join("\n");
}
