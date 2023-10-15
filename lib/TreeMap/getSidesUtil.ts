import { Sides } from './index'
export function getSidesUtil({
  initPosition,
  rectInd
}: {
  initPosition: Sides.top | Sides.bottom
  rectInd: number
}): { [key: string]: Sides } {
  if (rectInd % 1 != 0 || rectInd < 0) {
    throw Error('rectInd must be a natural number but is ' + rectInd)
  }
  const i = JSON.parse(JSON.stringify(rectInd))

  const { top, right, bottom, left } = Sides
  const type3 = { side1: top, side2: right, side3: bottom }
  const type4 = { side1: right, side2: bottom, side3: left }
  const type1 = { side1: bottom, side2: left, side3: top }
  const type2 = { side1: left, side2: top, side3: right }
  const models = new Map()
  const reverse_models = new Map()
  const typesArr = [type1, type2, type3, type4]
  typesArr.forEach((type, index) => {
    models.set(type.side1, index)
    reverse_models.set(index, type)
  })

  let initPositionModel = 0

  if (models.has(initPosition)) {
    initPositionModel = models.get(initPosition)
  }

  let mathResult = 0
  if (i === 0 || i % 4 == 0) {
    mathResult = initPositionModel
  } else {
    mathResult = initPositionModel + (i % 4)
  }
  const resolvedResult = mathResult < 4 ? mathResult : mathResult - 4
  return reverse_models.get(resolvedResult)
}
