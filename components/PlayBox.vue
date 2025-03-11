
<script setup>
import Play from "@/assets/play.png";
import Mix from "@/assets/mix.png";
import Loop from "@/assets/loop.png";
import Pause from "@/assets/pause.png";
</script>

<template>
  <div id="playbox-box">

    <div id="thumbnail-box">
      <img src="@/assets/thumb.png" alt="thumbnail">
    </div>

    <div id="player-box">

      <div id="pb-info">
        <div id="pb-title" >Midnight - alemeerk</div>
        <div id="pb-artist">alemeerk</div>
      </div>

      <div class="bar" id="bar">
            <div class="play-now" id="play-now">0:00</div>
            <div class="bar-full" id="bar-full">
                <div class="bar-now" id="bar-now"></div>
            </div>
            <div class="play-end" id="play-full">0:00</div>
        </div>

      <div id="pb-controls">
        <div id="pb-mix" class="pb-btn">
          <img :src="Mix" alt="mix">
        </div>
        <div id="pb-play-pause" class="pb-btn">          <img :src="Play" alt="play">        </div>
        <div id="pb-loop" class="pb-btn">
          <img :src="Loop" alt="loop">
        </div>

      </div>

    </div>


  </div>
</template>

<style scoped>

#pb-info{
  /* border: 1px solid wheat; */
  width: 100%;
margin-left: 20px;
}

#pb-title{
  padding-top: 10px;
  font-size: 1.5rem;
  color: #0A090C;
}

#pb-artist{
  font-size: 1.2rem;
  color: #0A090C;
}

#pb-controls{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
}



.bar{
  margin-top: 20px;
    width: 90%;
    height: 15px;
    flex-direction: row;
    color: #0A090C;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    /* margin-top: 200px; */

}

.bar-full{
    width: 94%;
    height: 10px;
    background-color: #E9DBC7;
    border-radius: 5px;
    margin-top: 3px;
}
.bar-now{
    height: 100%;
    width: 40%;
    background-color: #0A090C;
    border-radius: 5px;
    transition: all ease-in-out .2s;
}


#player-box{

  width:calc( 100% - 190px) ;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}


#playbox-box{
  background-color: #AD2831;
  background-image: url(@/assets/noise-texture.svg);
  background-size: cover;
  background-repeat: no-repeat;

  width: 50vw;
  height: 190px;
  z-index: 2;
  border-radius: 10px;
  position: fixed;
  top: 15%;
  left: 50%;
  transform: translate(-50%, -15%);
  display: flex;
  justify-content:space-between;
  align-items: center;
  /* flex-direction: column; */
  /* margin:  10px auto; */
}

#thumbnail-box{
  width: 190px;
  height: 190px;
  overflow: hidden;
  border-radius: 10px;
}

#thumbnail-box img{
height: 100%;
width: 100%;
object-fit: cover;

}

</style>
