// let arr = [
//   2,
//   3,
//   { name: "hello", age: 30 },
//   ["test", { phone: "11111111", salary: 22222 }, 10],
// ];

// t = "test";

// console.log(arr[3][0].charAt(arr[3][0].length - 1));
// console.log(arr[3][1].salary / 2);
// console.log(arr[3][2] * 10);

//////////////////////////////////////////////////////////////

// let arr = [
//   { id: 2, value: "test" },
//   { id: 3, value: "assignment" },
//   { id: 1, value: "exam" },
// ];

// function returnExamObj() {
//   let i = 0;
//   while (i < arr.length) {
//     if (arr[i].value === "exam") {
//       return arr[i];
//     }
//     i++;
//   }
// }

// console.log(returnExamObj());

//////////////////////////////////////////////////////////////////
//map *3

// array = [1, 2, 3, 4, 5, 6];
// array = array.map((x) => x * 3);
// console.log(array);
//////////////////////////////////////////////////////////////////
//filter+indexOf to make array unique
// array = [1, 2, 2, 3, 4, 5, 3, 2];
// array = array.filter((num, index, array) => array.indexOf(num) === index);
// console.log(array);
///////////////////////////////////////////////////////////////////
//sort by age
// let arr = [
//   { name: "hussam", age: 30 },
//   { name: "Ali", age: 40 },
//   { name: "Ahmad", age: 22 },
// ];

// arr.sort((a, b) => a.age - b.age);
// console.log(arr);
