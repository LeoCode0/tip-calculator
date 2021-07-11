// setup
const bill = document.querySelector("#bill_input");
const tipCustom = document.querySelector("#custom_input");
const people = document.querySelector("#people_input");
const buttonsTip = Array.from(
  document.querySelectorAll(".calculator__tip-button")
);

const warning = document.querySelector(".warning");

const reset = document.querySelector("#reset");

const tip = document.querySelector("#tip");
const total = document.querySelector("#total");

// helpers

let data = {
  bill: 0,
  tip: 0,
  people: 0,
};

let currentButton;

const checkAllInputs = () => {
  if (data.people === 0 || data.bill === 0) {
    warning.classList.add("show");
  } else {
    makeCalc();
  }
};

const resetButtonActive = () => {
  if (currentButton) {
    currentButton.classList.remove("button-active");
    data.tip = 0;
  }
};

const makeCalc = () => {
  if (warning.classList.contains("show")) {
    warning.classList.remove("show");
  }

  tipAmount = ((data.bill * data.tip) / data.people).toFixed(2);
  totalAmount = ((data.bill + data.bill * data.tip) / data.people).toFixed(2);

  console.log(totalAmount);
  tip.textContent = `$${tipAmount}`;
  total.textContent = `$${totalAmount}`;
};

// totals
let tipAmount = 0;
let totalAmount = 0;

// Event listeners

bill.addEventListener("change", (e) => {
  data.bill = parseFloat(e.target.value);
  checkAllInputs();
});

buttonsTip.map((button) =>
  button.addEventListener("click", () => {
    resetButtonActive();

    currentButton = button;
    let tipFromButton =
      parseInt(button.textContent.match(/\d/g).join("")) / 100;
    button.classList.add("button-active");
    data.tip = tipFromButton;
    checkAllInputs();
  })
);

tipCustom.addEventListener("change", (e) => {
  resetButtonActive();

  data.tip = parseFloat(e.target.value) / 100;
  checkAllInputs();
});

people.addEventListener("change", (e) => {
  data.people = Math.round(e.target.value);
  checkAllInputs();
});

reset.addEventListener("click", () => {
  tip.textContent = "$0.00";
  total.textContent = "$0.00";
});
