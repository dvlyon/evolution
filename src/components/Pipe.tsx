import useGame from "../hooks/useGame"
import { PipeType } from "../lib/types"

interface IPipe {
  value: PipeType
  x: number
  y: number
}

const Pipe = ({ value, x, y }: IPipe) => {
  const { rotate, disabled } = useGame()

  const onClick = () => {
    rotate(x, y)
  }

  return (
    <input
      className="btn"
      type="button"
      value={''}
      onClick={onClick}
      style={{
        backgroundImage: `url(/assets/Pipes/${value}.png)`,
        backgroundSize: 'contain',
      }}
      disabled={disabled}
    />
  )
}

export default Pipe
