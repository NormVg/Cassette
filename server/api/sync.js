import { BoxClient } from "box-typescript-sdk-gen/lib/client.generated.js";
import {
  BoxCcgAuth,
  CcgConfig,
} from "box-typescript-sdk-gen/lib/box/ccgAuth.generated.js";

const ccgConfig = new CcgConfig({
  userId: "22482084327",
  clientId: "v6pvmsczecu4j9qaunxw4b31mpa9pcfd",
  clientSecret: "CvUps5dCqtgbfVp7AZpcNeTDuIJAATq5",
});

const ccgAuth = new BoxCcgAuth({ config: ccgConfig });
const client = new BoxClient({ auth: ccgAuth });


import { PostGress } from "~/utils/PgPool"

import { UserSchema } from "../models/user.schema";

import { songSchema } from "../models/song.schema";



export default defineEventHandler(async (event) => {

  const {tao_id,username} = await getQuery(event)
  var user_tao_id = ""

  if (tao_id === undefined){

    const res = await PostGress.query('SELECT * FROM "user" WHERE username = $1', [username])
    const rep = await UserSchema.find({userID:res.rows[0].id})

    if (rep.length === 0){
      return "ERROR: user not found"
     }
     user_tao_id = res.rows[0].id



  }else{
    user_tao_id = tao_id
  }


  async function IndexWalkAllFiles(id = "0", pathcat = [], Fname = "root") {
    const items = await client.folders.getFolderItems(id);
    const currentFolder = { type: "folder", name: Fname, id, child: [] };

    for (const item of items.entries) {
      if (item.type === "folder") {
        // Recursively fetch subfolders
        const subfolder = await IndexWalkAllFiles(item.id, [...pathcat, Fname], item.name);
        currentFolder.child.push(subfolder);
      } else {
        // Add files to the current folder
        currentFolder.child.push({ type: "file", name: item.name, id: item.id });
      }
    }

    return currentFolder;
  }




  function getCurrentDateTimeString() {
    const now = new Date();
    const date = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${date}-${month}-${year}-${hours}-${minutes}-${seconds}`;
  }



  const findCassetteFolder = await client.folders.getFolderItems("0");

  const targetItem = findCassetteFolder.entries.find(item => item.name === "cassette");

  if (!targetItem) {
    return []
  }
  const mainFolderId = targetItem.id
  console.log(mainFolderId)



  const nowSync = getCurrentDateTimeString()
  const MainList = await IndexWalkAllFiles(mainFolderId);

  const body = {
    userID: user_tao_id,
    lastSync: nowSync,
    index: MainList
  }

  console.log(body)


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
