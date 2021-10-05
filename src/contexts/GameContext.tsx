import { createContext, ReactNode, useEffect, useState } from "react"
import { w3cwebsocket } from 'websocket'
import { PipeType } from '../lib/types'
import { pipes, rotations } from '../lib/constants'

interface IGameContext {
  client: w3cwebsocket | null
  isLoading: boolean,
  newGame: (level: number) => void
  map: PipeType[][]
  rotate: (x: number, y: number) => void
  verify: () => void
  reset: () => void
  passwords: string[]
  disabled: boolean
  autoSolve: (solvedMap: PipeType[][]) => void
}

export const GameContext = createContext<IGameContext>({
  client: null,
  isLoading: true,
  newGame: (_level: number) => null,
  map: [],
  rotate: (_x: number, _y: number) => null,
  verify: () => null,
  reset: () =>  null,
  passwords: [],
  disabled: false,
  autoSolve: (_solvedMap: PipeType[][]) => null,
})

interface IGameProvider {
  children: ReactNode
}

export const GameProvider = ({ children }: IGameProvider) => {
  const [client, setClient] = useState<w3cwebsocket | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [map, setMap] = useState<PipeType[][]>([])
  const [passwords, setPasswords] = useState<string[]>([])
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    const gameClient = new w3cwebsocket('wss://hometask.eg1236.com/game-pipes/')

    setClient(gameClient)
    setMap([])

    return () => {
      setClient(null)
      setMap([])
    }
  }, [])

  useEffect(() => {
    if (client) {
      client.onopen = () => {
        setIsLoading(false)
      }

      client.onmessage = (message) => {
        const data = message?.data as string

        if (data === 'new: OK') {
          client.send('map')
          setDisabled(false)
        }

        if (data.substring(0, 4) === 'map:') {
          const splitData = data.split("\n")
          splitData.splice(0, 1)

          const newMap: PipeType[][] = []
          splitData.forEach(s => newMap.push(s.split('') as PipeType[]))
          newMap.pop()

          setMap(newMap)
        }

        if (data === 'verify: Incorrect.') {
          client.send('map')
          alert('Wrong!')
        }

        const pwdCheck = data.split("verify: Correct! Password: ")
        if (pwdCheck[1]) {
          setPasswords(p => {
            if (p.indexOf(pwdCheck[1]) < 0) {
              return [...p, pwdCheck[1]]
            }
            return p
          })
          setDisabled(true)
          alert('Correct!')
        }

        console.log(data)
      }
    }
  }, [client])

  const newGame = (level: number) => {
    if (client) {
      client.send(`new ${level}`)
    }
  }

  const rotate = (x: number, y: number) => {
    if (client) {
      client.send(`rotate ${x} ${y}`)

      const newMap = [...map]
      const newMapLine = [...map[y]]

      const pipe = pipes.find(p => p.value === map[y][x])

      if (pipe) {
        const index = rotations[pipe.rotation].indexOf(pipe.value)

        if (index < rotations[pipe.rotation].length - 1) {
          newMapLine[x] = rotations[pipe.rotation][index + 1]
        } else {
          newMapLine[x] = rotations[pipe.rotation][0]
        }

        newMap[y] = newMapLine

        setMap(newMap)
      } else {
        client.send('map')
      }
    }
  }

  const verify = () => {
    if (client) {
      client.send('verify')
    }
  }

  const reset = () => {
    setMap([])
  }

  const autoSolve = async (solvedMap: PipeType[][]) => {
    let rotateText = 'rotate '

    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[0].length; x++) {
        if (map[y][x] !== solvedMap[y][x]) {
          const pipe = pipes.find(p => p.value === map[y][x])
          const solvedPipe = pipes.find(p => p.value === solvedMap[y][x])
          if (pipe && solvedPipe) {
            const index = rotations[pipe.rotation].indexOf(pipe.value)
            const solvedindex = rotations[solvedPipe.rotation].indexOf(solvedPipe.value)

            for (let i = 0; i < Math.abs(index - solvedindex); i++) {
              rotateText += `${x} ${y}\n`
            }
          }
        }
      }
    }

    client?.send(rotateText)
    setMap(solvedMap)
  }

  return (
    <GameContext.Provider value={{
      client,
      isLoading,
      newGame,
      map,
      rotate,
      verify,
      reset,
      passwords,
      disabled,
      autoSolve,
    }}>
      {children}
    </GameContext.Provider>
  )
}
