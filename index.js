// === State ===
let numberBank = [];
let oddNumbers = [];
let evenNumbers = [];

// === State Management ===

function addNumberToBank(num) {
  numberBank.push(num);
  render();
}

function sortOneNumber() {
  if (numberBank.length === 0) return;

  const num = numberBank.shift();
  if (num % 2 === 0) {
    evenNumbers.push(num);
  } else {
    oddNumbers.push(num);
  }
  render();
}

function sortAllNumbers() {
  while (numberBank.length > 0) {
    sortOneNumber();
  }
}

// === Component Functions ===

function NumberForm() {
  const form = document.createElement("form");
  form.innerHTML = `
    <label>
      Add a number to the bank
      <input name="number" type="number" min="1" required />
    </label>
    <button type="submit" id="add-num">Add Number</button>
    <button type="button" id="sort-one">Sort One</button>
    <button type="button" id="sort-all">Sort All</button>
  `;

  // Add number on form submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector("input[name='number']");
    const value = parseInt(input.value.trim(), 10);
    if (!isNaN(value)) {
      addNumberToBank(value);
      input.value = "";
    }
  });

  // === Sort one ===
  form.querySelector("#sort-one").addEventListener("click", () => {
    sortOneNumber();
  });

  // === Sort all ===
  form.querySelector("#sort-all").addEventListener("click", () => {
    sortAllNumbers();
    render();
  });

  return form;
}

function NumberList(title, numbers) {
  const section = document.createElement("section");

  const heading = document.createElement("h2");
  heading.textContent = title;

  const list = document.createElement("p");
  list.textContent = numbers.join(", ");

  section.appendChild(heading);
  section.appendChild(list);

  return section;
}

// === Render Function ===

function render() {
  const app = document.querySelector("#app");
  app.innerHTML = ""; // Clear app

  const title = document.createElement("h1");
  title.textContent = "Odds and Evens";

  app.appendChild(title);
  app.appendChild(NumberForm());
  app.appendChild(NumberList("Bank", numberBank));
  app.appendChild(NumberList("Odds", oddNumbers));
  app.appendChild(NumberList("Evens", evenNumbers));
}

render();
