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

export const bruteAutoSolver = (puzzleMap: PipeType[][]) => {
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

interface IAutoSolveMap {
  pipeType: number
  isSet: boolean
}

export const autoSolver = (originalMap: PipeType[][]) => {
  let map: IAutoSolveMap[][] = []
  let solvedMap: PipeType[][] = []

  for (let y = 0; y < originalMap.length; y++) {
    map.push([])
    solvedMap.push([])

    for (let x = 0; x < originalMap[0].length; x++) {
      const pipe = pipes.find(p => p.value === originalMap[y][x])

      if (pipe) {
        map[y].push({
          pipeType: pipe.rotation,
          isSet: pipe.rotation === 3,
        })
        solvedMap[y].push(rotations[pipe.rotation][0])
      } else {
        return []
      }
    }
  }

  let check = 0
  let oldCheck = -1

  const isTopForced = (y: number, x: number, is4: boolean) => {
    if (y <= 0) {
      return 'no'
    }
    if (is4 && map[y - 1][x].pipeType === 4) {
      return 'no'
    }
    const checkPipe = map[y - 1][x]
    if (checkPipe.isSet) {
      const pipe = pipes.find(p => p.value === solvedMap[y - 1][x])

      if (pipe) {
        if (pipe.check[2]) {
          return 'yes'
        } else {
          return 'no'
        }
      } else {
        return 'unset'
      }
    }
    return 'unset'
  }

  const isRightForced = (y: number, x: number, is4: boolean) => {
    if (x >= map[0].length - 1) {
      return 'no'
    }
    if (is4 && map[y][x + 1].pipeType === 4) {
      return 'no'
    }
    const checkPipe = map[y][x + 1]
    if (checkPipe.isSet) {
      const pipe = pipes.find(p => p.value === solvedMap[y][x + 1])

      if (pipe) {
        if (pipe.check[3]) {
          return 'yes'
        } else {
          return 'no'
        }
      } else {
        return 'unset'
      }
    }
    return 'unset'
  }

  const isBottomForced = (y: number, x: number, is4: boolean) => {
    if (y >= map.length - 1) {
      return 'no'
    }
    if (is4 && map[y + 1][x].pipeType === 4) {
      return 'no'
    }
    const checkPipe = map[y + 1][x]
    if (checkPipe.isSet) {
      const pipe = pipes.find(p => p.value === solvedMap[y + 1][x])

      if (pipe) {
        if (pipe.check[0]) {
          return 'yes'
        } else {
          return 'no'
        }
      } else {
        return 'unset'
      }
    }
    return 'unset'
  }

  const isLeftForced = (y: number, x: number, is4: boolean) => {
    if (x <= 0) {
      return 'no'
    }
    if (is4 && map[y][x - 1].pipeType === 4) {
      return 'no'
    }
    const checkPipe = map[y][x - 1]
    if (checkPipe.isSet) {
      const pipe = pipes.find(p => p.value === solvedMap[y][x - 1])

      if (pipe) {
        if (pipe.check[1]) {
          return 'yes'
        } else {
          return 'no'
        }
      } else {
        return 'unset'
      }
    }
    return 'unset'
  }

  while (check < map.length * map[0].length) {
    if (oldCheck >= check) {
      break
    }
    oldCheck = check

    for (let y = 0; y < originalMap.length; y++) {
      for (let x = 0; x < originalMap[0].length; x++) {
        const current = map[y][x]
        if (!current.isSet) {
          const is4 = current.pipeType === 4
          const topForced = isTopForced(y, x, is4)
          const bottomForced = isBottomForced(y, x, is4)
          const rightForced = isRightForced(y, x, is4)
          const leftForced = isLeftForced(y, x, is4)

          if (current.pipeType === 0) {
            if (topForced === 'yes' || bottomForced === 'yes' || rightForced === 'no' || leftForced === 'no') {
              solvedMap[y][x] = '┃'
              map[y][x].isSet = true
              check++
            } else if (topForced === 'no' || bottomForced === 'no' || rightForced === 'yes' || leftForced === 'yes') {
              solvedMap[y][x] = '━'
              map[y][x].isSet = true
              check++
            }
          }

          if (current.pipeType === 1) {
            if ((topForced === 'yes' && rightForced === 'yes') || (bottomForced === 'no' && leftForced === 'no') || (leftForced === 'no' && topForced === 'yes')
            || (rightForced === 'yes' && bottomForced === 'no')) {
              solvedMap[y][x] = '┗'
              map[y][x].isSet = true
              check++
            } else if ((rightForced === 'yes' && bottomForced === 'yes') || (leftForced === 'no' && topForced === 'no') || (topForced === 'no' && rightForced === 'yes')
            || (bottomForced === 'yes' && leftForced === 'no')) {
              solvedMap[y][x] = '┏'
              map[y][x].isSet = true
              check++
            } else if ((bottomForced === 'yes' && leftForced === 'yes') || (topForced === 'no' && rightForced === 'no') || (rightForced === 'no' && bottomForced === 'yes')
            || (leftForced === 'yes' && topForced === 'no')) {
              solvedMap[y][x] = '┓'
              map[y][x].isSet = true
              check++
            } else if ((leftForced === 'yes' && topForced === 'yes') || (rightForced === 'no' && bottomForced === 'no') || (bottomForced === 'no' && leftForced === 'yes')
            || (topForced === 'yes' && rightForced === 'no')) {
              solvedMap[y][x] = '┛'
              map[y][x].isSet = true
              check++
            }
          }

          if (current.pipeType === 2) {
            if (topForced === 'no' || (rightForced === 'yes' && bottomForced === 'yes' && leftForced === 'yes')) {
              solvedMap[y][x] = '┳'
              map[y][x].isSet = true
              check++
            } else if (rightForced === 'no' || (topForced === 'yes' && bottomForced === 'yes' && leftForced === 'yes')) {
              solvedMap[y][x] = '┫'
              map[y][x].isSet = true
              check++
            } else if (bottomForced === 'no' || (rightForced === 'yes' && topForced === 'yes' && leftForced === 'yes')) {
              solvedMap[y][x] = '┻'
              map[y][x].isSet = true
              check++
            } else if (leftForced === 'no' || (rightForced === 'yes' && bottomForced === 'yes' && topForced === 'yes')) {
              solvedMap[y][x] = '┣'
              map[y][x].isSet = true
              check++
            }
          }

          if (current.pipeType === 4) {
            if (topForced === 'yes' || (rightForced === 'no' && bottomForced === 'no' && leftForced === 'no')) {
              solvedMap[y][x] = '╹'
              map[y][x].isSet = true
              check++
            } else if (rightForced === 'yes' || (topForced === 'no' && bottomForced === 'no' && leftForced === 'no')) {
              solvedMap[y][x] = '╺'
              map[y][x].isSet = true
              check++
            } else if (bottomForced === 'yes' || (rightForced === 'no' && topForced === 'no' && leftForced === 'no')) {
              solvedMap[y][x] = '╻'
              map[y][x].isSet = true
              check++
            } else if (leftForced === 'yes' || (rightForced === 'no' && bottomForced === 'no' && topForced === 'no')) {
              solvedMap[y][x] = '╸'
              map[y][x].isSet = true
              check++
            }
          }
        }
      }
    }
  }

  console.log(solvedMap)
}
