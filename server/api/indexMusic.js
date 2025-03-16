import { BoxIndexWalkAllFiles, ClientBox,BoxFindItem } from "~/utils/BoxClient";
import { songSchema } from "../models/song.schema";
import getCurrentDateTimeString from "~/utils/syncNowDate";
import { usernameData } from "../func/usernameData";



export default defineEventHandler(async (event) => {

  const {username} = await getQuery(event)

  var user_cassette = await usernameData(username)

  var user_tao_id = user_cassette[0].userID;

  var user_box_user_id = user_cassette[0].box_user_id;
  var user_box_client_id = user_cassette[0].box_client_id
  var user_box_client_secret = user_cassette[0].box_client_secret


  if (user_cassette.length === 0) {
    return "ERROR: user not found";
  }



  const boxClient = await ClientBox(user_box_user_id,user_box_client_id,user_box_client_secret);

  const targetItem = await BoxFindItem(boxClient,"cassette")



  if (!targetItem) {
    return []
  }
  const mainFolderId = targetItem.id




  const nowSync = getCurrentDateTimeString()
  const MainList = await BoxIndexWalkAllFiles(boxClient,mainFolderId);

  const body = {
    userID: user_tao_id,
    lastSync: nowSync,
    index: MainList
  }




  const SongNew = await songSchema.findOneAndUpdate(
    { userID:user_tao_id },

    { $set: body },

    { new: true, runValidators: true }

  );


  if (SongNew) {
    return {"Document updated successfully:":SongNew};

  } else {

    const made_new = await new songSchema(body).save()


    return {"No document found with the provided seq:": user_tao_id,"made_new":made_new}

  }




});
