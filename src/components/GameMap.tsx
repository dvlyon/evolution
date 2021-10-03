import useGame from "../hooks/useGame"
import Pipe from "./Pipe"

const GameMap = () => {
  const { map } = useGame()

  return (
    <div>
      <h1>Game:</h1>

      <div>
        {map.map((row: string, y: number) => {
          return (
            <div style={{ width: '100%' }}>
              {row.split('').map((pipe: string, x: number) => {
                return (
                  <Pipe key={`${x},${y}`} value={pipe} x={x} y={y} />
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default GameMap
