<template>
  <div 
    class='tree-map-child'
    :style="getStyle(child)">
    <p class="tree-map-child__title">
      {{child.title }}
    </p>
  </div>
</template>
  
<script setup lang="ts">
import { computed, ComputedRef} from 'vue'
import {Sides,TreeMapChild,Position}from './index'

const props = defineProps<{
  child: TreeMapChild
  enableVerticalTitle: boolean
}>()
const position: ComputedRef<Position> =computed(()=>{
  const top = props.child[Sides.top]
  const bottom = props.child[Sides.bottom]
  const left = props.child[Sides.left] 
  const right =  props.child[Sides.right]  
  const position:Position = {} as Position
  position.width =props.child.width+'px' 
  position.height =props.child.height+'px' 
  if(typeof top==='number') position.top =top+'px' 
  if(typeof bottom==='number') position.bottom =bottom+'px' 
  if(typeof left==='number') position.left =left+'px' 
  if(typeof right==='number') position.right =right +'px' 
  return position
}) 

const orientation = computed(()=>(props.child.width / props.child.height) >= 1)
const writingMode =props.enableVerticalTitle ? {
  writingMode: orientation.value ? 'horizontal-tb' :'vertical-lr',
  textOrientation:orientation.value ? '' :'upright' 
}: {}
const getStyle = (child:TreeMapChild):{[key: string]: any}=>{
  return {
      ...position.value,
      backgroundColor:child.color,
      zIndex:child.zIndex,
      ...writingMode
    }
}
</script>
<style scoped lang='scss'>
.tree-map-child{
  box-sizing: border-box;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  &__title {
    padding: 4px;
    color: white;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>