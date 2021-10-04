import useGame from "../hooks/useGame"
// import { localVerify, autoSolver } from "../lib/functions"

const Verifier = () => {
  const { /*map,*/ verify } = useGame()

  const onClickVerify = () => {
    verify()
  }

  // const onClickLocalVerify = () => {
  //   console.log(localVerify(map))
  // }

  // const onClickAutoSolve = () => {
  //   console.log(autoSolver(map))
  // }

  return (
    <div>
      <h2>Options:</h2>
      <input type="button" value="Verify" onClick={onClickVerify} />
      {/* <input type="button" value="Local Verify" onClick={onClickLocalVerify} />
      <input type="button" value="Autosolve" onClick={onClickAutoSolve} /> */}
    </div>
  )
}

export default Verifier
