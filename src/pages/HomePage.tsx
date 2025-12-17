import { RetroWrapper } from '@/components/retro/RetroWrapper';
import { TicTacToeBoard } from '@/components/game/TicTacToeBoard';
export function HomePage() {
  return (
    <RetroWrapper>
      <TicTacToeBoard />
    </RetroWrapper>
  );
}