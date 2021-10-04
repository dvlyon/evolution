import { PipeType } from '../lib/types'

export interface IPipes {
  value: PipeType
  check: boolean[]
  rotation: number
}

export const pipes: IPipes[] = [
  {
    value: '━',
    check: [false, true, false, true],
    rotation: 0,
  },
  {
    value: '┃',
    check: [true, false, true, false],
    rotation: 0,
  },
  {
    value: '┏',
    check: [false, true, true, false],
    rotation: 1,
  },
  {
    value: '┓',
    check: [false, false, true, true],
    rotation: 1,
  },
  {
    value: '┗',
    check: [true, true, false, false],
    rotation: 1,
  },
  {
    value: '┛',
    check: [true, false, false, true],
    rotation: 1,
  },
  {
    value: '┣',
    check: [true, true, true, false],
    rotation: 2,
  },
  {
    value: '┫',
    check: [true, false, true, true],
    rotation: 2,
  },
  {
    value: '┳',
    check: [false, true, true, true],
    rotation: 2,
  },
  {
    value: '┻',
    check: [true, true, false, true],
    rotation: 2,
  },
  {
    value: '╋',
    check: [true, true, true, true],
    rotation: 3,
  },
  {
    value: '╸',
    check: [false, false, false, true],
    rotation: 4,
  },
  {
    value: '╹',
    check: [true, false, false, false],
    rotation: 4,
  },
  {
    value: '╺',
    check: [false, true, false, false],
    rotation: 4,
  },
  {
    value: '╻',
    check: [false, false, true, false],
    rotation: 4,
  },
]

export const rotations: PipeType[][] = [
  ['━', '┃'],
  ['┏', '┓', '┛', '┗'],
  ['┣', '┳', '┫', '┻'],
  ['╋'],
  ['╸', '╹', '╺', '╻']
]
