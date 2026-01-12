const barsContainer = document.getElementById("bars");
const speedInput = document.getElementById("speed");
const algorithmSelect = document.getElementById("algorithm");

let array = [];
const SIZE = 25;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function generateArray() {
  array = [];
  barsContainer.innerHTML = "";

  for (let i = 0; i < SIZE; i++) {
    const value = Math.floor(Math.random() * 200) + 20;
    array.push(value);

    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = value + "px";
    barsContainer.appendChild(bar);
  }
}

async function bubbleSort() {
  const bars = document.getElementsByClassName("bar");

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      bars[j].classList.add("active");
      bars[j + 1].classList.add("active");

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        bars[j].style.height = array[j] + "px";
        bars[j + 1].style.height = array[j + 1] + "px";
      }

      await sleep(speedInput.value);
      bars[j].classList.remove("active");
      bars[j + 1].classList.remove("active");
    }
    bars[array.length - i - 1].classList.add("sorted");
  }
}

async function selectionSort() {
  const bars = document.getElementsByClassName("bar");

  for (let i = 0; i < array.length; i++) {
    let minIndex = i;
    bars[minIndex].classList.add("active");

    for (let j = i + 1; j < array.length; j++) {
      bars[j].classList.add("active");

      if (array[j] < array[minIndex]) {
        bars[minIndex].classList.remove("active");
        minIndex = j;
        bars[minIndex].classList.add("active");
      }

      await sleep(speedInput.value);
      bars[j].classList.remove("active");
    }

    [array[i], array[minIndex]] = [array[minIndex], array[i]];
    bars[i].style.height = array[i] + "px";
    bars[minIndex].style.height = array[minIndex] + "px";

    bars[minIndex].classList.remove("active");
    bars[i].classList.add("sorted");
  }
}

async function insertionSort() {
  const bars = document.getElementsByClassName("bar");

  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;

    bars[i].classList.add("active");
    await sleep(speedInput.value);

    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      bars[j + 1].style.height = array[j + 1] + "px";
      j--;
      await sleep(speedInput.value);
    }

    array[j + 1] = key;
    bars[j + 1].style.height = key + "px";
    bars[i].classList.remove("active");
  }

  for (let bar of bars) {
    bar.classList.add("sorted");
  }
}

async function startSort() {
  const algo = algorithmSelect.value;
  if (algo === "bubble") await bubbleSort();
  if (algo === "selection") await selectionSort();
  if (algo === "insertion") await insertionSort();
}

generateArray();
