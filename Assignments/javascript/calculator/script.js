function calculate(operator) {
  let num1 = parseFloat(document.getElementById("num1").value);
  let num2 = parseFloat(document.getElementById("num2").value);
  let result;

  if (isNaN(num1) || isNaN(num2)) {
    result = "يرجى إدخال أرقام صحيحة!";
  }
  {
    if (operator === "+") {
      result = num1 + num2;
    } else if (operator === "-") {
      result = num1 - num2;
    } else if (operator === "*") {
      result = num1 * num2;
    } else if (operator === "/") {
      if (num2 === 0) {
        result = "لا يمكن القسمة على صفر!";
      } else {
        result = num1 / num2;
      }
    } else {
      result = "عملية غير صحيحة!";
    }
  }

  document.getElementById("result").innerHTML = "النتيجة: " + result;
}
