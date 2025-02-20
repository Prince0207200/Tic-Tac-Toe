import { useState } from "react";
import "./App.css";

function calculateWinner(squares) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winningCombination: [a, b, c] };
    }
  }

  return { winner: null, winningCombination: [] };
}

function Square({ value, onSquareClick, isWinningSquare }) {
  return (
    <button
      onClick={onSquareClick}
      className={`square ${isWinningSquare ? "winning-square" : ""}`}
    >
      {value}
    </button>
  );
}

function TicTacToe() {
  const [xisNext, setXisNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquares = history[currentMove];

  function goTo(move) {
    setCurrentMove(move);
    setXisNext(move % 2 === 0);
  }

  function handleHistory(squares) {
    const newHistory = [...history.slice(0, currentMove + 1), squares];
    setHistory(newHistory);
    setCurrentMove(newHistory.length - 1);
    setXisNext(!xisNext);
  }

  const moves = history.map((squares, move) => {
    const desc = move > 0 ? `Go to move: #${move}` : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => goTo(move)}>{desc}</button>
      </li>
    );
  });

  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setXisNext(true);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xisNext={xisNext}
          squares={currentSquares}
          handleHistory={handleHistory}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
        <button onClick={resetGame} className="reset-button">
          Reset
        </button>
      </div>
    </div>
  );
}

function Board({ xisNext, squares, handleHistory }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares).winner) {
      return;
    }

    const updatedSquares = squares.slice();
    updatedSquares[i] = xisNext ? "X" : "O";
    handleHistory(updatedSquares);
  }

  const { winner, winningCombination } = calculateWinner(squares);
  const status = winner
    ? `Winner is: ${winner}`
    : `Next player is: ${xisNext ? "X" : "O"}`;

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square
          value={squares[0]}
          onSquareClick={() => handleClick(0)}
          isWinningSquare={winningCombination.includes(0)}
        />
        <Square
          value={squares[1]}
          onSquareClick={() => handleClick(1)}
          isWinningSquare={winningCombination.includes(1)}
        />
        <Square
          value={squares[2]}
          onSquareClick={() => handleClick(2)}
          isWinningSquare={winningCombination.includes(2)}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[3]}
          onSquareClick={() => handleClick(3)}
          isWinningSquare={winningCombination.includes(3)}
        />
        <Square
          value={squares[4]}
          onSquareClick={() => handleClick(4)}
          isWinningSquare={winningCombination.includes(4)}
        />
        <Square
          value={squares[5]}
          onSquareClick={() => handleClick(5)}
          isWinningSquare={winningCombination.includes(5)}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[6]}
          onSquareClick={() => handleClick(6)}
          isWinningSquare={winningCombination.includes(6)}
        />
        <Square
          value={squares[7]}
          onSquareClick={() => handleClick(7)}
          isWinningSquare={winningCombination.includes(7)}
        />
        <Square
          value={squares[8]}
          onSquareClick={() => handleClick(8)}
          isWinningSquare={winningCombination.includes(8)}
        />
      </div>
    </>
  );
}

function App() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1>Tic Tac Toe</h1>
      <TicTacToe />
    </div>
  );
}

export default App;
