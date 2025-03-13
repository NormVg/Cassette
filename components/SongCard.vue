<script setup>
import DefThumb from "@/assets/def-thumb.png"
import { useAppBasicStore } from "~/store/AppBasicState";
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
    idsong:{
      type: String,
      default:"1802275278415"
    }
  }
);

const AppBasic = useAppBasicStore()

const handleClick = async ()=>{
  console.log(prop.idsong)

  const {data:srcURL} = await useFetch("/api/box/songURL?song_id="+prop.idsong)

  AppBasic.SetcurrentSong({
    name:prop.title,
    artist:prop.artist,
    src:srcURL.value.src
  })
}




const thumbSrc = ref(DefThumb); // Make sure it starts as a reactive variable

// watchEffect(async () => {
//   if (!prop.idsong) return; // Ensure `idsong` is valid

//   const { data: thumb } = await useFetch(`/api/thumb?id=${prop.idsong}`);
//   console.log("Fetched Thumbnail:", typeof thumb.value === Object);

//   if (thumb.value) {
//     const blob = new Blob([thumb.value], { type: "image/png" });
//     thumbSrc.value = URL.createObjectURL(blob); // Assign fetched value reactively
//   }
// });

</script>

<template>
  <div class="song-card" @click="handleClick">

    <div class="song-card-thumb">
      <img :src="thumbSrc" alt="">
    </div>

    <div class="song-info">
      <div class="song-card-artist">
        {{ artist }}
      </div>
      <div class="song-card-title">
        {{ title }}
      </div>

    </div>


  </div>
</template>

<style scoped>

.song-card{
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;
  /* padding: 10px; */
  border-radius: 10px;
  background-color: #0A090C;
  color: white;
}

.song-card-thumb{
  width: 100px;
  height: 60px;
  border-radius: 10px;
  overflow: hidden;
}

.song-card-thumb img{
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

.song-info{
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}

</style>
