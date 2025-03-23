//factorial of 6!
//way one
let num = 1;

for (let x = 6; x >= 1; x--) {
  num = num * x;
}
console.log(num);

//way two
let fact = 1;
for (let x = 1; x <= 6; x++) {
  fact = fact * x;
}
console.log(fact);
