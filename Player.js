
class Player {

  constructor(cell){
    this.i = cell.i;
    this.j = cell.j;
    this.x = this.i*w;
    this.y = this.j*w;
  }

  show(){
    fill(100);
    noStroke();
    // rect(this.x, this.y, w, w, 20);
    image(playerSprite, this.x, this.y, w, w);
  }

  updatePos(nextCell, nextBoxCell){
    if(nextCell && !nextCell.blocked) {

      if (nextCell.occupied) {
        if(nextBoxCell && !nextBoxCell.blocked && !nextBoxCell.occupied) {
          nextBoxCell.box = nextCell.box;
          nextBoxCell.occupied = true;
          nextCell.occupied = false;
          if (nextCell.storageFilled) {
            nextCell.storageFilled = false;
            filledStorages--;
          }
        } else {return;}
      }

      this.x = nextCell.i*w;
      this.y = nextCell.j*w;
      this.i = nextCell.i;
      this.j = nextCell.j;
      increaseSteps();
    }
  }

}
