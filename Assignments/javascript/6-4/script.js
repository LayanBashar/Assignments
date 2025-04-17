// let screen = document.getElementById("screen");
// let content = document.getElementsByClassName("content");
// console.log(content);
let display = document.getElementById("display");

function appendValue(value) {
  if (display.innerText === "0") {
    display.innerText = value;
  } else {
    display.innerText += value;
  }
}

function clearDisplay() {
  display.innerText = "0";
}

function calculate() {
  try {
    display.innerText = eval(
      display.innerText.replace(/×/g, "*").replace(/÷/g, "/")
    );
  } catch {
    display.innerText = "خطأ";
  }
}
