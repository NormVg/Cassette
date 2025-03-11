<script setup>
import DefWall from "@/assets/def-wall.png";
</script>

<template>
  <div id="wall-box">
    <img :src="DefWall" alt="">

  </div>
</template>

<style scoped>

#wall-box{
  height: 220px;
  width: calc(100% - 80px);
  background-color:rgb(72, 55, 25) ;
  margin-left:70px ;
  margin-right: 20px;
  margin-top: 10px;
  border-radius: 10px;
  overflow: hidden;
}

#wall-box img{

  width: 100%;

}

</style>
