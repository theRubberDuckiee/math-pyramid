import React, { useState, useEffect } from 'react';
import './MathPyramid.css';
import { generatePyramid, validatePath } from '../utils/mathHelpers';

const MathPyramid = () => {
  const [pyramid, setPyramid] = useState([]);
  const [target, setTarget] = useState(9);
  const [selectedPath, setSelectedPath] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [currentValue, setCurrentValue] = useState(0);
  const [allSolutions, setAllSolutions] = useState([]);
  const [foundSolutions, setFoundSolutions] = useState([]);
  const [duplicateMessage, setDuplicateMessage] = useState('');
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);
  
  useEffect(() => {
    if (pyramid.length > 0) {
      const solutions = calculateAllSolutions();
      setAllSolutions(solutions);
      console.log('🧠 All possible solutions calculated:', solutions);
    }
  }, [pyramid, target]);
  
  useEffect(() => {
    if (duplicateMessage) {
      const timer = setTimeout(() => setDuplicateMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [duplicateMessage]);

  // Function to calculate with proper order of operations
  const calculateWithOrderOfOperations = (blocks) => {
    if (blocks.length === 0) return 0;
    if (blocks.length === 1) return blocks[0].number;
    
    console.log('🧮 Calculating with order of operations:', blocks.map(b => `${b.operation}${b.number}`));
    
    // For 3 blocks, we have: block1.number, block2.operation, block2.number, block3.operation, block3.number
    // Example: -11, +, 1, ×, 3 should be calculated as -11 + (1 × 3) = -11 + 3 = -8
    
    if (blocks.length === 2) {
      const result = blocks[1].operation === '+' ? blocks[0].number + blocks[1].number :
                    blocks[1].operation === '-' ? blocks[0].number - blocks[1].number :
                    blocks[1].operation === '×' ? blocks[0].number * blocks[1].number :
                    blocks[1].operation === '÷' ? blocks[0].number / blocks[1].number : blocks[0].number;
      console.log('🧮 Two blocks result:', result);
      return result;
    }
    
    if (blocks.length === 3) {
      const num1 = blocks[0].number;
      const op1 = blocks[1].operation;
      const num2 = blocks[1].number;
      const op2 = blocks[2].operation;
      const num3 = blocks[2].number;
      
      console.log('🧮 Three blocks:', { num1, op1, num2, op2, num3 });
      
      // Check if we need to handle multiplication/division first
      if (op2 === '×' || op2 === '÷') {
        // Calculate num2 op2 num3 first
        const rightResult = op2 === '×' ? num2 * num3 : num2 / num3;
        console.log('🧮 Right side calculation:', `${num2} ${op2} ${num3} = ${rightResult}`);
        
        // Then apply the first operation
        const finalResult = op1 === '+' ? num1 + rightResult :
                           op1 === '-' ? num1 - rightResult :
                           op1 === '×' ? num1 * rightResult :
                           op1 === '÷' ? num1 / rightResult : num1;
        
        console.log('🧮 Final calculation:', `${num1} ${op1} ${rightResult} = ${finalResult}`);
        return finalResult;
      } else {
        // Left to right calculation
        const leftResult = op1 === '+' ? num1 + num2 :
                          op1 === '-' ? num1 - num2 :
                          op1 === '×' ? num1 * num2 :
                          op1 === '÷' ? num1 / num2 : num1;
        
        console.log('🧮 Left side calculation:', `${num1} ${op1} ${num2} = ${leftResult}`);
        
        const finalResult = op2 === '+' ? leftResult + num3 :
                           op2 === '-' ? leftResult - num3 :
                           op2 === '×' ? leftResult * num3 :
                           op2 === '÷' ? leftResult / num3 : leftResult;
        
        console.log('🧮 Final calculation:', `${leftResult} ${op2} ${num3} = ${finalResult}`);
        return finalResult;
      }
    }
    
    return 0;
  };

  const calculateAllSolutions = () => {
    const solutions = [];
    const blocks = [];
    
    // Flatten pyramid into array of blocks with positions
    pyramid.forEach((row, rowIndex) => {
      row.forEach((block, colIndex) => {
        blocks.push({
          id: `${rowIndex}-${colIndex}`,
          row: rowIndex,
          col: colIndex,
          operation: block.operation,
          number: block.number,
          label: String.fromCharCode(65 + rowIndex * (rowIndex + 1) / 2 + colIndex)
        });
      });
    });
    
    // Generate all combinations of 3 blocks
    for (let i = 0; i < blocks.length; i++) {
      for (let j = i + 1; j < blocks.length; j++) {
        for (let k = j + 1; k < blocks.length; k++) {
          const combo = [blocks[i], blocks[j], blocks[k]];
          
          // Calculate result for this combination with proper order of operations
          const result = calculateWithOrderOfOperations(combo);
          
          if (Math.abs(result - target) < 0.001) {
            solutions.push({
              ids: combo.map(b => b.id).sort(),
              labels: combo.map(b => b.label).sort(),
              result: result
            });
          }
        }
      }
    }
    
    return solutions;
  };
  
  const initializeGame = () => {
    let newPyramid, newTarget, solutions;
    let attempts = 0;
    const maxAttempts = 100;
    
    // Keep generating until we find a board with at least one solution
    do {
      newPyramid = generatePyramid();
      newTarget = Math.floor(Math.random() * 20) + 1; // Random target 1-20
      
      // Test this combination by calculating solutions
      const blocks = [];
      newPyramid.forEach((row, rowIndex) => {
        row.forEach((block, colIndex) => {
          blocks.push({
            id: `${rowIndex}-${colIndex}`,
            row: rowIndex,
            col: colIndex,
            operation: block.operation,
            number: block.number,
            label: String.fromCharCode(65 + rowIndex * (rowIndex + 1) / 2 + colIndex)
          });
        });
      });
      
      solutions = [];
      for (let i = 0; i < blocks.length; i++) {
        for (let j = i + 1; j < blocks.length; j++) {
          for (let k = j + 1; k < blocks.length; k++) {
            const combo = [blocks[i], blocks[j], blocks[k]];
            const result = calculateWithOrderOfOperations(combo);
            
            if (Math.abs(result - newTarget) < 0.001) {
              solutions.push({
                ids: combo.map(b => b.id).sort(),
                labels: combo.map(b => b.label).sort(),
                result: result
              });
            }
          }
        }
      }
      
      attempts++;
      if (attempts >= maxAttempts) {
        console.warn('Could not find a board with solutions after', maxAttempts, 'attempts. Using current board.');
        break;
      }
    } while (solutions.length === 0);
    
    console.log(`✅ Generated board with ${solutions.length} solution(s) after ${attempts} attempt(s)`);
    
    setPyramid(newPyramid);
    setTarget(newTarget);
    setSelectedPath([]);
    setGameWon(false);
    setCurrentValue(0);
    setFoundSolutions([]);
    setDuplicateMessage('');
    setShowHint(false);
  };
  
  const toggleHint = () => {
    setShowHint(!showHint);
  };

  const handleBlockClick = (rowIndex, colIndex, value) => {
    const blockId = `${rowIndex}-${colIndex}`;
    const isSelected = selectedPath.some(p => p.id === blockId);

    if (isSelected) {
      // Remove this block
      const newPath = selectedPath.filter(p => p.id !== blockId);
      setSelectedPath(newPath);
      
      // Recalculate current value
      const newValue = newPath.length === 0 ? 0 : calculateWithOrderOfOperations(newPath);
      setCurrentValue(newValue);
      return;
    }

    // Add block to path
    if (selectedPath.length < 3) {
      const label = String.fromCharCode(65 + rowIndex * (rowIndex + 1) / 2 + colIndex);
      const newBlock = {
        id: blockId,
        row: rowIndex,
        col: colIndex,
        operation: value.operation,
        number: value.number,
        label: label
      };
      const newPath = [...selectedPath, newBlock];
      setSelectedPath(newPath);

      // Calculate current value with proper order of operations
      const newValue = calculateWithOrderOfOperations(newPath);
      setCurrentValue(newValue);

      if (newPath.length === 3) {
        // Check if solution matches the target
        if (Math.abs(newValue - target) < 0.001) {
          const sortedIds = newPath.map(b => b.id).sort();
          const solutionAlreadyFound = foundSolutions.some(solution => 
            JSON.stringify(solution.ids) === JSON.stringify(sortedIds));

          if (solutionAlreadyFound) {
            setDuplicateMessage("You've already chosen these three");
          } else {
            const sortedLabels = newPath.map(b => b.label).sort();
            setFoundSolutions([...foundSolutions, { ids: sortedIds, labels: sortedLabels }]);
          }
        }
        
        // Clear the selection after checking
        setTimeout(() => {
          setSelectedPath([]);
          setCurrentValue(0);
        }, 1500);
      }
    }
  };

  const canAddToPath = (rowIndex, colIndex) => {
    console.log('🔍 canAddToPath check:', {
      targetBlock: `${rowIndex}-${colIndex}`,
      selectedPathLength: selectedPath.length
    });
    
    if (selectedPath.length === 0) {
      const result = rowIndex === 0;
      console.log('🔍 First move check:', { rowIndex, mustBeZero: true, result });
      return result;
    }
    
    const lastBlock = selectedPath[selectedPath.length - 1];
    const lastRow = lastBlock.row;
    const lastCol = lastBlock.col;
    
    console.log('🔍 Path continuation check:', {
      lastBlock: lastBlock.id,
      lastRow,
      lastCol,
      targetRow: rowIndex,
      targetCol: colIndex,
      isNextRow: rowIndex === lastRow + 1,
      isAdjacentCol: colIndex === lastCol || colIndex === lastCol + 1
    });
    
    // Can only move to adjacent blocks in the row below
    const result = rowIndex === lastRow + 1 && (colIndex === lastCol || colIndex === lastCol + 1);
    console.log('🔍 canAddToPath result:', result);
    return result;
  };

  const isBlockSelected = (rowIndex, colIndex) => {
    const result = selectedPath.some(p => p.id === `${rowIndex}-${colIndex}`);
    console.log('🔍 isBlockSelected:', {
      block: `${rowIndex}-${colIndex}`,
      result,
      selectedPath: selectedPath.map(p => p.id)
    });
    return result;
  };

  const isBlockAvailable = (rowIndex, colIndex) => {
    // Any block is available if we haven't selected 3 blocks yet
    // and the block isn't already selected
    const isAlreadySelected = selectedPath.some(p => p.id === `${rowIndex}-${colIndex}`);
    const result = selectedPath.length < 3 && !isAlreadySelected;
    
    console.log('🔍 isBlockAvailable:', {
      block: `${rowIndex}-${colIndex}`,
      result,
      selectedPathLength: selectedPath.length,
      isAlreadySelected,
      maxReached: selectedPath.length >= 3
    });
    return result;
  };

  return (
    <div className="math-pyramid">
      <div className="game-header">
        <div className="prison-puzzle-banner">Prison Puzzle</div>
        <div className="math-pyramid-title">Math Pyramid</div>
      </div>
      
      <div className="game-container">
        <div className="pyramid-section">
          <div className="pyramid-grid">
            {pyramid.map((row, rowIndex) => (
              <div key={rowIndex} className={`pyramid-row row-${rowIndex}`}>
                {row.map((block, colIndex) => {
                  const isSelected = isBlockSelected(rowIndex, colIndex);
                  const isAvailable = isBlockAvailable(rowIndex, colIndex);
                  const blockId = `${rowIndex}-${colIndex}`;
                  
                  console.log('🎨 Rendering block:', {
                    blockId,
                    isSelected,
                    isAvailable,
                    block: { operation: block.operation, number: block.number }
                  });
                  
                  return (
                    <div
                      key={colIndex}
                      className={`pyramid-block ${
                        isSelected ? 'selected' : ''
                      } ${
                        isAvailable ? 'available' : ''
                      }`}
                      onClick={() => {
                        console.log('🖱️ Block clicked:', blockId);
                        handleBlockClick(rowIndex, colIndex, block);
                      }}
                    >
                      <div className="block-label">{String.fromCharCode(65 + rowIndex * (rowIndex + 1) / 2 + colIndex)}</div>
                      <div className="block-content">
                        <span className="operation">{block.operation}</span>
                        <span className="number">{block.number}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        
        <div className="target-section">
          <div className="target-label">TARGET</div>
          <div className="target-value">{target}</div>
          <div className="current-value">
            Current: {Math.round(currentValue * 100) / 100}
          </div>
          
          {duplicateMessage && (
            <div className="duplicate-message">
              {duplicateMessage}
            </div>
          )}
          
          {foundSolutions.length > 0 && (
            <div className="found-solutions">
              <h3>Correct Solutions Found:</h3>
              {foundSolutions.map((solution, index) => (
                <div key={index} className="solution-display">
                  {solution.labels.join(', ')}
                </div>
              ))}
              <div className="progress">
                {foundSolutions.length} / {allSolutions.length} solutions found
              </div>
            </div>
          )}
          
          {foundSolutions.length === allSolutions.length && allSolutions.length > 0 && (
            <div className="win-message">
              🎉 You Won! Found all solutions! 🎉
            </div>
          )}
          
          <div className="button-container">
            <button className="hint-btn" onClick={toggleHint}>
              {showHint ? 'Hide Hint' : 'Hint'}
            </button>
            <button className="new-game-btn" onClick={initializeGame}>
              New Game
            </button>
          </div>
          
          {showHint && (
            <div className="hint-display">
              💡 This board has {allSolutions.length} possible solution{allSolutions.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MathPyramid;

