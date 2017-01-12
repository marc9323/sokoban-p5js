const w = 30;

let rows, cols, p1, level,
    playerSprite, boxSprite, wallSprite, storageSprite,
    steps = 0,
    filledStorages = 0,
    boxes = [],
    storages = [],
    grid = [];

function preload() {
  playerSprite = loadImage("assets/sprites/pink-circle.png");
  boxSprite = loadImage("assets/sprites/boxes/obj_crate00"+ Math.ceil(Math.random() * 5) +".png");
  wallSprite = loadImage("assets/sprites/wall.jpg");
  storageSprite = loadImage("assets/sprites/storage-spot.png");
}

function setup() {
  createCanvas(600, 600);
  cols = floor(width/w);
  rows = floor(height/w);
  initLevel();
}

function draw() {
  background(180);

  // draw wall
  level.displayWalls.forEach(coords => grid[index(coords[0], coords[1])].placeWall())
  // draw storage
  storages.forEach(cell => cell.placeStorage())
  // draw crate
  grid.forEach((cell, i) => cell.showCrate())
  // draw player
  p1.show();

  if(hasLevelEnd()) endLevel();
}

function keyPressed() {
  if(keyCode === LEFT_ARROW)
    p1.updatePos(grid[index(p1.i-1, p1.j)], grid[index(p1.i-2, p1.j)]);
  if(keyCode === RIGHT_ARROW)
    p1.updatePos(grid[index(p1.i+1, p1.j)], grid[index(p1.i+2, p1.j)]);
  if(keyCode === UP_ARROW)
    p1.updatePos(grid[index(p1.i, p1.j-1)], grid[index(p1.i, p1.j-2)]);
  if(keyCode === DOWN_ARROW)
    p1.updatePos(grid[index(p1.i, p1.j+1)], grid[index(p1.i, p1.j+2)]);
}

/* HELPERS */

function initLevel() {
  level = getLevel();
  steps = 0;

  document.querySelector('.level-counter').textContent = 'Level ' + level.num;
  document.querySelector('.steps-counter').textContent = 'Steps ' + steps;

  filledStorages = 0;
  boxes = [];
  storages = [];
  grid = [];

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  level.posCrates.forEach(coords => boxes.push(new Box(grid[index(coords[0], coords[1])])))
  level.posStorage.forEach(coords => storages.push(grid[index(coords[0], coords[1])]));

  p1 = new Player(level.posP1);
}

function endLevel(){
  let next = level.next();
  if(next)
    setLevel(level.next().index)
  else {
    alert("Oh my god, you've finished! Good Bye.");
    localStorage.clear();
  }
  initLevel();
}

// Return the index of the cell in the grid list
function index(i, j){
  if(i < 0 || j < 0 || i > cols-1 || j > rows-1)
    return -1
  else
    return i + j * cols
}

function hasLevelEnd() {
  storages.forEach(cell => {
    if (cell.occupied && !cell.storageFilled) {
      cell.storageFilled = true;
      filledStorages++;
    }
  })
  return level.numStorages == filledStorages
}

function increaseSteps() {
  steps++;
  document.querySelector('.steps-counter').textContent = 'Steps ' + steps;
}

function setLevel(lvlIndex){
  localStorage.setItem('level', lvlIndex);
}
function getLevel(){
  let index = localStorage.getItem('level') || 0;
  return Levels[index];
}
