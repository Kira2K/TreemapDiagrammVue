<script setup lang="ts">
import TreeMap from '../lib/TreeMap/TreeMap.vue'
import {TreeMapChildPreviewList}from '../lib/TreeMap/index'
import { reactive } from 'vue'
const mockedList = [
  {
    title: 'nodeA',
    value: 720,
    color: 'pink'
  },
  {
    title: 'nodeB',
    value: 480
  },
  {
    title: 'nodeC',
    value: 240
  },
  {
    title: 'nodeD2fret5y6785654321`',
    value: 170
  },
  {
    title: 'nodeE',
    value: 100
  }
]
const data1:TreeMapChildPreviewList =reactive(mockedList)
</script>

<template>
     <tree-map 
      :chartData="data1"
      :enableVerticalTitle="false"
      :width="240"
      :height="240">
    </tree-map>
</template>
