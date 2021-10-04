import useGame from "../hooks/useGame"
import Pipe from "./Pipe"
import { PipeType } from '../lib/types'

const GameMap = () => {
  const { map } = useGame()

  if (!map || map.length <= 0) {
    return null
  }

  const width = (map && map[0] ? map[0].length : 0) * 50

  return (
    <div>
      <h2>Game:</h2>

      <div style={{
        minWidth: `${width}px`,
        width: 'fit-content',
        margin: 'auto',
      }}>
        {map.map((row: PipeType[], y: number) => {
          return (
            <div style={{
              width: '100%',
              height: '50px',
            }}>
              {row.map((pipe: PipeType, x: number) => {
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
