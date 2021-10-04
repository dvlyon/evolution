import useGame from "../hooks/useGame"
import Pipe from "./Pipe"
import { PipeType } from '../lib/types'

const GameMap = () => {
  const { map } = useGame()

  return (
    <div>
      <h2>Game:</h2>

      <div style={{
        minWidth: `${(map ? map[0].length : 0) * 50}px`,
        width: 'fit-content',
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
