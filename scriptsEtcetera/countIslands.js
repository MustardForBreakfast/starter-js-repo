/**
 * Interview Question: Count Islands
 *
 * Given a two dimensional, rectangular grid of tiles - which can be either
 * "land" tiles or "water" tiles - write a function that returns the number
 * of islands in the grid.
 *
 * "Land" tiles are represented as 1s
 * "Water" tiles are represented as 0s.
 *
 * An "island" is a contiguous group of land tiles that share borders along
 * their north, south, east, or west edges. Diagonal borders don't count.
 *
 * The grid does not "wrap around" - e.g. a land tile on the far right edge
 * of the grid does not inherently share an island with a land tile on the
 * far left edge of the grid. In other words, any hypothetical tiles off
 * the edge of the grid in any direction can be considered "water".
 */

const testInput = [
  [1, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 0],
  [0, 0, 1, 0, 0, 0],
  [0, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 1],
];

const expectedIslands = 4;

/**
 * Justin's planning/solution code below.
 */

// length of outer array: height (y)
// length of inner arrays: width (x)

/**
 * detect all contiguous land, convert to water as you go to prevent from
 * double-checking.
 *
 * Overall algo:
 *
 *   iterate through each tile on the map
 *
 *     for each tile:
 *      - if its water, continue
 *      - if its land:
 *        - increment island count by 1
 *        - flood all other land tiles that share its island (to avoid
 *          double-counting them later)
 *
 *   return the island count at the end.
 */

/**
 * floodTile
 * - flips tile from 1 to 0
 *
 * floodIsland(x,y)
 * - flood current location (if necessary)
 * - check right (x+1, y).
 *    - if land, floodIsland(right coords)
 *      - dont barf on OOB. consider that to be water
 *    - if water, return
 * -
 * - check left, up, down, in same manner
 *
 */

/**
 * Return whether a given grid location is a land tile.
 *
 * @param {*} tileMap
 * @param {*} coords
 * @returns {boolean}
 */
const isLand = (tileMap, coords) => {
  const [x, y] = coords;

  const height = tileMap.length;
  const width = height > 0 ? tileMap[0].length : 0;

  // If specified tile is out of bounds, it counts as water.
  if (y >= height || x >= width || x < 0 || y < 0) {
    return false;
  }
  return tileMap[y][x] === 1;
};

/**
 * Return a new tileMap with the specified location converted to water.
 *
 * @param {*} tileMap represents a game board
 * @param {*} tile an x,y coordinate pair specifying a map location
 * @returns a tile map
 */
const floodTile = (tileMap, coords) => {
  const [x, y] = coords;
  const height = tileMap.length;
  const width = height > 0 ? tileMap[0].length : 0;

  // Don't break if tile is specified out of bounds. Just noop.
  if (y >= height || x >= width || x < 0 || y < 0) {
    return tileMap;
  }

  return tileMap.map((row, i) => {
    if (i === y) {
      let floodedRow = [...row];
      floodedRow[x] = 0;
      return floodedRow;
    }
    return row;
  });
  return [[0]];
};

/**
 * Return a new tileMap with the specified island flooded - i.e. with all
 * land tiles contiguous with a starting location converted to water tiles.
 *
 * @param {*} tileMap represents a game board
 * @param {*} startCoords a starting location to flood, e.g. [x,y]
 * @returns a tile map with the specified island flooded.
 */
const floodIsland = (tileMap, startCoords) => {
  const [x, y] = startCoords;

  // flood current location
  let flooded = floodTile(tileMap, startCoords);

  // flood any land to the right
  if (isLand(flooded, [x + 1, y])) {
    flooded = floodIsland(flooded, [x + 1, y]);
  }
  // flood any land to the left
  if (isLand(flooded, [x - 1, y])) {
    flooded = floodIsland(flooded, [x - 1, y]);
  }
  // flood any land above
  if (isLand(flooded, [x, y - 1])) {
    flooded = floodIsland(flooded, [x, y - 1]);
  }
  // flood any land below
  if (isLand(flooded, [x, y + 1])) {
    flooded = floodIsland(flooded, [x, y + 1]);
  }
  return flooded;
};

/**
 * Count the islands on a game map. An island consists of a contiguous series
 *  of "land" tiles (excluding diagonals).
 *
 * @param {*} tileMap represents a game board
 * @returns number of islands on the map
 */
const countIslands = (tileMap) => {
  const height = tileMap.length;
  const width = height > 0 ? tileMap[0].length : 0;

  let islands = 0;
  let currentMap = tileMap;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (isLand(currentMap, [x, y])) {
        islands++;
        currentMap = floodIsland(currentMap, [x, y]);
      }
    }
  }

  return islands;
};

const result = countIslands(testInput);
console.log(`Detected: ${result}`);
console.log(`Expected: ${expectedIslands}`);

if (result === expectedIslands) {
  console.log("PASS!");
} else {
  console.log("FAIL.");
}
