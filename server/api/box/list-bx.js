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







  const findCassetteFolder = await client.folders.getFolderItems("0");

  const targetItem = findCassetteFolder.entries.find(item => item.name === "cassette");

  if (!targetItem) {
    return []
  }
  const mainFolderId = targetItem.id
  console.log(mainFolderId)


  return await IndexWalkAllFiles(mainFolderId);
});
