export type Player = 'X' | 'O';
export type Board = (Player | null)[];
const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];
export function checkWinner(board: Board): { winner: Player; line: number[] } | null {
  for (const line of WINNING_COMBINATIONS) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player, line };
    }
  }
  return null;
}
export function checkDraw(board: Board): boolean {
  return board.every(cell => cell !== null);
}
export function getBestMove(board: Board, cpuPlayer: Player): number {
  const humanPlayer: Player = cpuPlayer === 'X' ? 'O' : 'X';
  // 1. Check if CPU can win in the next move
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      const newBoard = [...board];
      newBoard[i] = cpuPlayer;
      if (checkWinner(newBoard)?.winner === cpuPlayer) {
        return i;
      }
    }
  }
  // 2. Check if human can win in the next move and block them
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      const newBoard = [...board];
      newBoard[i] = humanPlayer;
      if (checkWinner(newBoard)?.winner === humanPlayer) {
        return i;
      }
    }
  }
  // 3. Take the center if available
  if (board[4] === null) {
    return 4;
  }
  // 4. Take a random available corner
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter(i => board[i] === null);
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }
  // 5. Take any remaining available cell
  const availableCells = board.map((cell, index) => cell === null ? index : null).filter(index => index !== null) as number[];
  if (availableCells.length > 0) {
    return availableCells[Math.floor(Math.random() * availableCells.length)];
  }
  return -1; // Should not be reached in a normal game
}