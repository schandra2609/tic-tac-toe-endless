import { useState } from 'react';

// The Game Board (with Reset Button)
const Board = ({ turnx, setTurnx }) => {
    const MAX_BLOCK = 7;                                                                  // Queue Size
    const [grid, setGrid] = useState(Array(3).fill(null).map(() => Array(3).fill(null))); // Game Board (Initially Blank)
    const [winner, setWinner] = useState(null);                                           // To store the winner
    const [winningLine, setWinningLine] = useState([]);                                   // Mtaching line on the board to get the winner
    const [gameQueue, setGameQueue] = useState([]);                                       // The Game Queue, to store the symbols
    const [resetId, setResetId] = useState(0);                                            // Used to create a new board

    // Function to check if there is a winning condition or not
    const checkWinner = (newGrid) => {
        for(let i = 0; i < 3; i++) {
            // Horizontal Winning Line
            if(newGrid[i][0] && newGrid[i][0] === newGrid[i][1] && newGrid[i][1] === newGrid[i][2])
                return {winner: newGrid[i][0], winningLine: [[i, 0], [i, 1], [i, 2]]};

            // Vertical Winning Line
            if(newGrid[0][i] && newGrid[0][i] === newGrid[1][i] && newGrid[1][i] === newGrid[2][i])
                return {winner: newGrid[0][i], winningLine: [[0, i], [1, i], [2, i]]};
        }

        // Principal/Primary Diagonal Winning Line
        if(newGrid[0][0] && newGrid[0][0] === newGrid[1][1] && newGrid[1][1] === newGrid[2][2])
            return {winner: newGrid[0][0], winningLine: [[0, 0], [1, 1], [2, 2]]};

        // Auxiliary/Secondary Diagonal Winning Line
        if(newGrid[0][2] && newGrid[0][2] === newGrid[1][1] && newGrid[1][1] === newGrid[2][0])
            return {winner: newGrid[0][2], winningLine: [[0, 2], [1, 1], [2, 0]]};

        // If no match found, return null
        return null;
    };

    // Function to put a mark (X/O) on the game board
    const putMark = (row, col, winner) => {
        if(grid[row][col] === null && !winner) {            // If the cell isn't empty and the winner has not been declared yet
            const newGrid = grid.map((r, rIndex) => 
                r.map((cell, cIndex) => rIndex === row && cIndex === col ? (turnx ? "X" : "O") : cell )     // Finding the cell using the indices to put the mark
            );

            let newQueue = [...gameQueue, { row, col }];                // New game queue with the newly added mark indices
            if(newQueue.length > MAX_BLOCK) {                           // Condition when the queue is full
                let { row: oldRow, col: oldCol } = newQueue.shift();    // Shift the queue to discard the oldest mark
                newGrid[oldRow][oldCol] = null;                         // Reset the discarded cell mark
            }

            setGrid(newGrid);                       // Update the game grid
            setGameQueue(newQueue);                 // Update the game queue to the latest
            const result = checkWinner(newGrid);    // Store winner if there is.
            if(result) {                            // If found the winner, go for it
                setWinner(result.winner);               // Update the winner
                setWinningLine(result.winningLine);     // Set the winning line
            } else {                                // Otherwise just invert the player turn
                setTurnx(!turnx);                       // Invert the turn
            }
        }
    };

    // Function to restart the game
    const resetGame = () => {
        setGrid(Array(3).fill(null).map(() => Array(3).fill(null))); // Empty board
        setWinner(null);                                             // Reset the winner
        setWinningLine([]);                                          // Reset winning line
        setGameQueue([]);                                            // Reset the game queue to maintain 7 symbols/marks on the board
        setTurnx(true);                                              // Initialize the game with the turn of 'X' mark
        setResetId(prev => prev + 1);
    };


    return (
        // Game Board
        <div key={resetId} className="mx-auto my-[7.5vh] h-fit w-fit flex flex-col justify-between flex-wrap gap-[5px]">
            {/* 3x3 Game Grid */}
            {grid.map((rowData, row) => (           // Iterating through the rows
                <div key={row} className="flex justify-center items-center gap-[5px] mx-auto">
                    {rowData.map((cell, col) => {   // Iterating through the elements of each row
                        const isWinningCell = !!winner && winningLine.some(([r, c]) => r === row && c === col);
                        // Styles of the cells based on the mark inside
                        const blockStyle = {
                            backgroundColor: cell === "X" ? "rgb(166, 76, 250)" : cell === "O" ? "rgb(1, 189, 189)" : "white",
                            color: cell === "X" ? "rgb(85, 12, 85)" : cell === "O" ? "rgb(5, 94, 157)" : "white",
                            boxShadow: isWinningCell
                                    ? "0 0 20px 5px gold"
                                    : cell === "X"
                                    ? "0 0 5px rgb(85, 12, 85)"
                                    : cell === "O"
                                    ? "0 0 5px rgb(5, 94, 157)"
                                    : "whitesmoke",
                            border: isWinningCell ? "2px solid gold" : "none"
                        }
                        // Game Cell
                        return (
                            <button key={`${row}-${col}`} className="h-[13vh] w-[13vh] text-[4rem] border-none text-black rounded-[10px] shadow-[0_0_5px_whitesmoke] font-nunito-bold transition-all duration-300 ease-in-out" style={blockStyle} onClick={() => putMark(row, col, winner)}>{cell}</button>
                        );
                    })}
                </div>
            ))}
            {/* Reset Button */}
            <button onClick={resetGame} className="mt-5 mx-auto px-6 py-2 bg-white tracking-widest text-black rounded-[10px] shadow-[0_0_10px_whitesmoke] text-[1.25rem] transition-all duration-300 ease-in-out hover:bg-slate-100 hover:scale-105" style={{fontFamily: "Times New Roman"}}>Restart</button>
            <div className="flex justify-center items-center w-screen my-5">
                {/* A block to display the winner, if there is */}
                <div className="flex justify-center items-center font-times text-3xl border border-gray-300 border-4 rounded-2xl px-16 py-3" style={{display: winner ? "flex" : "none"}}>
                    {winner === "Draw"
                    ? (<span className="text-yellow-400 font-extrabold">It's a draw</span>)
                    : (<>
                        <span>Winner:</span>
                        <span className="ml-5 text-4xl font-courier text-green-400 font-extrabold">{winner}</span>
                    </>)}
                </div>
            </div>
        </div>
    );
}

export default Board;