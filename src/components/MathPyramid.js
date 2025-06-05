import React, { useState, useEffect } from 'react';
import './MathPyramid.css';
import { generatePyramid, validatePath } from '../utils/mathHelpers';

const MathPyramid = () => {
  const [pyramid, setPyramid] = useState([]);
  const [target, setTarget] = useState(9);
  const [selectedPath, setSelectedPath] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const newPyramid = generatePyramid();
    setPyramid(newPyramid);
    setSelectedPath([]);
    setGameWon(false);
    setCurrentValue(0);
  };

  const handleBlockClick = (rowIndex, colIndex, value) => {
    console.log('🔷 BLOCK CLICK:', {
      blockId: `${rowIndex}-${colIndex}`,
      rowIndex,
      colIndex,
      value,
      gameWon,
      selectedPathLength: selectedPath.length,
      selectedPath: selectedPath.map(p => p.id)
    });
    
    if (gameWon) {
      console.log('❌ Click blocked: Game already won');
      return;
    }
    
    const blockId = `${rowIndex}-${colIndex}`;
    const isSelected = selectedPath.some(p => p.id === blockId);
    
    console.log('🔍 Block status check:', {
      blockId,
      isSelected,
      selectedPath: selectedPath.map(p => p.id)
    });
    
    if (isSelected) {
      console.log('🗑️ REMOVING BLOCK from path');
      // Remove this block and all blocks after it
      const blockIndex = selectedPath.findIndex(p => p.id === blockId);
      const newPath = selectedPath.slice(0, blockIndex);
      console.log('📝 New path after removal:', newPath.map(p => p.id));
      setSelectedPath(newPath);
      
      // Recalculate current value
      const newValue = newPath.length === 0 ? 0 : newPath.reduce((sum, block, index) => {
        if (index === 0) return block.number;
        return block.operation === '+' ? sum + block.number : 
               block.operation === '-' ? sum - block.number :
               block.operation === '×' ? sum * block.number :
               block.operation === '÷' ? sum / block.number : sum;
      }, 0);
      console.log('🧮 Recalculated value:', newValue);
      setCurrentValue(newValue);
      setGameWon(false); // Reset game won state when removing blocks
    } else {
      // Check if this block can be added to the path
      const canAdd = selectedPath.length === 0 ? rowIndex === 0 : canAddToPath(rowIndex, colIndex);
      console.log('✅ Can add check:', {
        canAdd,
        selectedPathLength: selectedPath.length,
        isFirstMove: selectedPath.length === 0,
        isTopRow: rowIndex === 0,
        canAddToPathResult: selectedPath.length === 0 ? 'N/A (first move)' : canAddToPath(rowIndex, colIndex)
      });
      
      if (canAdd) {
        console.log('➕ ADDING BLOCK to path');
        const newBlock = { 
          id: blockId, 
          row: rowIndex, 
          col: colIndex, 
          operation: value.operation, 
          number: value.number 
        };
        const newPath = [...selectedPath, newBlock];
        console.log('📝 New path after addition:', newPath.map(p => p.id));
        setSelectedPath(newPath);
        
        // Calculate new value
        const newValue = newPath.reduce((sum, block, index) => {
          if (index === 0) return block.number;
          return block.operation === '+' ? sum + block.number : 
                 block.operation === '-' ? sum - block.number :
                 block.operation === '×' ? sum * block.number :
                 block.operation === '÷' ? sum / block.number : sum;
        }, 0);
        console.log('🧮 Calculated new value:', newValue, 'Target:', target);
        setCurrentValue(newValue);
        
        if (Math.abs(newValue - target) < 0.001) { // Use small epsilon for floating point comparison
          console.log('🎉 GAME WON!');
          setGameWon(true);
        }
      } else {
        console.log('❌ Cannot add block - invalid move');
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
    let result;
    if (selectedPath.length === 0) {
      result = rowIndex === 0;
    } else {
      result = canAddToPath(rowIndex, colIndex);
    }
    console.log('🔍 isBlockAvailable:', {
      block: `${rowIndex}-${colIndex}`,
      result,
      selectedPathLength: selectedPath.length
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
          {gameWon && (
            <div className="win-message">
              🎉 You Won! 🎉
            </div>
          )}
          <button className="new-game-btn" onClick={initializeGame}>
            New Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default MathPyramid;

