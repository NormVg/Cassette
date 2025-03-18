import axios from "axios";
import mime from "mime-types"; // Helps get correct file extension
import {BoxUploadFile,BoxFolderChild} from "@/utils/BoxClient"

import { PostGress } from "~/utils/PgPool";

import { UserSchema } from "~/server/models/user.schema";

import { thumbSchema } from "~/server/models/thumb.schema";


import getCurrentDateTimeString from "~/utils/syncNowDate";

import { usernameData } from "~/server/func/usernameData";


import { ClientOAuthBox } from "~/server/func/BoxClientOAuth";


export default defineEventHandler(async (event) => {

  const host = getRequestURL(event);

  const {  username,songId } = await getQuery(event);

  var user_cassette = await usernameData(username)

  var user_tao_id = user_cassette[0].userID;

  var user_box_user_id = user_cassette[0].box_user_id;
  var user_box_client_id = user_cassette[0].box_client_id
  var user_box_client_secret = user_cassette[0].box_client_secret


  if (user_cassette.length === 0) {
    return "ERROR: user not found";
  }


  console.log(songId,"SONGid")

  try {
    // Fetch the image from the API
    const boxClient = await ClientOAuthBox(username);


    const cass_data_folder = await BoxFolderChild(boxClient,'cassette_data','0')
    const thumb_folder = await BoxFolderChild(boxClient,'thumbnails',cass_data_folder.id)




    const response = await axios.get(`${host.origin}/api/download-thumb?id=${songId}&username=${username}`, {
      responseType: "stream",
    });

    // Get MIME type from headers
    const mimeType = response.headers["content-type"];
    if (!mimeType.startsWith("image/")) {
      console.error("❌ No album art found!");
      return false
    }

    console.log("✅ Image stream received from API");

    // Determine correct file extension
    const extension = mime.extension(mimeType) || "bin"; // Fallback to .bin
    const fileName = `${songId}.${extension}`;


    const uploadedFile =  await BoxUploadFile(boxClient,response.data,fileName,thumb_folder.id)
    // console.log(uploadedFile.id)

    const newIndexItem  = {
      songID:songId,
      name:fileName,
      thumbID:uploadedFile.id
    }

    const userNowIndex = await  thumbSchema.find( { userID:user_tao_id })
    // console.log(userNowIndex,userNowIndex[0])
    let MainList = userNowIndex[0].index

    MainList.push(newIndexItem)


    const body = {
      userID: user_tao_id,
      lastSync: getCurrentDateTimeString(),
      index: MainList,
    };



    const updatedItem = await thumbSchema.findOneAndUpdate(
      { userID:user_tao_id },

      { $set: body },

      { new: true, runValidators: true }

    );
    // console.log(updatedItem)

    return true

  } catch (error) {

    console.error("❌ Failed to fetch or upload album art:", error.message);
  }






})
