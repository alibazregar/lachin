const http = require("http");
const fs = require("fs");
let id = 0;
const array = JSON.parse(fs.readFileSync("index.json"))["FlightProposals"];
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  for (let element of array) {
    setInterval(() => {
        let result = {
            sources: [
              {
                options: {
                  tableName: "flight.list",
                  mergeType: 1,
                },
                data: [
                  {
                    FlightId: element.FlightId,
                    Origin: element.FlightGroup[0].Origin,
                    Destination: element.FlightGroup[0].Destination,
                    Duration: element.FlightGroup[0].Duration,
                    NumberOfStops: element.FlightGroup[0].NumberOfStops,
                    Class: element.FlightGroup[0].Class,
                    isSystemFlight: element.FlightGroup[0].isSystemFlight,
                    AvailableSeats: element.FlightGroup[0].AvailableSeats,
                    Total: element.PriceInfo.Total,
                    Currency: element.PriceInfo.Currency,
                  },
                ],
              },
            ],
          }
          const chunk = JSON.stringify(result) + "\n";
          res.write(chunk);
    }, 1000);
  }
});

server.listen(2020, () => {
  console.log("Server is listening on port 2020");
});
