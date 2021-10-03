import { ChangeEvent, FormEvent, useState  } from "react"
import useGame from "../hooks/useGame"

const LevelSelector = () => {
  const [level, setLevel] = useState(1)

  const { newGame } = useGame()

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLevel(parseInt(e.target.value, 10))
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    newGame(level)
  }

  return (
    <div>
      <h1>Select game level:</h1>

      <form onSubmit={onSubmit}>
        <label htmlFor="level">Level:</label>
        <input type="number" id="points" name="level" step="1" value={level} max={6} min={1} onChange={onChange} />
        <input type="submit" />
      </form>
    </div>
  )
}

export default LevelSelector
