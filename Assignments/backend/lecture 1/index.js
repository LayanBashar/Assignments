//Write File
// const fs = require("fs");

// fs.writeFile("message.txt", "Hello from NodeJS", (err) => {
//   if (err) throw err;
//   console.log("The file has been saved!");
// });

/////////////////////////////////////////////
//Read File
// const fs = require("fs");

// fs.readFile("./message.txt", "utf8", (err, data) => {
//   if (err) throw err;
//   console.log(data.toUpperCase());
// });
////////////////////////////////////////////////
//common JS
// var generateName = require("sillyname");
// var name = generateName();
// console.log(`my name is ${name}`);
/////////////////////////////////////////////////
//module JS
// import sillyname from "sillyname";
// var name = sillyname();
// console.log(`My name is ${name}`);
/////////////////////////////////////////////////

import fs from "fs";
fs.writeFile(
  "message.txt",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lacinia nunc non eros viverra, in tincidunt ligula faucibus. Curabitur vehicula bibendum risus, vel fermentum velit. Morbi vel",
  (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  }
);

fs.readFile("./message.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data.toUpperCase());
  console.log(data.length);
});
