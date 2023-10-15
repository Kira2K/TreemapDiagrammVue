<template>
  <div 
    class="tree-map"
    :style="{
      width: width + 'px',
      height: height + 'px'
    }"
    >
    <tree-map-child
    v-for="child,index in childList"
    :child="child"
    :enableVerticalTitle="enableVerticalTitle"
    :key="child.title + index">
  </tree-map-child>
  </div>

</template>
<script setup lang="ts">
import {TreeMapChildPreview, TreeMap }from './index'
import TreeMapChild from './TreeMapChild.vue'
const props = defineProps({
  chartData: Array<TreeMapChildPreview>,
  enableVerticalTitle: Boolean,
  height: Number,
  width: Number
})
if(!props.chartData ||!props.width || !props.height) throw Error("chartData, width and height are required props!");

const useTreeMap = new TreeMap({children:props.chartData,sideVert:props.height,sideHor:props.width, })
const childList = useTreeMap.getChildrenWithArea()

</script>
<style scoped lang='scss'>
.tree-map {
  position: relative;
  border-radius: 5px;
  overflow: hidden;
}
</style>