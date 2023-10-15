## vue-treemap-diagramm

Simple treemap diagramm for Vue3 and Vite. Use predefined colors or provide your own instead. DEMO:

## Quick start

- Install with [npm](https://www.npmjs.com/): `npm install vue-treemap-diagramm`
- Install with [yarn](https://yarnpkg.com/): `yarn add vue-treemap-diagramm`
- Inside your Vue file: `import {TreeMap} from 'vue-treemap-diagramm'`
- Import styles globally by `import 'vue-treemap-diagramm/dist/style.css'`

## Documentation

|         Prop        |        PropType       | Default |          Description          |
|:-------------------:|:---------------------:|:-------:|:-----------------------------:|
|      chartData      | TreeMapChildPreview[] |    -    |      Data of the diagramm     |
| enableVertivalTitle |        boolean        |  false  | Write node titles vertically  |
|        width        |         number        |    -    |     Width of the diagramm     |
|        height       |         numer         |    -    |     Heght of the diagramm     |

## Typisation of chartData

ChartData (`TreeMapChildPreviewList`) is an array of objects with (`TreeMapChildPreview`) type, is made to provide data to the diagramm. It supports such features as `value`, `title` and `color`.

|  Key  | PropType | Required |     Description    |
|:-----:|:--------:|:--------:|:------------------:|
| value |  number  |   true   |  Value of the node |
| title |  string  |   true   | Title of the node  |
| color |  string  |   false  |  Color of the node |

## Creators

**Kira Samsonova**

- <https://twitter.com/pillowDemoness>
- <https://github.com/Kira2K>
- kitsunewebdeveloper@gmail.com