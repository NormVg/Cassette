<script setup>
import DefWall from "@/assets/wall3.gif";
</script>

<template>
  <div id="wall-box">
    <!-- <img :src="DefWall" alt=""> -->

  </div>
</template>

<style scoped>

#wall-box{
  height: 220px;
  width: calc(100% - 80px);
  /* background-color:rgb(72, 55, 25) ; */
  margin-left:70px ;
  margin-right: 20px;
  margin-top: 10px;
  border-radius: 10px;
  overflow: hidden;

  background-image: url(@/assets/wall2.gif);
  background-position: 50% 20%;
  background-repeat: no-repeat;
  background-size: cover
;
}

/* #wall-box img{

  width: 100%;
  height: 100%;
  object-fit: cover;
  display: flex;
  align-items: center;
  justify-content: center;


} */

</style>
