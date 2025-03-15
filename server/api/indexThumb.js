import { PostGress } from "~/utils/PgPool";

import { UserSchema } from "../models/user.schema";

import { thumbSchema } from "../models/thumb.schema";

import { ClientBox, BoxListDir, BoxFolderChild } from "~/utils/BoxClient";

export default defineEventHandler(async (event) => {
  const { tao_id, username } = await getQuery(event);

  var user_tao_id = "";

  if (tao_id === undefined) {

    const res = await PostGress.query(
      'SELECT * FROM "user" WHERE username = $1',
      [username]
    );

    const rep = await UserSchema.find({ userID: res.rows[0].id });

    if (rep.length === 0) {

      return "ERROR: user not found";

    }

    user_tao_id = res.rows[0].id;

  } else {

    user_tao_id = tao_id;

  }

  const clientBox = await ClientBox();

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

  function getCurrentDateTimeString() {
    const now = new Date();
    const date = now.getDate().toString().padStart(2, "0");
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    return `${date}-${month}-${year}-${hours}-${minutes}-${seconds}`;
  }

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

  // console.log(body)

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
