import { ChangeEvent, FormEvent, useState  } from "react"
import useGame from "../hooks/useGame"

const LevelSelector = () => {
  const [level, setLevel] = useState(1)

  const { map, newGame, reset, disabled } = useGame()

  const onClick = () => {
    reset()
  }

  if (map && map.length > 0) {
    return (
      <div>
        <h2>Playing level: {level}</h2>
        <input type="button" value={disabled ? "Start Again" : "Give up"} onClick={onClick} />
      </div>
    )
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLevel(parseInt(e.target.value, 10))
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    newGame(level)
  }

  return (
    <div>
      <h2>Select game level:</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="level">Level:</label>
        <input type="number" id="points" name="level" step="1" value={level} max={6} min={1} onChange={onChange} />
        <input type="submit" value="Start New Game" />
      </form>
    </div>
  )
}

export default LevelSelector
