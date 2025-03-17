<script setup>
import DefWall from "@/assets/wall2.gif";
import { useAppBasicStore } from "~/store/AppBasicState";


const wallpaper = ref( DefWall)

const AppBasic = useAppBasicStore()


const fetchWallpaper = async () => {
  try {

    const {data:src} = await useFetch("/api/box/getWallpaper?username="+AppBasic.SessionUsername)

    if(src.value === false){
      wallpaper.value = DefWall
    }else{
      wallpaper.value = src.value
    }


  } catch (error) {
    wallpaper.value = DefWall
  }
}

onMounted(async () => {
fetchWallpaper()
}

)
</script>

<template>
  <div id="wall-box" :style="`background-image: url(${wallpaper});`" >
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

  /* background-image: url(wallpaper); */
  background-position: 50% 20%;
  background-repeat: no-repeat;
  background-size: cover;

  animation: slideInFromTop .8s forwards;
}


@keyframes slideInFromTop {
  0% {
    transform: translateY(-100%);
    opacity: 0;
    filter: blur(10px);
  }
  100% {
    transform: translateY(0);
    opacity: 1;
    filter: blur(0);
  }
}
</style>
