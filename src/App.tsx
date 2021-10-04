import './App.css'
import { GameProvider } from './contexts/GameContext'
import LevelSelector from './components/LevelSelector'
import GameMap from './components/GameMap'
import Verifier from './components/Verifier'
import './styles/styles.css'

function App() {
  return (
    <GameProvider>
      <h1>David Lyon's Test - Pipes Puzzle - Evolution</h1>
      <LevelSelector />
      <GameMap />
      <Verifier />
      <h2>Solved puzzles:</h2>
      { 'verify: Correct! Password: JustWarmingUp' }
    </GameProvider>
  )
}

export default App
