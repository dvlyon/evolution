import useGame from "../hooks/useGame"
import { PipeType } from "../lib/types"

interface IPipe {
  value: PipeType
  x: number
  y: number
}

const Pipe = ({ value, x, y }: IPipe) => {
  const { rotate, disabled, autoSolveMap } = useGame()

  const onClick = () => {
    rotate(x, y)
  }

  const borderColor = autoSolveMap && autoSolveMap.length > 0 ? autoSolveMap[y][x].isSet ? 'green' : 'red' : '#ddd'

  return (
    <input
      className="btn"
      type="button"
      value={''}
      onClick={onClick}
      style={{
        backgroundImage: `url(/assets/Pipes/${value}.png)`,
        backgroundSize: 'contain',
        border: `1px solid ${borderColor}`,
      }}
      disabled={disabled}
    />
  )
}

export default Pipe
