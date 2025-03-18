
import { thumbSchema } from "../models/thumb.schema";

import {  BoxListDir, BoxFolderChild } from "~/utils/BoxClient";
import { usernameData } from "../func/usernameData";
import getCurrentDateTimeString from "~/utils/syncNowDate";

import { ClientOAuthBox } from "~/server/func/BoxClientOAuth";


export default defineEventHandler(async (event) => {
  const {  username } = await getQuery(event);

  var user_cassette = await usernameData(username)

  var user_tao_id = user_cassette[0].userID;

  var user_box_user_id = user_cassette[0].box_user_id;
  var user_box_client_id = user_cassette[0].box_client_id
  var user_box_client_secret = user_cassette[0].box_client_secret


  if (user_cassette.length === 0) {
    return "ERROR: user not found";
  }

  const clientBox = await ClientOAuthBox(username);

  const cass_data_folder = await BoxFolderChild(
    clientBox,
    "cassette_data",
    "0"
  );


  const thumb_folder = await BoxFolderChild(
    clientBox,
    "thumbnails",
    cass_data_folder.id
  );



  if (!thumb_folder) {
    return [];
  }

  let MainList = [];

  const DirList = await BoxListDir(clientBox, thumb_folder.id);

  DirList.forEach((element) => {
    MainList.push({
      songID:element.name.split(".")[0],
      name: element.name,
      thumbID: element.id,
    });
  });



  const nowSync = getCurrentDateTimeString();


  const body = {
    userID: user_tao_id,
    lastSync: nowSync,
    index: MainList,
  };



  const ThumbNew = await thumbSchema.findOneAndUpdate(
    { userID: user_tao_id },

    { $set: body },

    { new: true, runValidators: true }
  );

  if (ThumbNew) {
    return { "Document updated successfully:": ThumbNew };
  } else {
    const made_new = await new thumbSchema(body).save();

    return {
      "No document found with the provided seq:": user_tao_id,
      made_new: made_new,
    };
  }
});
