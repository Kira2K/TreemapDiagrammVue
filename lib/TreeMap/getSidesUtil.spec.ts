import { getSidesUtil } from './getSidesUtil'
import { Sides } from './index'

describe('getSidesUtil', () => {
  test('should return the correct sides for standart case: initPosition bottom and rectInd 0', () => {
    const result = getSidesUtil({ initPosition: Sides.bottom, rectInd: 0 })
    expect(result).toEqual({
      side1: Sides.bottom,
      side2: Sides.left,
      side3: Sides.top
    })
  })

  test('should return the correct sides for case where rectInd is higher then 4 (num of sides) and standart initPosition: initPosition bottom and rectInd 11', () => {
    const result = getSidesUtil({ initPosition: Sides.bottom, rectInd: 11 })
    expect(result).toEqual({
      side1: Sides.right,
      side2: Sides.bottom,
      side3: Sides.left
    })
  })

  test('should return the correct sides for case with unstandart position and unusual rectInd: initPosition top and rectInd 1', () => {
    const result = getSidesUtil({ initPosition: Sides.top, rectInd: 1 })
    expect(result).toEqual({
      side1: Sides.right,
      side2: Sides.bottom,
      side3: Sides.left
    })
  })

  test('should throw an error when rectInd is not a natural number', () => {
    expect(() => {
      getSidesUtil({ initPosition: Sides.top, rectInd: -1 })
    }).toThrow('rectInd must be a natural number but is -1')
  })

  test('should throw an error when rectInd is not an integer', () => {
    expect(() => {
      getSidesUtil({ initPosition: Sides.top, rectInd: 1.5 })
    }).toThrow('rectInd must be a natural number but is 1.5')
  })

  // Add more test cases as needed for other scenarios or edge cases.
})
