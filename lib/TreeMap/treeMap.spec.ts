import { TreeMapChildPreview, TreeMap, TreeMapChild } from './index'
const mockedList: TreeMapChildPreview[] = [
  {
    title: 'nodeA',
    value: 720
  },
  {
    title: 'nodeB',
    value: 480
  },
  {
    title: 'nodeC',
    value: 240
  }
]

describe('getChildrenWithArea', () => {
  test('should return the correct array of TreeMap`s children', () => {
    const useTreeMap = new TreeMap({
      children: mockedList,
      sideVert: 240,
      sideHor: 360
    })
    const result: TreeMapChild[] = useTreeMap.getChildrenWithArea()

    expect(result).toEqual([
      {
        title: 'nodeA',
        value: 720,
        index: 0,
        zIndex: 3,
        color: '#6A89CC',
        height: 240,
        width: 181,
        bottom: 0,
        left: 0
      },
      {
        title: 'nodeB',
        value: 480,
        index: 1,
        zIndex: 2,
        color: '#B0BEC5',
        width: 180,
        height: 161,
        left: 180,
        top: 0
      },
      {
        title: 'nodeC',
        value: 240,
        index: 2,
        zIndex: 1,
        color: '#F06292',
        height: 80,
        width: 181,
        top: 160,
        right: 0
      }
    ])
  })

  test('should throw an error because child value must not be less than zero', () => {
    expect(() => {
      const crachedList = [...mockedList]
      crachedList[1].value = -1
      const useTreeMap = new TreeMap({
        children: crachedList,
        sideVert: 400,
        sideHor: 400
      })
      useTreeMap.getChildrenWithArea()
    }).toThrow('Child value must not be less than zero')
  })
})
