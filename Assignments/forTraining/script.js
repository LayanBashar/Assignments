// console.log(sum(2, 2));

// function sum(num1, num2) {
//   return num1 + num2;
// }
////////////////////////////////////////////////////////////
//function expression
// let sum = function (num1, num2) {
//   return num1 + num2;
// };

// console.log(sum(2, 3));
////////////////////////////////////////////////////////////
//Arrow Function
// sub = (x1, x2) => {
//   return x1 / x2;
// };

// console.log(sub(10, 5));
///////////////////////////////////////////////////////////
//Anonymous Function
// setTimeout(function () {
//   console.log("Hello");
// }, 200);
//////////////////////////////////////////////////////////
//IIFE
// (function () {
//   console.log("welcome");
// })();
/////////////////////////////////////////////////////////
//Largest number from array
// let arr = [1, 5, 9, 6, 3, 87, 72, 23, 100];
// let num = 0;
// function largestNum(array = []) {
//   for (let x = 0; x <= array.length; x++) {
//     if (array[x] >= num) {
//       num = array[x];
//     }
//   }
//   console.log(num);
// }

// largestNum(arr);

/////////////////////////////////////////////////////////
//reverse array
// let array2 = [1, 5, 9];
// let index = 0;
// let newArray = [];
// function reverse(array = []) {
//   for (let x = array.length - 1; x >= 0; x--) {
//     newArray.push(array[x]);
//   }
//   return newArray;
// }

// console.log(reverse(array2));
////////////////////////////////////////////////////////
//find two number sum is target
// let array3 = [1, 5, 9, 6, 3, 87, 72, 23, 7, 2];
// let target = 9;
// function fun(array = [], target) {
//   for (let i = 0; i < array.length; i++) {
//     for (let x = 1; x < array.length; x++) {
//       if (array[i] + array[x] === target) return array[i] + " " + array[x];
//     }
//   }
// }
// console.log(fun(array3, target));

//best solution
array = [9, 7, 2, 1, 3];
target = 9;
function fun(array = [], target) {
  array = array.sort((a, b) => a - b);
  let right = array.length - 1;
  let left = 0;
  while (left < right) {
    let sum = array[left] + array[right];
    if (sum === target) return [array[left], array[right]];
    else if (sum < target) left++;
    else if (sum > target) right--;
    else return null;
  }
}

console.log(fun(array, target));
