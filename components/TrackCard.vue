<script setup>
import DefThumb from "@/assets/def-thumb.png"

import Playing from "@/assets/playing.png"

import { useActiveAreaStore } from "~/store/ActiveAreaState";
import { useAppBasicStore } from "~/store/AppBasicState";

import { musicFileExists,imageFileExists ,downloadAndSaveImage, downloadAndSaveMusic ,getImageFileSrc,getMusicFileSrc} from "~/utils/myHandlerOPFS";

const prop = defineProps(
  {
    title: {
      type: String,
      default: "Song Title",
    },
    artist: {
      type: String,
      default: "Artist",
    },
    idsong: {
      type: String,
      default: "1802275278415"
    }
  }
);

const AppBasic = useAppBasicStore()
// const ActiveArea = useActiveAreaStore()

const handleClick = async () => {

  const musicOPFS  = await musicFileExists(prop.title)
  console.log(musicOPFS,"MUSIC FILE IN OPFS")



  if (!musicOPFS){
    console.log('MUSIC NOT FOUND DOWNLOADING MUSIC')
    const { data: srcURL } = await useFetch("/api/box/songURL?song_id=" + prop.idsong+"&username="+AppBasic.SessionUsername)
    console.log("MUSIC DOWNLOADED SAVING OPFS");
    await downloadAndSaveMusic(srcURL.value.src,prop.title)
  }

  console.log('MUSIC LOADING FROM OPFS');
  const musicSrc = await getMusicFileSrc(prop.title)

  AppBasic.SetcurrentSong({
    name: prop.title,
    artist: prop.artist,
    src: musicSrc,
    songID: prop.idsong
  })


  // const { data: srcURL } = await useFetch("/api/box/songURL?song_id=" + prop.idsong+"&username="+AppBasic.SessionUsername)

  // AppBasic.SetcurrentSong({
  //   name: prop.title,
  //   artist: prop.artist,
  //   src: srcURL.value.src,
  //   songID: prop.idsong
  // })
}




const thumbnail = ref(DefThumb); // Make sure it starts as a reactive variable


const getThumbNail = async () => {



  try {


    // console.log("SONG ID",AppBasic.currentSong.songID)
    // const { data: thumb_data } = await useFetch("/api/checkAndGetThumb?username=" + AppBasic.SessionUsername + "&thumbID=" + prop.idsong)

    // if (thumb_data.value === false) {
    //   thumbnail.value = DefThumb

    // } else {
    //   console.log(thumb_data.value)
    //   thumbnail.value = thumb_data.value

    // }



    const thumbOPFS  = await imageFileExists(`${prop.idsong}.png`)
    console.log(thumbOPFS,"THUMB FILE IN OPFS")



    if (!thumbOPFS) {
      // console.log('THUMB NOT FOUND DOWNLOADING MUSIC')
      // const { data: thumb_data } = await useFetch("/api/checkAndGetThumb?username=" + AppBasic.SessionUsername + "&thumbID=" + prop.idsong)
      // console.log("THUMB DOWNLOADED SAVING OPFS");


      // if (thumb_data.value === false) {
      thumbnail.value = DefThumb
      return

      // } else {
      // console.log(thumb_data.value)
      // await downloadAndSaveImage(thumb_data.value,`${prop.idsong}.png`)


      // }
    } else {


      console.log('THUMB LOADING FROM OPFS');
      // const fileHealth = await validateAndDeleteFile("cassetteMusic", `${prop.idsong}.png`);
      // if (fileHealth){
      const thumbSrc = await getImageFileSrc(`${prop.idsong}.png`)
      console.log(thumbSrc, prop.title)
      thumbnail.value = thumbSrc



    }


  } catch (error) {
    console.log(error)
    thumbnail.value = DefThumb
  }


}






const isPlaying = computed(()=>{
  if (AppBasic.currentSong.songID === prop.idsong){

    return true
  }else{
    return false
  }
})




onMounted(async () => {
  getThumbNail()
})


</script>

<template>
  <div class="song-card" @click="handleClick">

    <div class="song-card-thumb">
      <img :src="thumbnail" alt="">

    </div>

    <div class="song-info">
      <div class="song-card-artist">
        {{ artist }}
      </div>
      <div class="song-card-title">
        {{ title }}
      </div>

    </div>

    <div id="song-playing-box" v-if="isPlaying" >
      <img :src="Playing"  alt="playing">
    </div>


  </div>
</template>

<style scoped>


#song-playing-box{
  height: 60px;
  /* width: 0px; */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  /* margin: 0%; */
  padding: 0%;
}

#song-playing-box img{
  height: 30px;
  width: 30px;
  animation: rotate 5s linear infinite;

}


.song-card {
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;
  /* padding: 10px; */
  border-radius: 10px;
  background-color: #0A090C;
  color: white;
  transition: all ease-in-out 200ms;
}

.song-card:hover {
  background-color: #17151b;

}


.song-card:active {
  scale: 0.98;

}

.song-card-thumb {
  width: 100px;
  height: 60px;
  border-radius: 10px;
  overflow: hidden;
}

.song-card-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}


.song-card-title {
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #E9DBC7;
}

.song-card-artist {
  font-size: 13px;
  color: #989084;
}

.song-info {
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}



@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

</style>
