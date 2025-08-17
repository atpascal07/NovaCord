export function banner({ username, id, guilds, version }) {
  return `
╔══════════════════════════════════════╗
║         🚀 NovaCord gestartet        ║
╠══════════════════════════════════════╣
║ Bot:     ${username} (${id})         
║ Guilds:  ${guilds}                    
║ Version: ${version}                  
╚══════════════════════════════════════╝
  `;
}
