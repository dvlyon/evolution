import useGame from "../hooks/useGame"
import LevelSelector from './LevelSelector'
import GameMap from './GameMap'
import Options from './Options'
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
      <Options />
      <Passwords />
    </>
  )
}

export default Game
