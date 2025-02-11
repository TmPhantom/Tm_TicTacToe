import { useEffect, useState } from 'react'
import './App.css'
import { Square } from './components/Square'

function App() {

  // board consists of an array of rows containing 3 squares
  const [board, setBoard] = useState<string[]>(Array(9).fill(''));

  // stores the state of the actual player's turn
  const [isPlayerXTurn, setIsPlayerXTurn] = useState<boolean>(true);

  // stores the message for the end of the game (win, draw)
  const [status, setStatus] = useState<string>('');

  // boolean for checking if game is finished
  const [finished, setFinished] = useState<boolean>(false);


  function calculateWinner() {
    const winningPatterns = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [2,5,8],
      [0,4,8],
      [2,4,6],
      [0,3,6],
      [1,4,7]
    ];

    for (let i = 0; i < winningPatterns.length; i++) {
      const [x,y,z] = winningPatterns[i];

      if (board[x] && board[x] === board[y] && board[x] === board[z]) {
        return board[x];
      }
    }

    return null;
  }

  // reset the game by resetting all states 
  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setFinished(false);
  };

  // this is called only once because no dependencies are set
  /** 
  useEffect(() => {
    resetGame();
  }, []); */

  /**
   * function for updating and rendering games field
   * 
   * @param currentSquare number of actual selected square
   */
  function updateSquare(actualSquare : number) {
    // translate scuareNumber into board structure
    /*const rowIndex = Math.floor(currentSquare / 3);
    const colIndex = currentSquare % 3;

    console.log("IDs: ", rowIndex, colIndex);
    console.log("input field: ", board[rowIndex][colIndex]);*/

    // if the square is already occupied/selected then return
    if (calculateWinner() || board[actualSquare]) return;

    // set the marker of the square
    let updatedBoard = [...board];

    // translate scuareNumber into board structure
    updatedBoard[actualSquare] = isPlayerXTurn ? "X" : "O";

    setBoard(updatedBoard);

    /*
    let i = 0;
    while (i <= 2) {
      let j = 0;
      while (j <= 2) {
        console.log("my fields: ", board[i][j]);
        j++;
      }
      i++;
    }*/

    setIsPlayerXTurn(!isPlayerXTurn);
  }

  // is runned in the background each time board or isPlayerXTurn changes
  // it's called after each player's turn
  useEffect(() => {

    const checkDraw = () => board.every((square) => (square !== ''));
    if (!calculateWinner() && checkDraw()) {
      console.log("Draw");
      setStatus('This is a draw! Please restart the game.');
      setFinished(true);
    }
    else if (calculateWinner()) {
      setStatus(`Player ${isPlayerXTurn ? 'O' : 'X'} wins the game`);
      setFinished(true);
    }
    else {
      setStatus(`It is the turn of player: ${isPlayerXTurn ? 'X' : 'O'}`)
    }
  }, [board, isPlayerXTurn]);

  return (
    <div className='container'>
      <div className='row'>
        <Square value={board[0]} onClick={() => updateSquare(0)} />
        <Square value={board[1]} onClick={() => updateSquare(1)} />  
        <Square value={board[2]} onClick={() => updateSquare(2)} />  
      </div>
      <div className='row'>
        <Square value={board[3]} onClick={() => updateSquare(3)} />
        <Square value={board[4]} onClick={() => updateSquare(4)} />  
        <Square value={board[5]} onClick={() => updateSquare(5)} />  
      </div>
      <div className='row'>
        <Square value={board[6]} onClick={() => updateSquare(6)} />
        <Square value={board[7]} onClick={() => updateSquare(7)} />  
        <Square value={board[8]} onClick={() => updateSquare(8)} />  
      </div>
      <h1>{status}</h1>
      <button style={{visibility: finished? 'visible' : 'hidden'}} onClick={() => {resetGame()}}>Reload</button>
    </div>
  )
}

export default App
