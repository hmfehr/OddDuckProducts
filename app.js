'use strict';

//******* class folow along */

console.log('oh hello there');

/// GLOBAL VARIABLES
let voteTotal = 25;
let productArray = [];

// DOM RENDERING
let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

let resultsBtn = document.getElementById('showresultsbtn');
let resultsContainer = document.getElementById('results-container');

//canvas element

let canvasElem = document.getElementById('myChart').getContext('2d');

// CONSTRUCTOR FUNCTION ODD PRODUCTS

function OddProducts(name, fileExtention = 'jpg') {
  this.name = name;
  this.img = `img/${name}.${fileExtention}`;
  this.views = 0;
  this.clicks = 0;

  productArray.push(this);
}

// HELPER FUNCTION / UTILITIES
function randomProduct() {
  return Math.floor(Math.random() * productArray.length);
}

function renderImg() {
  let imgOneIndex = randomProduct();
  let imgTwoIndex = randomProduct();
  let imgThreeIndex = randomProduct();

  // while (imgOneIndex === imgTwoIndex || imgTwoIndex === imgThreeIndex) {
  //   imgTwoIndex = randomProduct();
  // }

  // while (imgThreeIndex === imgOneIndex || imgThreeIndex === imgTwo) {
  //   imgThreeIndex = randomProduct();
  // }
  while (productArray.length < 6) {
    let randomIndex = randomIndex();
    if (!productArray.includes(randomIndex)) {
      productArray.push(randomIndex);
    }
  }

  imgOne.src = productArray[imgOneIndex].img;
  imgTwo.src = productArray[imgTwoIndex].img;
  imgThree.src = productArray[imgThreeIndex].img;

  productArray[imgOneIndex].views++;
  productArray[imgTwoIndex].views++;
  productArray[imgThreeIndex].views++;

  imgOne.alt = productArray[imgOneIndex].name;
  imgTwo.alt = productArray[imgTwoIndex].name;
  imgThree.alt = productArray[imgThreeIndex].name;
}

// chart function

function renderChart() {
  let productName = [];
  let voteCount = [];
  let productViews = [];

  for (let i = 0; i < productArray.length; i++) {
    productName.push(productArray[i].name);
    voteCount.push(productArray[i].clicks);
    productViews.push(productArray[i].views);
  }

  let myChartObj = {
    type: 'bar',
    data: {
      labels: productName,
      datasets: [
        {
          data: voteCount,
          label: '# of Votes',
          backgroundColor: ['green'],
          borderColor: ['green'],
          borderWidth: 1,
        },
        {
          data: productViews,
          label: '# of Views',
          backgroundColor: ['blue'],
          borderColor: ['blue'],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  new Chart(canvasElem, myChartObj);
}

// EVENT HANDLERS

function handleClick(event) {
  // console.dir(event.target);
  let imgClicked = event.target.alt;

  for (let i = 0; i < productArray.length; i++) {
    if (productArray[i].name === imgClicked) {
      productArray[i].clicks++;
    }
  }
  voteTotal--;

  renderImg();

  if (voteTotal === 0) {
    imgContainer.removeEventListener('click', handleClick);
    renderChart();
  }
}

function handleShowResults() {
  if (voteTotal === 0) {
    //     // for (let i = 0; i < productArray.length; i++) {
    //     //   let liElm = document.createElement('li');
    //     //   liElm.textContent = `${productArray[i].name} was viewed: ${productArray[i].views} and clicked: ${productArray[i].clicks}`;
    //     //   resultsContainer.appendChild(liElm);
    //     // }
    resultsBtn.removeEventListener('click', handleShowResults);
  }
}

//EXCUTABLE CODE
// ! OBJ CREATION
new OddProducts('bag');
new OddProducts('banana');
new OddProducts('bathroom');
new OddProducts('boots');
new OddProducts('breakfast');
new OddProducts('bubblegum');
new OddProducts('chair');
new OddProducts('cthulhu');
new OddProducts('dog-duck');
new OddProducts('dragon');
new OddProducts('pen');
new OddProducts('pet-sweep');
new OddProducts('scissors');
new OddProducts('shark');
new OddProducts('sweep', 'png');
new OddProducts('tauntaun');
new OddProducts('unicorn');
new OddProducts('water-can');
new OddProducts('wine-glass');

renderImg();

imgContainer.addEventListener('click', handleClick);
resultsBtn.addEventListener('click', handleShowResults);
