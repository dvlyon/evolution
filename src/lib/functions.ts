import { pipes, rotations, IPipes } from './constants'
import { PipeType } from './types'

export const localVerify = (map: PipeType[][]) => {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      const pipe = pipes.find(p => p.value === map[y][x])

      if (pipe) {
        if (pipe.check[0]) {
          if (y > 0) {
            const checkPipe = pipes.find(p => p.value === map[y - 1][x])

            if (checkPipe) {
              if (!checkPipe.check[2]) {
                return false
              }
            } else {
              return false
            }
          } else {
            return false
          }
        }

        if (pipe.check[1]) {
          if (x < map[0].length - 1) {
            const checkPipe = pipes.find(p => p.value === map[y][x + 1])

            if (checkPipe) {
              if (!checkPipe.check[3]) {
                return false
              }
            } else {
              return false
            }
          } else {
            return false
          }
        }

        if (pipe.check[2]) {
          if (y < map.length - 1) {
            const checkPipe = pipes.find(p => p.value === map[y + 1][x])

            if (checkPipe) {
              if (!checkPipe.check[0]) {
                return false
              }
            } else {
              return false
            }
          } else {
            return false
          }
        }

        if (pipe.check[3]) {
          if (x > 0) {
            const checkPipe = pipes.find(p => p.value === map[y][x - 1])

            if (checkPipe) {
              if (!checkPipe.check[1]) {
                return false
              }
            } else {
              return false
            }
          } else {
            return false
          }
        }
      } else {
        return false
      }
    }
  }

  return true
}

export const autoSolver = (puzzleMap: PipeType[][]) => {
  let map: PipeType[][] = []

  for (let y = 0; y < puzzleMap.length; y++) {
    map.push([])

    for (let x = 0; x < puzzleMap[0].length; x++) {
      const pipe = pipes.find(p => p.value === puzzleMap[y][x])

      if (pipe) {
        map[y].push(rotations[pipe.rotation][0])
      } else {
        return []
      }
    }
  }

  const bruteSolve = () => {
    let y = 0
    let x = 0

    for (y; y < map.length;) {
      for (x; x < map[0].length;) {
        let pipe: IPipes | undefined = undefined

        for (let i = 0; i < pipes.length; i++) {
          if (map[y][x] === pipes[i].value) {
            pipe = pipes[i]
          }
        }

        if (pipe) {
          const index = rotations[pipe.rotation].indexOf(pipe.value)

          if (index < rotations[pipe.rotation].length - 1) {
            map[y][x] = rotations[pipe.rotation][index + 1]
            
            if (!localVerify(map)) {
              x = 0
              y = 0
            } else {
              return
            }
          } else {
            map[y][x] = rotations[pipe.rotation][0]
            x++
            if (x >= map[0].length) {
              x = 0
              y++
            }
          }
        } else {
          return
        }
      }
    }

    map = []
  }

  if (!localVerify(map)) {
    bruteSolve()
  }

  return map
}
