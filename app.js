// general setup
let container = document.querySelector('.container')
let select = document.getElementById('pairs');



//Dynamic Tyles and Shuffle
let dynamTiles = ()=> {
  let value = select.options[select.selectedIndex];
  let qty = value.getAttribute("value")
  let n = (Number(qty)) ;
  let tileCount= [];
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

  tileStyles.forEach(function(tile){
    tile.addEventListener("click",
      function(e){
      e.currentTarget.classList.add('flipped-card');
      click++;

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
   }, 1000);
  }else if(click === 2 && resultArr[0] === resultArr[1]){
    resultArr=[];
    setTimeout(function(){
        openedCards[0].children[0].children[1].classList.add('match');
        openedCards[1].children[0].children[1].classList.add('match');
        openedCards =[];
        click = 0;
     }, 500);
   }
  });
 });  
}

select.addEventListener('change',dynamTiles);
