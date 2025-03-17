import { ref } from "vue";
import { defineStore } from "pinia";

export const useAppBasicStore = defineStore("app-basic-state", () => {
  const isNewUser = ref(false);
  const BOX_CLIENT_ID = ref("");
  const BOX_CLIENT_SECRET = ref("");
  const BOX_USER_ID = ref("");
  const SessionUsername = ref("")
  const currentSong = ref({name:"Cassette Music",src:undefined,artist:"Distributed Streaming",songID:""})

  const currentTracklist = ref([])




  const SetCurrentTrackList = (params) => {
    currentTracklist.value = params
  }

  const SetcurrentSong = (param )=>{

    currentSong.value = param
  }

  const SetSessionUsername = (param) =>{
    SessionUsername.value = param
    }


  const setBoxClientId = (id) => {
    BOX_CLIENT_ID.value = id;
  };

  const setBoxClientSecret = (secret) => {
    BOX_CLIENT_SECRET.value = secret;
  };

  const setBoxUserId = (userId) => {
    BOX_USER_ID.value = userId;
  };

  const setIsNewUser = async (params) => {
    isNewUser.value = params;
  };

  return {
    isNewUser,
    setIsNewUser,
    BOX_CLIENT_ID,
    BOX_CLIENT_SECRET,
    BOX_USER_ID,

    setBoxClientId,
    setBoxClientSecret,
    setBoxUserId,


    SessionUsername,
    SetSessionUsername,

    currentSong,
    SetcurrentSong,


    currentTracklist,
    SetCurrentTrackList,

  };
});
