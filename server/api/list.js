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



export default defineEventHandler(async () => {

var MainList = []

async function IndexWalkAllFiles(id = "0", pathcat, Fname) {
  const items = await client.folders.getFolderItems(id);

  if (Fname !== "root") {
    var newPathcat = [...pathcat, Fname];
  } else {
    var newPathcat = [...pathcat];
  }

  for (const item of items.entries) {
    // console.log("pathcat", newPathcat);
    if (item.type === "folder") {
      // console.log("<---", item.name, "--->");
      await IndexWalkAllFiles(item.id, newPathcat, item.name);
    } else {
      // newPathcat.push(item.name);
      MainList.push({id:item.id,name:item.name,path:newPathcat});
      console.log(item.name, newPathcat);
    }
  }
}





  var pathCat = [];

  await IndexWalkAllFiles("0", pathCat, "root");

  return MainList
});
