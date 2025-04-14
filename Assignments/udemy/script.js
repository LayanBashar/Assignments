// var text = prompt("write here");
// if (text.length > 140) {
//   text = text.slice(0, 140);
//   alert(text);
// }

// alert(
//   "You have written " +
//     text.length +
//     " You have " +
//     (140 - text.length) +
//     " characters left"
// );

// var yourName = prompt("What is Your Name ?");
// var firstChar = yourName.slice(0, 1);
// var capitalFirstChar = firstChar.toUpperCase();

// var restOfWord = yourName.slice(1, yourName.length);
// restOfWord = restOfWord.toLowerCase();

// alert("Hello" + " " + capitalFirstChar + restOfWord);

// var dogAge = prompt("How old is your dog ?");
// var humanAge = (dogAge - 2) * 4 + 21;
// alert("Your dog age as human age is " + humanAge);

// function getMilk(money) {
//   console.log("leaveHouse");
//   console.log("moveRight");
//   console.log("moveRight");
//   console.log("moveUp");
//   console.log("moveUp");
//   console.log("moveUp");
//   console.log("moveUp");
//   console.log("moveRight");
//   console.log("moveRight");
//   console.log("moveLeft");
//   console.log("moveLeft");
//   console.log("moveDown");
//   console.log("moveDown");
//   console.log("moveDown");
//   console.log("moveDown");
//   console.log("moveLeft");
//   console.log("moveLeft");
//   console.log("enterHouse");
//   console.log(
//     money + " buy " + Math.floor(money / 1.5) + " number of bottles "
//   );
// }

// getMilk(5);
//////////////////////////////////////
// function lifeInWeeks(age) {
//   /************Don't change the code above************/
//   90 - age;
//   var days = 365 * 90 - 365 * age;
//   var weeks = 52 * 90 - 52 * age;
//   var months = 12 * 90 - 12 * age;

//   console.log(
//     "You have " +
//       days +
//       " days," +
//       weeks +
//       " weeks, and " +
//       months +
//       " months left."
//   );
// }

// lifeInWeeks(56);
///////////////////////////////////////////////////

//Create your function below this line.
//The first parameter should be the weight and the second should be the height.
// function bmiCalculator(weight, height) {
//   var BMI = Math.round(weight / Math.pow(height, 2));
//   return BMI;
// }

// var bmi = bmiCalculator(65, 1.8);
// console.log(bmi);

/* If my weight is 65Kg and my height is 1.8m, I should be able to call your function like this:

var bmi = bmiCalculator(65, 1.8); 

bmi should equal 20 when it's rounded to the nearest whole number.

*/
//////////////////////////////////

// function test() {
//   var a = "3";
//   var b = "8";

/***********Do not change the code above 👆*******/
// //Write your code on lines 7 - 9:
// var c = b;
// b = a;
// a = c;

/***********Do not change the code below 👇*******/

//   console.log("a is " + a);
//   console.log("b is " + b);
// }

// test();

//////////////////////////////////////////////////////////////////
//love calculator
// prompt("what your name?");
// prompt("what your name?");

// var loveCalc = 100 * Math.random();
// loveCalc = Math.floor(loveCalc) + 1;

// if (loveCalc > 70) {
//   alert("Your love score is " + loveCalc + "% your love is strong");
// } else {
//   alert("Your love score is " + loveCalc + "%");
// }

//////////////////////////////////////////////////////
//bmi calc advance

// function bmiCalculator(weight, height) {
//   var bmi = Math.round(weight / Math.pow(height, 2));
//   if (bmi < 18.5) {
//     return "Your BMI is " + bmi + ", so you are underweight.";
//   }
//   if (bmi > 18.5 && bmi < 24.9) {
//     return "Your BMI is " + bmi + ", so you have a normal weight.";
//   }
//   if (bmi > 24.9) {
//     return "Your BMI is " + bmi + ", so you are overweight.";
//   }
// }

// console.log(bmiCalculator(155, 41));

/////////////////////////////////////////////////////////////
//leap year
// function isLeap(year) {
/**************Don't change the code above****************/

//   if (year % 4 === 0) {
//     if (year % 100) {
//       if (year % 400) {
//         return "Leap year.";
//       } else {
//         return "Not leap year.";
//       }
//     } else {
//       return "Leap year.";
//     }
//   } else {
//     return "Not leap year.";
//   }

//   /**************Don't change the code below****************/
// }

// console.log(isLeap(1989));
//////////////////////////////
// var nameGuest = prompt("what is your name? ");
// var guestlist = ["angela", "ahmad", "sara"];

// if (guestlist.includes(nameGuest)) {
//   alert("Sorry see you next time");
// } else alert("welcome");
//////////////////////////////////
//fizzbuzz   wronnng

// var output = [];
// var count = 1;
// function fizzbuzz() {
//   if (count % 3 === 0) {
//     output.pop(count);
//     output.push("fuzz");
//   }
//   if (count % 5 === 0) {
//     output.pop(count);
//     output.push("buzz");
//   }
//   output.push(count);
//   count++;

//   console.log(output);
// }

// fizzbuzz();
//use while with
///////////////////////////////////
//bying the lunch

// function whosPaying(names) {
//   /******Don't change the code above*******/

//   //Write your code here.

//   var num = Math.random() * names.length;
//   num = Math.floar(num);

//   return names[num] + " is going to buy lunch today!";
//   /******Don't change the code below*******/
// }
// var names = ["Angela", "Ben", "Jenny", "Michael", "Chloe"];
// console.log(whosPaying(names));
//////////////////////////////////////////////

// var numOfBottles = 99;

// while (numOfBottles > 0) {
//   console.log(
//     numOfBottles +
//       " bottles of water on the wall," +
//       numOfBottles +
//       " bottles of water"
//   );
//   console.log(
//     "Take one down and pass it around," +
//       --numOfBottles +
//       " bottles of water on the wall"
//   );
// }

/////////////////////////////////////////////////
function fibonacciGenerator(n) {
  var sum = 0;

  output = [];
  if (n === 1) {
    output = [0];
  } else if (n === 2) {
    output = [0, 1];
  } else if (n > 2) {
    output = [0, 1];
    for (var i = 0; i < n - 2; i++) {
      sum = output[output.length - 1] + output[output.length - 2];
      output.push(sum);
    }

    return output;
  }
}
console.log(fibonacciGenerator(13));
