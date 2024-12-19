const xlsx = require("xlsx");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/items", function (req, res) {
  const workbook = xlsx.readFile("apiExcel.xlsx");

  const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  const rawData = xlsx.utils.sheet_to_json(worksheet);

  const data = rawData.map((row, index) => ({
    id: index + 1,
    Name: row.name || null,
    Price: row.price || null,
    Condition: row.condition || null,
    Specs: row.specs || null,
    Image: row.image || null,
  }));
  res.send(data);
});

app.listen(3000);
