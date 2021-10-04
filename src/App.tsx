import { GameProvider } from './contexts/GameContext'
import Game from './components/Game'
import './styles/styles.css'

function App() {
  return (
    <GameProvider>
      <h1>David Lyon's Test - Pipes Puzzle - Evolution</h1>
      <Game />
    </GameProvider>
  )
}

export default App
