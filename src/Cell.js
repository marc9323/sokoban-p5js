class Cell {
  constructor(i, j){
    this.i = i;
    this.j = j;
    this.x = i*w;
    this.y = j*w;
    this.walls = [true, true, true, true];
    this.blocked = false;
    this.occupied = false;
    this.storageFilled = false;
  }

  showGrid(){
    stroke(200);
    if(this.walls[0])
      line(this.x  , this.y  , this.x+w, this.y); //Ponto superior esquerdo ao Ponto superior direito
    if(this.walls[1])
      line(this.x+w, this.y  , this.x+w, this.y+w);
    if(this.walls[2])
      line(this.x+w, this.y+w, this.x  , this.y+w);
    if(this.walls[3])
      line(this.x  , this.y+w, this.x  , this.y);
  }

  showCrate(){
    if (this.occupied) {
      fill(227, 240, 107);
      image(boxSprite, this.x+2, this.y+2, w-5, w-5);
      // rect(this.x+2, this.y+2, w-5, w-5, 10);
    }
  }

  // Fill borders with wall
  margin(){
    if(this.i === 0
      || this.j === 0
      || this.j === cols-1
      || this.i === rows-1) {
      this.placeWall()
    }
  }

  placeWall(){
    fill(20);
    image(wallSprite, this.x,this.y,w,w);
    this.blocked = true;
    // rect(this.x,this.y,w,w);
  }

  placeStorage(){
    fill(0, 100, 100);
    image(storageSprite, this.x,this.y,w,w);
    // rect(this.x,this.y,w,w);
  }

}
