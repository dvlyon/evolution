import useGame from "../hooks/useGame"
import LevelSelector from './LevelSelector'
import GameMap from './GameMap'
import Verifier from './Verifier'
import Passwords from './Passwords'

function Game() {
  const { isLoading } = useGame()

  if (isLoading) {
    return (
      <h2>Loading...</h2>
    )
  }

  return (
    <>
      <LevelSelector />
      <GameMap />
      <Verifier />
      <Passwords />
    </>
  )
}

export default Game
