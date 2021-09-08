
// general setup
let container = document.querySelector('.container')
let select = document.getElementById('pairs');
let moveNumber = document.getElementById('movenumber')
let reset = document.querySelector('.reset')
let resultsModul = document.querySelector('.modul')
let closeModul = document.querySelector('.closemodul')
let restartBttn = document.querySelector('.restart')
let scoreDigits = document.querySelector('.score-digits')
let countDigits = document.querySelector('.count-digits')
let iconTurn = document.querySelector('.icon-slide')
let textSlide = document.querySelector('.text-slide')


//Dynamic Tyles and Shuffle
let dynamTiles = ()=> {
  moveNumber.textContent = 0;
  reset.classList.remove('resetfin')
  let finalCount =0;
  let score=0;
  let value = select.options[select.selectedIndex];
  let qty = value.getAttribute("value")
  let n = (Number(qty)) ;
  let tileCount= [];
  let testTest = [];
  console.log(testTest)
  tileCount =  Array.from(Array(n).keys());
  tileCount = tileCount.reduce(function (res, current) {
    return res.concat([current, current]);}, []);
  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
  shuffleArray(tileCount);

//Code Generation

  let tiles = tileCount.map(function(item){
       return item = `<div class="flip-card tile" data-id="${item+1}">
            <div class="flip-card-inner">
              <div class="flip-card-front" >
              <i class="fas fa-question"></i>
              </div>
              <div class="flip-card-back" >
              <p>${item+1}</p>
              </div>
            </div>
          </div>`;    
   }).join('');
  container.innerHTML = tiles;





//   Tile dimensions
 let tileStyle = document.querySelector('.tile');
 let tileWidth = tileStyle.getBoundingClientRect().width;
 let tileHeight = tileStyle.getBoundingClientRect().height;

 if(qty === "4"){
  container.style.width = ((tileWidth+1)*tileCount.length)/2 +'px';
  container.style.height = ((tileHeight*2)+2) + 'px';
  }else if(qty === "18"){
  container.style.width = ((tileWidth+1)*tileCount.length)/6 +'px';
  container.style.height = ((tileHeight*6)+2) + 'px';}
  else if(qty === "20"){
      container.style.width = ((tileWidth+1)*tileCount.length)/5 +'px';
      container.style.height = ((tileHeight*5)+2) + 'px';}
  else{
  container.style.width = ((tileWidth+1)*tileCount.length)/4 +'px';
  container.style.height = ((tileHeight*4)+2) + 'px';}

  let tileStyles = document.querySelectorAll('.tile');   

  let resultArr =[];
  let click = 0;
  let openedCards = [];
  let matchedCards=[];
 
 

  

  tileStyles.forEach(function(tile){
      
    tile.addEventListener("click",
      function(e){
          if(click < 2){
              if( e.currentTarget.classList.contains('flipped-card')){}else{
      e.currentTarget.classList.add('flipped-card');
      click++;
      score++;
      finalCount = score/2;
      let finalScore = 100;
      let m = finalCount-(n+(n*0.5));

      if(finalCount <= n+2){
       finalScore = finalScore;
       console.log(finalScore)
      }else{
          for(i=1;i<m; i++){
              console.log(i)
              finalScore = finalScore-(finalScore*0.1);
              finalScore = Math.round(finalScore)
          }
          console.log(finalScore)

      
      }

      if(Number.isInteger(finalCount)){
      moveNumber.textContent = finalCount;
      countDigits.textContent = finalCount;
      scoreDigits.textContent = finalScore;
    
    };
     

      let id = e.currentTarget.dataset.id;  
      openedCards.push(this);
      resultArr.push(id);
     
      if(click === 2 && resultArr[0] !== resultArr[1]){
          
   resultArr=[];
   
   setTimeout(function(){
      openedCards[0].classList.remove('flipped-card');
      openedCards[1].classList.remove('flipped-card');
      openedCards =[];
      click = 0;
   }, 800);
  }else if(click === 2 && resultArr[0] === resultArr[1]){
    resultArr=[];
    setTimeout(function(){
        openedCards[0].children[0].children[1].classList.add('match');
        openedCards[1].children[0].children[1].classList.add('match');
        matchedCards.push(openedCards[0]);
        matchedCards.push(openedCards[1]);
        console.log(matchedCards)
        if(matchedCards.length === n*2){
            resultsModul.classList.add('modul-show');
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

select.addEventListener('change',dynamTiles);
reset.addEventListener('mousedown',function(){
    iconTurn.classList.add('reset-click');
    textSlide.classList.add('text-none')
    dynamTiles();
 
});

closeModul.addEventListener('click', function(){
    resultsModul.classList.remove('modul-show');
    reset.classList.add('resetfin')
});
restartBttn.addEventListener('click', function(){
    resultsModul.classList.remove('modul-show');
    dynamTiles();
    
});

const URL = 'https://picsum.photos/v2/list?page=2&limit=100';
window.addEventListener('DOMContentLoaded', async ()=>{
  let data = await fetch(URL);
  let response = await data.json();
  dataSet(response);
}
);

let dataSet = (item)=>{
  for(i=0;i<item.length;i++){
    console.log(item[i].download_url)
  }
  };


