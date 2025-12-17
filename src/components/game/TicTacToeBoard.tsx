import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Users, Bot, RotateCw } from 'lucide-react';
import { checkWinner, checkDraw, getBestMove, Board, Player } from '@/lib/game-logic';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
type GameMode = 'pvp' | 'pvc';
type GameStatus = 'playing' | 'win' | 'draw';
const Cell = ({ value, onClick, isWinning }: { value: Player | null; onClick: () => void; isWinning: boolean }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.8, opacity: 0 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    className={cn(
      "aspect-square flex items-center justify-center text-6xl md:text-8xl font-bold cursor-pointer transition-colors duration-300",
      isWinning ? 'bg-yellow-500/30' : 'bg-card/50 hover:bg-card/80'
    )}
    onClick={onClick}
  >
    {value && (
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30, delay: 0.1 }}
        className={cn(
          value === 'X' ? 'text-primary text-glow-primary' : 'text-secondary text-glow-secondary'
        )}
      >
        {value}
      </motion.span>
    )}
  </motion.div>
);
export function TicTacToeBoard(): JSX.Element {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winnerInfo, setWinnerInfo] = useState<{ winner: Player; line: number[] } | null>(null);
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [gameMode, setGameMode] = useState<GameMode>('pvc');
  const triggerConfetti = useCallback(() => {
    confetti({
      particleCount: 150,
      spread: 180,
      origin: { y: 0.6 },
      zIndex: 1000,
    });
  }, []);
  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinnerInfo(null);
    setGameStatus('playing');
  }, []);
  useEffect(() => {
    if (gameStatus !== 'playing') return;
    const winnerResult = checkWinner(board);
    if (winnerResult) {
      setWinnerInfo(winnerResult);
      setGameStatus('win');
      setScores(s => ({ ...s, [winnerResult.winner]: s[winnerResult.winner] + 1 }));
      triggerConfetti();
    } else if (checkDraw(board)) {
      setGameStatus('draw');
    }
  }, [board, gameStatus, triggerConfetti]);
  useEffect(() => {
    if (gameMode === 'pvc' && currentPlayer === 'O' && gameStatus === 'playing') {
      const timeoutId = setTimeout(() => {
        const bestMove = getBestMove(board, 'O');
        if (bestMove !== -1) {
          const newBoard = [...board];
          newBoard[bestMove] = 'O';
          setBoard(newBoard);
          setCurrentPlayer('X');
        }
      }, 500 + Math.random() * 500); // Add a slight delay for realism
      return () => clearTimeout(timeoutId);
    }
  }, [currentPlayer, board, gameMode, gameStatus]);
  const handleCellClick = (index: number) => {
    if (board[index] || gameStatus !== 'playing' || (gameMode === 'pvc' && currentPlayer === 'O')) {
      return;
    }
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };
  const getStatusMessage = () => {
    if (gameStatus === 'win' && winnerInfo) {
      return `${winnerInfo.winner} WINS!`;
    }
    if (gameStatus === 'draw') {
      return "IT'S A DRAW!";
    }
    return `${currentPlayer}'S TURN`;
  };
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4">
      <header className="w-full max-w-md mb-4 md:mb-8 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-glow-primary tracking-widest">PIXELTOE</h1>
        <div className="flex justify-between items-center mt-4 text-lg md:text-2xl px-4">
          <div className="text-primary text-glow-primary">P1 (X): {scores.X}</div>
          <div className="text-secondary text-glow-secondary">
            {gameMode === 'pvc' ? 'CPU' : 'P2'} (O): {scores.O}
          </div>
        </div>
      </header>
      <main className="relative w-full max-w-sm md:max-w-md">
        <div className="grid grid-cols-3 grid-rows-3 gap-2 md:gap-3 p-2 md:p-3 border-4 border-primary box-glow-primary rounded-lg">
          {board.map((cell, index) => (
            <Cell
              key={index}
              value={cell}
              onClick={() => handleCellClick(index)}
              isWinning={winnerInfo?.line.includes(index) ?? false}
            />
          ))}
        </div>
        <AnimatePresence>
          {gameStatus !== 'playing' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 rounded-lg"
            >
              <p className={cn(
                "text-4xl md:text-5xl font-bold animate-glitch",
                winnerInfo?.winner === 'X' ? 'text-glow-primary text-primary' : 'text-glow-secondary text-secondary',
                gameStatus === 'draw' && 'text-white'
              )}>
                {getStatusMessage()}
              </p>
              <Button onClick={resetGame} className="mt-6 text-lg" variant="secondary" size="lg">
                <RotateCw className="mr-2 h-5 w-5" /> PLAY AGAIN
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <footer className="w-full max-w-md mt-4 md:mt-8 flex flex-col items-center gap-4">
        <div className="text-xl md:text-2xl font-bold text-glow-secondary">{getStatusMessage()}</div>
        <div className="flex gap-4">
          <Button
            onClick={() => { setGameMode('pvc'); resetGame(); setScores({X:0, O:0}); }}
            variant={gameMode === 'pvc' ? 'default' : 'outline'}
            className="w-36"
          >
            <Bot className="mr-2 h-5 w-5" /> VS CPU
          </Button>
          <Button
            onClick={() => { setGameMode('pvp'); resetGame(); setScores({X:0, O:0}); }}
            variant={gameMode === 'pvp' ? 'default' : 'outline'}
            className="w-36"
          >
            <Users className="mr-2 h-5 w-5" /> VS PLAYER
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-4">Built with ❤️ at Cloudflare</p>
      </footer>
    </div>
  );
}