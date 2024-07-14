const http = require("http");
const fs = require("fs");

const array = JSON.parse(fs.readFileSync("index.json"))["FlightProposals"];

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });

  let index = 0;
  const interval = setInterval(() => {
    if (index >= array.length) {
      clearInterval(interval);
      res.end();
      return;
    }

    const element = array[index++];
    const result = {
      sources: [
        {
          options: {
            tableName: "flight.list",
            mergeType: 1,
          },
          data: [element],
        },
      ],
    };
    const chunk = JSON.stringify(result) ;
    console.log(chunk);
    res.write(chunk);
  }, 4000);
});

server.listen(2020, () => {
  console.log("Server is listening on port 2020");
});
