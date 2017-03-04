var fs = require('fs'),
    readline = require('readline'),
    path = require('path');

const pathLevels = path.join(__dirname, '../config', 'sokoban_levels.txt');

var rd = readline.createInterface({
    input: fs.createReadStream(pathLevels),
    output: process.stdout,
    terminal: false
});

function createMapCoords() {
  return { player: [], crates: [], storages: [], walls: [] }
}

let mapCoords = createMapCoords(),
  levels = [], x = 0, lvl = 0;

// Read line by line of a txt with the levels and map it
rd.on('line', function(line) {

    if(line.length === 0) {
      lvl++; x = 0;
      mapCoords = createMapCoords();
      return;
    }

    levels[lvl] = mapCoords;

    for(let col = 0; col < line.length; col++) {
      if (line[col] == "#")
        mapCoords.walls.push([x, col])
      if (line[col] == ".")
        mapCoords.storages.push([x, col])
      if (line[col] == "o")
        mapCoords.crates.push([x, col])
      if (line[col] == "@")
        mapCoords.player.push([x, col])
    }

    x++;
});

// Write a js file with a list with all the levels
rd.on('close', function(line) {
  let jsFile = path.join(__dirname, '../dist/', 'loadedLevels.js');
  let data = "const allLevels = ".concat(JSON.stringify(levels));
  fs.writeFile(jsFile, data);
})
