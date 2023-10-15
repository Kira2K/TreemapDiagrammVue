import { getSidesUtil } from './getSidesUtil'
import { toRaw } from 'vue'
export enum Sides {
  top = 'top',
  right = 'right',
  bottom = 'bottom',
  left = 'left'
}
export type Position = {
  width: string
  height: string
  [Sides.top]: string
  [Sides.bottom]: string
  [Sides.left]: string
  [Sides.right]: string
}
export type TreeMapChild = {
  title: string
  value: number
  height: number
  color: string
  width: number
  zIndex: number
  [Sides.top]?: number
  [Sides.right]?: number
  [Sides.bottom]?: number
  [Sides.left]?: number
  index: number
}

export const colorList: TreeMapChild['color'][] = [
  '#6A89CC',
  '#B0BEC5',
  '#F06292',
  '#1ABC9C',
  '#FFC107',
  '#9B59B6',
  '#928E8E',
  '#5EA6DF',
  '#2ECC71',
  '#F57C00',
  '#EE6D62',
  '#C5CAE9',
  '#B1C4CD',
  '#27AE60'
]
export type TreeMapChildList = TreeMapChild[]
export type TreeMapChildPreview = Pick<TreeMapChild, 'title' | 'value'> & {
  color?: TreeMapChild['color']
}
export type TreeMapChildPreviewList = TreeMapChildPreview[]

export type TreeMapConstructor = {
  sideVert: number
  sideHor: number
  children: TreeMapChildPreviewList
}
export const createRandomColor = () =>
  Math.floor(Math.random() * 16777215).toString(16)

export class Rectangle {
  sideVert
  sideHor
  constructor({ sideVert, sideHor }: { sideVert: number; sideHor: number }) {
    this.sideVert = sideVert
    this.sideHor = sideHor
  }
  public get totalSquareArea(): number {
    return this.sideVert * this.sideHor
  }
}

export class TreeMap extends Rectangle implements TreeMapConstructor {
  children
  constructor({ sideVert, sideHor, children }: TreeMapConstructor) {
    super({ sideVert, sideHor })
    this.children = TreeMap.validateChildren(children).sort(
      (a, b) => b.value - a.value
    )
  }
  public getChildrenWithArea(): TreeMapChildList {
    const arr: TreeMapChildList = []
    const square: { [key: string]: number } = {
      top: this.sideHor,
      topStart: 0,
      right: this.sideVert,
      rightStart: 0,
      bottom: this.sideHor,
      bottomStart: 0,
      left: this.sideVert,
      leftStart: 0
    }
    let isHorisontal = true
    const childrenAmount = this.children.length
    this.children.forEach((el, index) => {
      // Setting up data
      const child = { ...toRaw(el) } as TreeMapChild
      child.index = index
      child.zIndex = childrenAmount - index
      child.color = child.color ?? colorList[index] ?? '#' + createRandomColor()
      const percent = this.getPercentByValue({ value: child.value })
      const childArea = this.getAreaByPercent({ percent })
      const { side1, side2, side3 } = this.getSidesByIndex(index)
      const currentSide = !isHorisontal ? 'width' : 'height'
      const anotherSide = isHorisontal ? 'width' : 'height'
      const squareCurrentSideLength =
        square[side2] - square[side1 + 'Start'] - square[side3 + 'Start']

      const anotherChildSideLength = childArea / squareCurrentSideLength

      child[currentSide] = squareCurrentSideLength
      child[anotherSide] = anotherChildSideLength + 1

      // Setting position
      const side1Start = side1 + 'Start'
      const side2Start = side2 + 'Start'
      child[side1] = square[side1Start]
      child[side2] = square[side2Start]
      // Updating initial rectangle
      square[side2Start] = square[side2Start] + anotherChildSideLength
      isHorisontal = !isHorisontal
      arr.push(child)
    })
    return arr
  }

  private static validateChildren(
    children: TreeMapChildPreviewList
  ): TreeMapChildPreviewList {
    let sum = 0
    const validatedChildren: TreeMapChildPreviewList = []
    children.forEach(child => {
      if (child.value < 0) throw Error('Child value must not be less than zero')
      if (child.value === 0) return
      sum += child.value
      validatedChildren.push(child)
    })
    if (sum <= 0)
      throw Error('Value of at least one child must be bigger than zero')

    return validatedChildren
  }
  private get totalChildrenValue(): number {
    let sum = 0
    this.children.forEach(el => (sum += el.value))
    if (sum <= 0)
      throw Error('Value of at least one child must be bigger than zero')
    return sum
  }

  private getPercentByValue({
    value
  }: {
    value: TreeMapChild['value']
  }): number {
    if (value <= 0) return 0
    // 100% --- totalChildrenValue
    // x%   --- value
    const x = (100 * value) / this.totalChildrenValue
    return x
  }

  private getAreaByPercent({ percent }: { percent: number }): number {
    if (percent <= 0) return 0
    // 100% - totalSquareArea
    // percent - x
    const x = (this.totalSquareArea * percent) / 100
    return x
  }
  private getSidesByIndex(index: number): {
    side1: Sides
    side2: Sides
    side3: Sides
  } {
    const { side1, side2, side3 } = getSidesUtil({
      initPosition: Sides.bottom,
      rectInd: index
    })
    return { side1, side2, side3 }
  }
}
