class Box {
  constructor(cell){
    this.i = cell.i;
    this.j = cell.j;
    this.x = this.i*w;
    this.y = this.j*w;
    cell.occupied = true;
    cell.box = this;
  }
}
