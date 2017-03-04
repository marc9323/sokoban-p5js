class Level {
  constructor(num, posP1, posCrates, posStorage, walls){
    this.num = num;
    this.index = num-1;
    this.posP1 = posP1;
    this.posCrates = posCrates;
    this.posStorage = posStorage;
    this.displayWalls = walls;
    this.numStorages = posStorage.length;
  }
  next() {
    return Levels[this.index+1];
  }
}

const Levels = allLevels.map((lvl, i) => {
  return new Level(i+1,
    new Cell(lvl.player[0][0], lvl.player[0][1]), //player position
    lvl.crates, //crates position
    lvl.storages, //storages position
    lvl.walls) //walls position
});
