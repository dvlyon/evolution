import useGame from "../hooks/useGame"

const Verifier = () => {
  const { verify } = useGame()

  const onClick = () => {
    verify()
  }

  return (
    <div>
      <input type="button" value="Verify" onClick={onClick} />
    </div>
  )
}

export default Verifier
