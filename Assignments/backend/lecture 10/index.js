// import express, { response } from "express";
// import bodyParser from "body-parser";
// //without download
// import https from "https";
// const app = express();
// const port = 3000;
// //always will use it
// app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   const options = {
//     //endpoint( to at)+route or path
//     hostname: "https://api.wheretheiss.at/v1/satellites/25544",
//     method: "GET",
//   };

//   const request = https.get(options.hostname, (response) => {
//     let data = "";
//     response.on("data", (chunk) => {
//       data += chunk;
//     });
//     response.on("end", () => {
//       try {
//         const result = JSON.parse(data);
//         res.render("index.ejs", result);
//       } catch (error) {
//         console.log("res error");
//         res.status(500).send("Faild to fetch data");
//       }
//     });
//   });
//   request.on("error", (err) => {
//     res.status(500).send("Faild to fetch from ISS server");
//   });
//   request.end();
// });

// app.listen(port, () => {});
// console.log("working");

////////////////////////////////////////////////////////
// axios package
import express, { response } from "express";
import bodyParser from "body-parser";
//without download
import axios from "axios";
const app = express();
const port = 3000;
let colors = [
  {
    color: "red",
    value: "#f00",
  },
  {
    color: "green",
    value: "#0f0",
  },
  {
    color: "blue",
    value: "#00f",
  },
  {
    color: "cyan",
    value: "#0ff",
  },
  {
    color: "magenta",
    value: "#f0f",
  },
  {
    color: "yellow",
    value: "#ff0",
  },
  {
    color: "black",
    value: "#000",
  },
];
//always will use it
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.wheretheiss.at/v1/satellites/25544"
    );
    res.render("index.ejs", response.data);
  } catch (error) {
    console.log("Fail to make request", error.message);
    res.status(500).send("Faild to fetch data");
  }
});

//private API

app.get("/color", (req, res) => {
  //نحوله ل json
  res.json(JSON.parse(colors));
});

//color with specific id
app.get("/color/:id", (req, res) => {
  //نحوله ل json
  res.json(JSON.parse(colors));
});

app.listen(port, () => {});
console.log("working");
