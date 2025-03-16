import { BoxClient } from "box-typescript-sdk-gen/lib/client.generated.js";
import {
  BoxCcgAuth,
  CcgConfig,
} from "box-typescript-sdk-gen/lib/box/ccgAuth.generated.js";



const ClientBox =  async (userId = '22482084327',clientId='v6pvmsczecu4j9qaunxw4b31mpa9pcfd',clientSecret="CvUps5dCqtgbfVp7AZpcNeTDuIJAATq5") => {

const ccgConfig = new CcgConfig({
  userId: userId,
  clientId: clientId,
  clientSecret: clientSecret,
});

const ccgAuth = new BoxCcgAuth({ config: ccgConfig });
const client = new BoxClient({ auth: ccgAuth });

return client

}


const BoxUploadFile = async (ClientBox,FileStream,FileName,parentID='0') => {

  const attrs = { name: FileName, parent: { id: parentID } };

  const body = {
    attributes: attrs,
    file: FileStream,
  };

  const files = await ClientBox.uploads.uploadFile(body);
  const file = files.entries[0];

  console.log(`File uploaded with id ${file.id}, name ${file.name}`);
  return file;

}


const BoxFolderChild = async (ClientBox,name,parentID='0') => {
  let findCassetteFolder = await ClientBox.folders.getFolderItems(parentID);

  const data_folder = findCassetteFolder.entries.find(item => item.name === name);
  return data_folder
}

const BoxListDir = async (ClientBox,parentID='0') => {
  let findCassetteFolder = await ClientBox.folders.getFolderItems(parentID);


  return findCassetteFolder.entries
}

const BoxFindItem = async (ClientBox,itemName,parentID="0") => {
  let findCassetteFolder = await ClientBox.folders.getFolderItems(parentID);
  const finded = findCassetteFolder.entries.find(item  => item.name === itemName)

  if (!finded){
    return false
  }else{

    return finded
  }

}


const BoxFileURL = async (ClientBox,fileID) => {
  const url =  await ClientBox.downloads.getDownloadFileUrl(fileID);
  return url
}



async function BoxIndexWalkAllFiles(client , id = "0", pathcat = [], Fname = "root") {
  const items = await client.folders.getFolderItems(id);
  const currentFolder = { type: "folder", name: Fname, id, child: [] };

  for (const item of items.entries) {
    if (item.type === "folder") {
      // Recursively fetch subfolders
      const subfolder = await BoxIndexWalkAllFiles(client,item.id, [...pathcat, Fname], item.name);
      currentFolder.child.push(subfolder);
    } else {
      // Add files to the current folder
      currentFolder.child.push({ type: "file", name: item.name, id: item.id });
    }
  }

  return currentFolder;
}


export { ClientBox , BoxUploadFile,BoxFolderChild ,BoxListDir, BoxFileURL,BoxFindItem,BoxIndexWalkAllFiles}
