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
      console.log("seconds");
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
  const URL = 'https://picsum.photos/v2/list?page=2&limit=100';
  window.addEventListener('DOMContentLoaded', extData()
  );

  async function extData(){
    let data = await fetch(URL);
    let response = await data.json();
    let linkReseived = response.map(function(item){
      testTest.push(item.download_url);
    });
  }


//Dynamic Tyles
  let dynamTiles = ()=> {
    // Reset to default
      timerReset();
      reset.classList.remove('resetfin');
      let finalCount =0;
      let score=0;
    // Catch pair qty
      let value = select.options[select.selectedIndex];
      let qty = value.getAttribute("value");
      let n = (Number(qty));
    // Refresh Pictures Array
      extData();
      const shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        };
      }
      shuffleArray(testTest);

      testTest = testTest.slice(0,n);
      testTest = testTest.reduce(function (res, current) {
        return res.concat([current, current])}, []);
      shuffleArray(testTest);

    //HTML Dynamic Code
      let tiles = testTest.map(function(item){
      return `<div class="flip-card tile" data-id="${item.slice(25,28)}">
                <div class="flip-card-inner">
                <div class="flip-card-front" >
                <i class="fas fa-question"></i>
              </div>
              <div class="flip-card-back" >
                <img src="${item}" alt="random picture">
              </div>
                </div>
              </div>`;    
      }).join('');
      console.log(tiles);
      container.innerHTML = tiles;

    //Tile dimensions
      let tileStyle = document.querySelector('.tile');
      let tileWidth = tileStyle.getBoundingClientRect().width;
      let tileHeight = tileStyle.getBoundingClientRect().height;
      if(qty === "4"){
        container.style.width = ((tileWidth+1)*testTest.length)/2 +'px';
        container.style.height = ((tileHeight*2)+2) + 'px';
        }else if(qty === "18"){
        container.style.width = ((tileWidth+1)*testTest.length)/6 +'px';
        container.style.height = ((tileHeight*6)+2) + 'px';}
        else if(qty === "20"){
            container.style.width = ((tileWidth+1)*testTest.length)/5 +'px';
            container.style.height = ((tileHeight*5)+2) + 'px';}
        else{
        container.style.width = ((tileWidth+1)*testTest.length)/4 +'px';
        container.style.height = ((tileHeight*4)+2) + 'px';}

      let tileStyles = document.querySelectorAll('.tile');   

// Game Mechanics
  tileStyles.forEach(function(tile){   
    tile.addEventListener("click",
      function(e){
        // start timer
          if(click === 0){
          clearInterval(Interval);
          Interval = setInterval(startTimer, 10);
          };
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
              console.log(resultArr)
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
                  console.log(matchedCards);
                  // Game Finished
                  if(matchedCards.length === n*2){
                    resultsModul.classList.add('modul-show');
                    clearInterval(Interval);
                    scoreDigits.textContent = seconds + ':' + tens;
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
      iconTurn.classList.add('reset-click');
      textSlide.classList.add('text-none');
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

// Code Finished
