import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
const NWS_API_BASE = "https://api.weather.gov";
const USER_AGENT = "weather-app/1.0";
// Create server instance
const server = new McpServer({
    name: "weather",
    version: "1.0.0",
    capabilities: {
        resources: {},
        tools: {},
    },
});
// Register weather tools
server.tool("getRandomNumber", "Generate a random number between a given range", {
    min: z.number().describe("Minimum value of the range"),
    max: z.number().describe("Maximum value of the range"),
}, async ({ max, min }) => {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return {
        content: [
            {
                type: "text",
                text: `Random number: ${randomNumber}`,
            },
        ],
    };
});
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Weather MCP Server running on stdio");
}
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
