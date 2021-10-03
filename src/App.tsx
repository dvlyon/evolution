import './App.css'
import { GameProvider } from './contexts/GameContext'
import LevelSelector from './components/LevelSelector'
import GameMap from './components/GameMap'
import Verifier from './components/Verifier'
import './styles/styles.css'

function App() {
  return (
    <GameProvider>
      <LevelSelector />
      <GameMap />
      <Verifier />
      { 'verify: Correct! Password: JustWarmingUp' }
    </GameProvider>
  )
}

export default App
