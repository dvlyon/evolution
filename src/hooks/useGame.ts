import { GameContext } from "../contexts/GameContext"
import { useContext } from "react"

const useGame = () => useContext(GameContext)

export default useGame
