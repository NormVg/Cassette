
<script setup>
import { useActiveAreaStore } from '~/store/ActiveAreaState';



const ActiveAreaStore = useActiveAreaStore()

</script>

<template>
  <div id="active-area">

    <div id="box-title">
      {{ ActiveAreaStore.currentArea }}
    </div>

    <slot>

    </slot>

  </div>
</template>

<style scoped>

#box-title{

  font-size: 30px;
  margin-left: 10px;
  margin-top: 10px;

}

#active-area{
  height:calc(100vh - 250px);
  width: calc(100% - 25vw - 90px);
  background-color:#ad28319a;
  margin-left:calc(25vw + 80px); ;
  margin-right: 20px;
  margin-top: calc(-100vh + 250px);
  border-radius: 10px;
  overflow: auto;
  animation: slideInFromRight 1.2s forwards;
}
@keyframes slideInFromRight {
  0% {
    transform: translateX(100%);
    opacity: 0;
    filter: blur(10px);
  }
  100% {
    transform: translateX(0);
    opacity: 1;
    filter: blur(0);
  }
}
</style>
