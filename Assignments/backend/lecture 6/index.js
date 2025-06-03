import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const today = new Date(); //بيعطيني التاريخ
  const day = today.getDate(); //بيعطيني اليوم كارقام من 0 ل 6

  let type = "a weekday"; //نحدد اذا هيه weekday or weekend
  let adv = "its time to work";
  if (day === 5 || day === 6) {
    type = "a weekend";
    adv = "Have fun!";
  }
  res.render("index.ejs", {
    type: type,
    adv: adv,
  });
});
app.listen(port, () => {});
