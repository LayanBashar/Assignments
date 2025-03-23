// length
let tweet =
  "javaScript is a versatile programming language used primarily for creating dynamic and interactive web pages. It enables developers to manipulate HTML and CSS, handle events, and communicate with servers. With frameworks like React and Vue, JavaScript plays a crucial role in modern web development.";
length;
if (tweet.length > 280) console.log("tweet exceeds 280 characters");
else console.log("tweet does NOT exceeds 280 characters");

// charAt()
let userName = "layan";
userName = userName.charAt(0).toUpperCase() + userName.slice(1);
console.log(userName);
//toUpperCase()  toLowerCase()
let title = "Web development";
title = title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
console.log(title);

// trim()
let email = "  username@gmail.com  ";
email = email.trim();
console.log(email);

// slice()
let article =
  "The Importance of Programming Programming is a key skill driving technological advancement today. It allows the development of software, websites, and apps that make our lives easier.";
article = article.slice(0, 100) + ".....Read more";
console.log(article);

// substring()
let number = "0791231230";
number = "*".repeat(6) + number.substring(6);
console.log(number);

// replace() or replaceAll()
let word = " Hello How are you badword badword";
word = word.replaceAll("badword", "******");
console.log(word);

// split()
let comment = "user comment";
console.log(comment.split(" "));

// includes()
let comments = "comment restrictedword comment comment ";
if (comments.includes("restrictedword"))
  console.log("Your message contains restricted words");
else console.log(comments);

// startsWith()  endsWith()
let image = "picture.jpeg";
if (image.endsWith(".png") || image.endsWith(".jpg") || image.endsWith(".jpeg"))
  console.log("verified");
else console.log("Not verified");

// repeat()
let divider = "-";
console.log(divider.repeat(40));

// concat()
let t = "Web";
t = t.concat(" Development");
console.log(t);

// indexOf() lastindexOf()
let p =
  "JavaScript is a powerful language. Many developers use JavaScript for both front-end and back-end development. JavaScript is essential for creating dynamic websites.";
console.log(p.indexOf("JavaScript"));
console.log(p.lastIndexOf("JavaScript"));
