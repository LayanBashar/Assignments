//factorial of 6!
//way one
// let num = 1;

// for (let x = 6; x >= 1; x--) {
//   num = num * x;
// }
// console.log(num);

//way two
// let fact = 1;
// for (let x = 1; x <= 6; x++) {
//   fact = fact * x;
// }
// console.log(fact);
////////////////////////////////////////////////////////////
//lowecase using loop
// let text = "HELLO";
// let lowercase = "";
// for (let i = 0; i < text.length; i++) {
//   let charcode = text.charCodeAt(i);
//   if (charcode >= 65 && charcode <= 90)
//     lowercase += String.fromCharCode(charcode + 32);
//   else lowercase += text[i];
// }

// console.log(lowercase);
//////////////////////////////////////////////////////////////
//indexOf
// let text = "hellot";
// target = "l";

// for (let i = 0; i < text.length; i++)
//   if (text[i] === target) {
//     console.log(i);
//     break;
//   }
//////////////////////////////////////////////////////////////
//reverse a word
// let text = "Level";
// let reverse = "";
// function reversed(text) {
//   for (let i = text.length - 1; i >= 0; i--) {
//     reverse += text[i];
//   }
//   return reverse.toLowerCase === text.toLowerCase;
// }

// console.log(reversed(text));

//factorial
let num = 6;
let fact = 1;
function factorial(num) {
  for (let i = 1; i <= num; i++) {
    fact *= i;
  }
  return fact;
}

console.log(factorial(10));
