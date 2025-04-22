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
// var generateName = require("sillyname");
// var name = generateName();
// console.log(`my name is ${name}`);
/////////////////////////////////////////////////
//module way
import sillyname from "sillyname";
var name = sillyname();
console.log(`My name is ${name}`);
