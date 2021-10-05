import useGame from "../hooks/useGame"
import { autoSolver } from "../lib/functions"

const Options = () => {
  const { map, verify, disabled } = useGame()

  if (!map || map.length <= 0) {
    return null
  }

  const onClickVerify = () => {
    verify()
  }

  const onClickAutoSolve = () => {
    autoSolver(map)
  }

  return (
    <div>
      <h2>Options:</h2>
      <input type="button" value="Verify" onClick={onClickVerify} disabled={disabled} />
      <input type="button" value="Autosolve" onClick={onClickAutoSolve} />
    </div>
  )
}

export default Options
