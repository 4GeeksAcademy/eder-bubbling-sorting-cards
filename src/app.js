/* eslint-disable */
import "bootstrap";
import "./style.css";

//// variables /////

const cardType = ["♥", "♠", "♣", "♦"];
const cardStyle = ["hearts", "spades", "clovers", "diamonds"];
const cardValue = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];
const inputCardsToDraw = document.getElementById("input-cards-to-draw");
const buttonDraw = document.getElementById("button-draw");
const button = document.getElementById("button-event");
const cardBody = document.getElementById("testhtml");
const cardBodyBubble = document.getElementById("testhtml2");
const valuesToSort = [];
const typesToSort = [];
let sortedLogCards = {};
let randomType = 0;
let randomValue = 0;
let cardsToDraw = 0;
let counter = 0;
let logCount = 0;

/* Functions */

function generateRandom() {
  randomType = Math.floor(Math.random() * cardType.length);
  randomValue = Math.floor(Math.random() * cardValue.length);
}

function saveCardSet() {
  valuesToSort.push(randomValue);
  typesToSort.push(randomType);
}

const bubbleSort = (arr1, arr2) => {
  let copyArr1 = [...arr1];
  let copyArr2 = [...arr2];
  let wall = arr1.length - 1; //iniciamos el wall o muro al final del array
  while (wall > 0) {
    let index = 0;
    while (index < wall) {
      //comparar las posiciones adyacentes, si la correcta es más grande, tenemos que intercambiar
      //!!!!!!!!!!!--> Duplicamos los auxiliares y el desplacamientos en dos array para mantener la relacion de valor y tipo(trebol,corazon,etc)
      if (copyArr1[index] > copyArr1[index + 1]) {
        let aux = copyArr1[index];
        let aux2 = copyArr2[index];
        copyArr1[index] = copyArr1[index + 1];
        copyArr1[index + 1] = aux;
        copyArr2[index] = copyArr2[index + 1];
        copyArr2[index + 1] = aux2;
        sortedLogCards = { values: [...copyArr1], types: [...copyArr2] };
        // console.log(sortedLogCards);
        bubbleLog(sortedLogCards);
        logCount++;
      }

      index++;
    }
    wall--; //disminuir la pared para optimizar
  }
};
////Funcion Crear Cartas por Draw///////
function newCardHtml() {
  let fragment = document.createDocumentFragment();
  while (counter < cardsToDraw) {
    generateRandom();
    saveCardSet();
    let newDiv = document.createElement("div");
    newDiv.className =
      "card col-5 col-sm-3 col-md-2 col-lg-2 col-xl-2 col-xxl-1 card-background";
    newDiv.innerHTML = `      
              <div class="col">
                <div class="position-absolute ps-2 top-0 start-0 ">
                  <i class="fa-solid ${cardStyle[randomType]}"> ${cardType[randomType]}</i>
                </div>
              </div>
              <div class="col">
                <div class=" d-flex justify-content-center">
                  <p class="m-0 pt-3 value">${cardValue[randomValue]}</p>
                </div>
              </div>
              <div class="col ">
                <div class="position-absolute px-2 bottom-0 end-0">
                  <i class="fa-solid  fa-flip-vertical  ${cardStyle[randomType]} ">${cardType[randomType]}</i>
                </div>
              </div>`;
    fragment.appendChild(newDiv);
    counter++;
  }
  cardBody.appendChild(fragment);
  counter = 0;
}
////Funcion Crear Cartas pora las iteraciones del Bubble////////
function bubbleLog(obj) {
  let fragment2 = document.createDocumentFragment();
  let newDiv3 = document.createElement("div");
  newDiv3.className =
    "row justify-content-center gap-5 mb-5 border border-dark border-4 py-4";
  newDiv3.innerHTML = `
    <div class="col-auto justify-content-start">
       <p class="display-6 fw-bold">Log #${logCount}</p> 
    </div>  
  `;
  for (let i = 0, l = obj.types.length; i < l; i++) {
    let newDiv2 = document.createElement("div");
    newDiv2.className =
      "card col-5 col-sm-3 col-md-2 col-lg-2 col-xl-2 col-xxl-1 card-background";
    newDiv2.innerHTML = `          
      <div class="col">
        <div class="position-absolute ps-2 top-0 start-0 ">
          <i class="fa-solid ${cardStyle[obj.types[i]]}">${
      cardType[obj.types[i]]
    }
          </i>
        </div>
      </div>
      <div class="col">
        <div class=" d-flex justify-content-center">
          <p class="m-0 pt-3 value">${cardValue[obj.values[i]]}</p>
        </div>
      </div>
      <div class="col ">
        <div class="position-absolute px-2 bottom-0 end-0">
          <i class="fa-solid  fa-flip-vertical  ${cardStyle[obj.types[i]]} ">${
      cardType[obj.types[i]]
    }</i>
        </div>
      </div>`;
    newDiv3.appendChild(newDiv2);
  }
  fragment2.appendChild(newDiv3);
  cardBodyBubble.appendChild(fragment2);
}

/* Event Listenerss */

buttonDraw.addEventListener("click", () => {
  cardBody.replaceChildren();
  valuesToSort.splice(0, valuesToSort.length);
  typesToSort.splice(0, typesToSort.length);
  cardsToDraw = inputCardsToDraw.value;
  newCardHtml();
  inputCardsToDraw.value = "";
});

button.addEventListener("click", function() {
  logCount = 0;
  cardBodyBubble.replaceChildren();
  bubbleSort(valuesToSort, typesToSort);
});
