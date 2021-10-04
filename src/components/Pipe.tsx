import useGame from "../hooks/useGame"
import { PipeType } from "../lib/types"

interface IPipe {
  value: PipeType
  x: number
  y: number
}

const Pipe = ({ value, x, y }: IPipe) => {
  const { rotate } = useGame()

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
    />
  )
}

export default Pipe
