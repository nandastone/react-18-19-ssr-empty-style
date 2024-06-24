import express from "express";
import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import { App } from "../app/App";

const server = express();

const assetMap = {
  "index.js": "http://localhost:1234/client/index.js",
};

server.get("*", async (req, res) => {
  const { pipe, abort } = renderToPipeableStream(<App />, {
    bootstrapScripts: [assetMap["index.js"]],
    onShellReady() {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");

      pipe(res);
    },
    onError(error) {
      console.error("Failed to render:", error);
      abort();
      res.statusCode = 500;
      res.end("Internal Server Error");
    },
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
