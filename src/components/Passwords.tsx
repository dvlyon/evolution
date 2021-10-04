import useGame from "../hooks/useGame"

const Passwords = () => {
  const { passwords } = useGame()

  if (passwords.length <= 0) {
    return null
  }

  return (
    <>
      <h2>Solved puzzles:</h2>
      { passwords.map(p => `${p} `) }
    </>
  )
}

export default Passwords
