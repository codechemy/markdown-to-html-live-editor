const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const showdown = require("showdown");
const cors = require("cors");
const sanitizeHtml = require('sanitize-html');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const converter = new showdown.Converter({
  tables: true,
  tasklists: true,
  strikethrough: true,
  disableForced4SpacesIndentedSublists: true,
  emoji: true,
  encodeEmails: true,
  excludeTrailingPunctuationFromURLs: true,
  ghCodeBlocks: true,
  ghMentions: true,
  literalMidWordUnderscores: true,
  omitExtraWLInCodeBlocks: true,
  openLinksInNewWindow: true,
  parseImgDimensions: true,
  requireSpaceBeforeHeadingText: true,
  simpleLineBreaks: true,
  smartIndentationFix: true,
});

const port = 3001;

// Use cors middleware with specific origin
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("markdown", (data) => {
    const markdownText = data.markdown;

    if (!markdownText) {
      io.emit("html", { html: "" });
      return;
    }

    const html = converter.makeHtml(markdownText);

    // Sanitize HTML using DOMPurify
    const sanitizedHtml = sanitizeHtml(html);
    io.emit("html", { html: sanitizedHtml });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
