console.log(Bun.version);
console.log("Hello via Bun!");
const server = Bun.serve({
    port: 3000,
    fetch(req) {
      return new Response("Bun!");
    },
  });
  
  console.log(`Listening on http://localhost:${server.port} ...`);