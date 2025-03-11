<script setup>
import logo from "@/assets/logo-black.svg";

import IconFs from "@/assets/fileFolder.png";
import IconTr from "@/assets/tracklist.png";
import IconPlayList from "@/assets/playlist.png";
import IconAdd from "@/assets/add.png";
import IconSettings from "@/assets/settings.png";
</script>

<template>
  <div id="sidebar-box">

    <div id="logo-box">
      <img :src="logo" alt="logo">
    </div>

    <div id="menu-box">

      <div id="menu-item">
        <img :src="IconTr" title="Tracklist">
      </div>

      <div id="menu-item">
        <img :src="IconFs" title="Folder">
      </div>

      <div id="menu-item">
        <img :src="IconPlayList" title="Playlist">
      </div>

      <div id="menu-item">
        <img :src="IconAdd" title="Add Music">
      </div>


    </div>


    <div id="settings-box">
      <img :src="IconSettings" title="Settings" >
    </div>


  </div>
</template>

<style scoped>
img {
  width: 40px;
  height: 40px;
  transition: 0.3s;

}

#logo-box,
#settings-box {
  height: 40px;
  width: 40px;
  cursor: pointer;

  /* border: 1px solid white; */
}

#menu-box {
  /* border: 1px solid white; */

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

#menu-item{
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

}

#menu-item img:hover, #settings-box img:hover{
  scale: 1.1;
}


#menu-item img:active, #settings-box img:active{
  scale: .9;
  opacity: 50%;
}



#sidebar-box {
  background-color: #AD2831;
  height: 94vh;
  width: 55px;
  border-radius: 10px;
  position: fixed;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
