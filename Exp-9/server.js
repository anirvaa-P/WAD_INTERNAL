const http = require("http");
const os = require("os");
const path = require("path");
const EventEmitter = require("events");

// Create event emitter object
const eventEmitter = new EventEmitter();

// Define event
eventEmitter.on("request_received", () => {
  console.log("Event: Request received by server");
});

// Create server
const server = http.createServer((req, res) => {

  // Trigger event
  eventEmitter.emit("request_received");

  // OS module usage
  const osData = `
  Platform: ${os.platform()}
  Architecture: ${os.arch()}
  Total Memory: ${os.totalmem()}
  Free Memory: ${os.freemem()}
  `;

  // Path module usage
  const filePath = path.join(__dirname, "server.js");

  // Response
  res.writeHead(200, { "Content-Type": "text/html" });

  res.write("<h1>Custom Node.js Server</h1>");
  res.write("<h3>OS Information:</h3><pre>" + osData + "</pre>");
  res.write("<h3>File Path:</h3><p>" + filePath + "</p>");

  res.end("<h3>Server is running successfully!</h3>");
});

// Start server
server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});