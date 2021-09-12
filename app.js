// DOM Selectors
let container = document.querySelector('.container');
let select = document.getElementById('pairs');
let reset = document.querySelector('.reset');
let resultsModul = document.querySelector('.modul');
let closeModul = document.querySelector('.closemodul');
let restartBttn = document.querySelector('.restart');
let scoreDigits = document.querySelector('.score-digits');
let countDigits = document.querySelector('.count-digits');
let iconTurn = document.querySelector('.icon-slide');
let textSlide = document.querySelector('.text-slide');
let testTime = document.querySelector('.test');
var appendTens = document.getElementById("tens");
var appendSeconds = document.getElementById("seconds");

// Default Variables
var seconds = 00; 
var tens = 00; 
var Interval ;
let testTest =[];
let result = [];
let resultArr =[];
let click = 0;
let openedCards = [];
let matchedCards=[];

// Functions
// Start Timer
function startTimer () {
  tens++; 

  if(tens <= 9){
    appendTens.innerHTML = "0" + tens;
  }
  
  if (tens > 9){
    appendTens.innerHTML = tens;
    
  } 
  
  if (tens > 99) {
    // console.log("seconds");
    seconds++;
    appendSeconds.innerHTML = "0" + seconds;
    tens = 0;
    appendTens.innerHTML = "0" + 0;
  }
  
  if (seconds > 9){
    appendSeconds.innerHTML = seconds;
  }

};

// Reset Timer
let timerReset = function() {
  clearInterval(Interval);
tens = "00";
seconds = "00";
appendTens.innerHTML = tens;
appendSeconds.innerHTML = seconds;
};

// Fetch pictures from server
const URL = 'https://emoji-api.com/emojis?access_key=bbc936f99d2b4d38f46163d09520f7135d241812';
window.addEventListener('DOMContentLoaded', extData()
);

async function extData(){
  let data = await fetch(URL);
  let response = await data.json();
  let linkReseived = response.map(function(item){
    testTest.push(item);
    
  });
}


//Dynamic Tyles
let dynamTiles = ()=> {
  // Reset to default
    timerReset();
    reset.classList.add('reset-disable');
    textSlide.classList.add('text-slide-dis');
    reset.classList.remove('resetfin');
    let finalCount =0;
    let score=0;
    let matchedCards=[];
  // Catch pair qty
    let value = select.options[select.selectedIndex];
    let qty = value.getAttribute("value");
    let n = (Number(qty));
  // Refresh Pictures Array
    extData();
     result = testTest.filter(rawRes => rawRes.codePoint.length === 5);
    const shuffleArray = array => {
      for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
      };
    }
    shuffleArray(result);


console.log(result);

    result = result.slice(0,n);
    result = result.reduce(function (res, current) {
      return res.concat([current, current])}, []);
    shuffleArray(result);
    console.log(result);
  //HTML Dynamic Code
    let tiles = result.map(function(item){
    return `<div class="flip-card tile" data-id="${item.codePoint}">
              <div class="flip-card-inner">
              <div class="flip-card-front" >
              <i class="fas fa-question"></i>
            </div>
            <div class="flip-card-back" >
              <span>&#x${item.codePoint}</span>
            </div>
              </div>
            </div>`;    
    }).join('');
    console.log(tiles);
    container.innerHTML = tiles;

  //Tile dimensions
    let tileStyles = document.querySelectorAll('.tile');  

    if(qty === "4"){
      tileStyles.forEach(function(tile){
        tile.classList.add('tile_4')
      })
      }else if(qty === "6"){
        tileStyles.forEach(function(tile){
          tile.classList.add('tile_6')
        })}else if(qty === "8"){
          tileStyles.forEach(function(tile){
            tile.classList.add('tile_8')
          })}else if(qty === "10"){
            tileStyles.forEach(function(tile){
              tile.classList.add('tile_10')
            })}else if(qty === "12"){
              tileStyles.forEach(function(tile){
                tile.classList.add('tile_12')
              })}else if(qty === "14"){
                tileStyles.forEach(function(tile){
                  tile.classList.add('tile_14')
                })}else if(qty === "16"){
                  tileStyles.forEach(function(tile){
                    tile.classList.add('tile_16')
                  })}else if(qty === "18"){
                    tileStyles.forEach(function(tile){
                      tile.classList.add('tile_18')
                    })}else if(qty === "20"){
                      tileStyles.forEach(function(tile){
                        tile.classList.add('tile_20')
                      })}
 


   

// Game Mechanics
tileStyles.forEach(function(tile){   
  tile.addEventListener("click",
    function(e){
      // start timer
        if(click === 0){
        clearInterval(Interval);
        Interval = setInterval(startTimer, 10);
        };
        //add Restart button;
        if(click === 0){
          reset.classList.remove('reset-disable');
          textSlide.classList.remove('text-slide-dis');
        }
      // Before 2 cards flipped
        if(click < 2){
        if( e.currentTarget.classList.contains('flipped-card')){}else{
          e.currentTarget.classList.add('flipped-card');
          click++;
          score++;
          // Moves Count
            finalCount = score/2;
            if(Number.isInteger(finalCount)){
            countDigits.textContent = finalCount;
          };
          // Cards Comparison
            let id = e.currentTarget.dataset.id;  
            openedCards.push(this);
            resultArr.push(id);
          //  Not matched
            if(click === 2 && resultArr[0] !== resultArr[1]){     
            resultArr=[];
            // console.log(resultArr)
            setTimeout(function(){
              openedCards[0].classList.remove('flipped-card');
              openedCards[1].classList.remove('flipped-card');
              openedCards =[];
              click = 0;
            }, 800);
          //  matched
            }else if(click === 2 && resultArr[0] === resultArr[1]){
              resultArr=[];
              setTimeout(function(){
                openedCards[0].children[0].children[1].classList.add('match');
                openedCards[1].children[0].children[1].classList.add('match');
                matchedCards.push(openedCards[0]);
                matchedCards.push(openedCards[1]);
                // console.log(matchedCards);
                // Game Finished
                if(matchedCards.length === n*2){
                  resultsModul.classList.add('modul-show');
                  clearInterval(Interval);
                  scoreDigits.textContent = seconds + ':' + tens;
                  container.innerHTML = `<p>Choose a game size or press START OVER button</p>
                  <span>
                  <img src="./Media/dm4uz3-foekoe.gif" alt="zzz" id="zzz">
              </span>`
                }
                openedCards =[];
                click = 0;
              }, 500);
            }
        }
        }else{};
    });
});  
}

// Event Listeners
// Tiles Refresh When Qty Selected
  select.addEventListener('change',dynamTiles);
// Start Over Button Pressed
  reset.addEventListener('mousedown',function(){

    dynamTiles();
    timerReset();
  });
// Results Chart Closed with X
  closeModul.addEventListener('click', function(){
    resultsModul.classList.remove('modul-show');
    reset.classList.add('resetfin');
  });
// Play Again button in the chart pressed
restartBttn.addEventListener('click', function(){
  resultsModul.classList.remove('modul-show');
    dynamTiles();
    timerReset();
  }); 
  window.addEventListener("DOMContentLoaded",function(){
    reset.classList.add('reset-disable');
    textSlide.classList.add('text-slide-dis');
  })

// Code Finished
