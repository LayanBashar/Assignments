//Count Vowels in a String

// let input = "JavaScript";
// let count = 0;
// for (let i = 0; i <= input.length; i++) {
//   if (input.charAt(i) === "a") count++;
//   else if (input.charAt(i) === "e") count++;
//   else if (input.charAt(i) === "i") count++;
//   else if (input.charAt(i) === "o") count++;
//   else if (input.charAt(i) === "u") count++;
// }
// console.log(count);

////////////////////////////////////////////////////////////////

//Check Even or Odd Numbers in an Array
// function checkNum(array = []) {
//   for (let i = 0; i <= array.length; i++) {
//     if (array[i] % 2 === 0) {
//       console.log("even");
//     } else if (array[i] % 2 === 1) {
//       console.log("odd");
//     }
//   }
// }

// console.log(checkNum((numbers = [1, 4, 7, 10])));

////////////////////////////////////////////////////////////////

//Find Longest Word in a String
// let word = " ";
// function longestWord(text) {
//   let arraychar = text.split(" ");
//   for (let x = 0; x < arraychar.length; x++) {
//     if (arraychar[x].length > word.length) {
//       word = arraychar[x];
//     }
//   }

//   console.log(word);
// }

// longestWord(" I love JavaScript programming");

///////////////////////////////////////////////////////////////////

//FizzBuzz Problem
// let num = 88;
// if (num % 5 === 0 && num % 3 === 0) console.log("FizzBuzz");
// else if (num % 3 === 0) console.log("Fizz");
// else if (num % 5 === 0) console.log("Buzz");
// else console.log(0);

//////////////////////////////////////////////////////////////////////

//Find the Second Largest Number in an Array
array = [10, 5, 20, 8, 12];
let num1 = 0;
let num2 = 0;

for (let x = 0; x < array.length; x++) {
  if (array[x] > num1) num1 = array[x];
}
for (let i = 0; i < array.length; i++) {
  if (array[i] > num2 && num2 < num1) num2 = array[i];
}

console.log(num2);

/////////////////////////////////////////////////////////////////////////
