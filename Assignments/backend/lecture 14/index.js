import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));

let colors = [
  {
    id: 1,
    color: "red",
    value: "#f00",
  },
  { id: 2, color: "green", value: "#0f0" },
  { id: 3, color: "blue", value: "#00f" },
  { id: 4, color: "cyan", value: "#0ff" },
  { id: 5, color: "magenta", value: "#f0f" },
  { id: 6, color: "yellow", value: "#ff0" },
  { id: 7, color: "black", value: "#000" },
  { id: 8, color: "green", value: "#0f0" },
];

let lastId = 8;

//all color
app.get("/colors", (req, res) => {
  res.json(colors);
});
//random color
const randomColor = Math.floor(Math.random() * colors.length);
app.get("/random", (req, res) => {
  const randomColor = Math.floor(Math.random() * colors.length);
  res.json(colors[randomColor]);
});

//specific color by id
app.get("/colors/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const colorObj = colors.find((color) => color.id === id);
  res.json(colorObj);
});
//choose color depens on filter like name
app.get("/filter", (req, res) => {
  const colorQ = req.query.color;
  const listOfColors = colors.filter((color) => color.color === colorQ);

  res.json(listOfColors);
});

//new color
app.post("/colors", (req, res) => {
  lastId++;
  const newColor = {
    id: lastId,
    color: req.body.color,
    value: req.body.value,
  };
  colors.push(newColor);
  res.status(200).json(newColor);
});

//update a color
app.put("/colors/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const updatedColor = {
    id: id,
    color: req.body.color,
    value: req.body.value,
  };
  const colorIndex = colors.findIndex((color) => color.id === id);
  colors[colorIndex] = updatedColor;

  res.json(updatedColor);
});

app.patch("/colors/:id", (req, res) => {
  const id = parseInt(req.params.id);
  //we can delete it but better with
  const colorObj = colors.find((color) => color.id === id);
  const colorIndex = colors.findIndex((color) => color.id === id);
  //const colorObj = colors[colorIndex];

  const updatedColor = {
    id: id,
    color: req.body.color || colorObj.color,
    // color: req.body.color || colors[colorIndex].color,

    value: req.body.value || colorObj.value,
  };
  colors[colorIndex] = updatedColor;

  res.json(updatedColor);
});

app.delete("/colors/:id", (req, res) => {
  const id = parseInt(req.params.id);
  //will retun -1 if it is delete it
  const colorIndex = colors.findIndex((color) => color.id === id);
  if (colorIndex > -1) {
    //
    colors.splice(colorIndex, 1);
    res.sendStatus(200);
  }
  //not found
  else {
    res.status(404).json({ error: `Color id ${id} not found` });
  }
});

app.delete("/all", (req, res) => {
  colors = [];
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log("server");
});
