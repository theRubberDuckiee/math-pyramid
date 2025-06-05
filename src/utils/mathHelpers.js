// Math utility functions for the pyramid game

/**
 * Generates a random number between min and max (inclusive)
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random number between min and max
 */
export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Validates if a path through the pyramid reaches the target
 * @param {Array} path - Array of selected blocks
 * @param {number} target - Target value to reach
 * @returns {boolean} True if the path equals the target
 */
export const validatePath = (path, target) => {
  const result = path.reduce((sum, block, index) => {
    if (index === 0) return block.number;
    
    const operation = block.operation;
    const number = block.number;
    
    switch (operation) {
      case '+':
        return sum + number;
      case '-':
        return sum - number;
      case '×':
        return sum * number;
      case '÷':
        return sum / number;
      default:
        return sum;
    }
  }, 0);
  
  return Math.abs(result - target) < 0.001; // Account for floating point precision
};

/**
 * Generates a new pyramid puzzle based on the reference image
 * @param {number} levels - Number of levels in the pyramid (default 4)
 * @returns {Array} 2D array representing the pyramid
 */
export const generatePyramid = (levels = 4) => {
  // Create the exact pyramid from the reference image
  const pyramid = [
    // Row 0 (top)
    [{ operation: '+', number: 1 }],
    
    // Row 1
    [{ operation: '÷', number: 4 }, { operation: '×', number: 3 }],
    
    // Row 2
    [{ operation: '-', number: 10 }, { operation: '÷', number: 5 }, { operation: '×', number: 6 }],
    
    // Row 3 (bottom)
    [{ operation: '-', number: 11 }, { operation: '+', number: 7 }, { operation: '÷', number: 9 }, { operation: '+', number: 9 }]
  ];
  
  return pyramid;
};

/**
 * Generates a random pyramid puzzle
 * @param {number} levels - Number of levels in the pyramid
 * @param {number} targetValue - Target value to reach
 * @returns {Array} 2D array representing the pyramid
 */
export const generateRandomPyramid = (levels = 4, targetValue = null) => {
  const operations = ['+', '-', '×', '÷'];
  const pyramid = [];
  
  for (let row = 0; row < levels; row++) {
    const rowData = [];
    const blocksInRow = row + 1;
    
    for (let col = 0; col < blocksInRow; col++) {
      const operation = row === 0 ? '+' : operations[getRandomNumber(0, 3)];
      const number = getRandomNumber(1, 12);
      
      rowData.push({ operation, number });
    }
    
    pyramid.push(rowData);
  }
  
  return pyramid;
};

/**
 * Calculates the result of following a specific path through the pyramid
 * @param {Array} pyramid - The pyramid structure
 * @param {Array} path - Array of {row, col} coordinates
 * @returns {number} The calculated result
 */
export const calculatePathResult = (pyramid, path) => {
  return path.reduce((result, position, index) => {
    const block = pyramid[position.row][position.col];
    
    if (index === 0) {
      return block.number;
    }
    
    switch (block.operation) {
      case '+':
        return result + block.number;
      case '-':
        return result - block.number;
      case '×':
        return result * block.number;
      case '÷':
        return result / block.number;
      default:
        return result;
    }
  }, 0);
};

/**
 * Finds all possible paths from top to bottom of the pyramid
 * @param {Array} pyramid - The pyramid structure
 * @returns {Array} Array of all possible paths
 */
export const findAllPaths = (pyramid) => {
  const paths = [];
  
  const findPaths = (row, col, currentPath) => {
    currentPath.push({ row, col });
    
    if (row === pyramid.length - 1) {
      // Reached bottom, save this path
      paths.push([...currentPath]);
    } else {
      // Continue to next row
      findPaths(row + 1, col, currentPath);
      findPaths(row + 1, col + 1, currentPath);
    }
    
    currentPath.pop();
  };
  
  findPaths(0, 0, []);
  return paths;
};

