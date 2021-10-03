import { createContext, ReactNode, useEffect, useState } from "react"
import { w3cwebsocket } from 'websocket'

interface IGameContext {
  client: w3cwebsocket | null
  newGame: (level: number) => void
  map: string[]
  rotate: (x: number, y: number) => void
  verify: () => void
}

export const GameContext = createContext<IGameContext>({
  client: null,
  newGame: (_level: number) => null,
  map: [],
  rotate: (_x: number, _y: number) => null,
  verify: () => null,
})

interface IGameProvider {
  children: ReactNode
}

export const GameProvider = ({ children }: IGameProvider) => {
  const [client, setClient] = useState<w3cwebsocket | null>(null)
  const [map, setMap] = useState<string[]>([])

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
        console.log('WebSocket Client Connected')
      }

      client.onmessage = (message) => {
        const data = message?.data as string

        if (data === 'new: OK') {
          client.send('map')
        }

        if (data.substring(0, 4) === 'map:') {
          const newMap = data.split("\n")
          newMap.splice(0, 1)

          setMap(newMap)
        }

        if (data === 'rotate: OK') {
          client.send('map')
        }

        if (data === 'verify: Incorrect.') {
          alert('NOPE')
        }

        console.log(JSON.stringify(data))
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
    }
  }

  const verify = () => {
    if (client) {
      client.send('verify')
    }
  }

  return (
    <GameContext.Provider value={{
      client,
      newGame,
      map,
      rotate,
      verify,
    }}>
      {children}
    </GameContext.Provider>
  )
}
