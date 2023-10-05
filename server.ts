import { faker } from "@faker-js/faker";
import express from "express";

const app = express();
const port = 8080;

const root = `
<!DOCTYPE html>
<html>
  <head>
    <title>Bun Express Test</title>
  <body>
    <h1>Bun Express Test</h1>
    <p>
      <ul>
        <li>/ - This message.</li>
        <li>/data/<i>id</i> - Show data for id in json format.</li>
        <li>/data/ - Show all data in json format.</li>
        <li>/find/name/<i>name</i> - Find data by name.</li>
        <li>/find/job/<i>name</i> - Find data by name.</li>
      </ul>
    </p>
  </body>
</html>
`;

const generateMockData = () => {
  const data = [];

  for (let i = 1; i <= 50; i++) {
    const fullName = faker.person.fullName();
    const age = faker.number.int({ min: 15, max: 80 });
    const job = age > 20 ? faker.person.jobTitle() : "";

    data.push({
      id: i,
      name: fullName,
      age: age,
      job: job
    });
  }

  return data;
};

const mockData = generateMockData();
console.log(mockData);

app.get("/", (req, res) => {
  res.send(root);
});

app.get("/data/:id", (req, res) => {
  const id = Number(req.params.id);
  const result = mockData.find((d) => d.id === id);
  res.send(JSON.stringify(result));
});

app.get("/data/", (req, res) => {
  res.send(JSON.stringify(mockData));
});

app.get("/find/name/:name", (req, res) => {
  const name = req.params.name;
  const result = mockData.filter((d) => d.name.search(name) > -1);
  res.send(JSON.stringify(result));
});

app.get("/find/job/:job", (req, res) => {
  const job = req.params.job;
  const result = mockData.filter((d) => d.job.search(job) > -1);
  res.send(JSON.stringify(result));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

console.log("Hello via Bun!");
