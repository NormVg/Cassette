import { BoxClient } from "box-typescript-sdk-gen/lib/client.generated.js";
import {
  BoxCcgAuth,
  CcgConfig,
} from "box-typescript-sdk-gen/lib/box/ccgAuth.generated.js";

import { Readable } from "stream";
import mime from "mime-types";
import { fileTypeFromBuffer } from 'file-type';

export default defineEventHandler(async (event) => {

  async function detectFileType(buffer) {
    const fileType = await fileTypeFromBuffer(buffer);
    if (fileType) {
      console.log(`Detected type: ${fileType.mime}, Extension: .${fileType.ext}`);
      return fileType.ext; // Example: "png", "jpg", "pdf"
    }
    return null; // Unknown file type
  }

  const ccgConfig = new CcgConfig({
    userId: "22482084327",
    clientId: "v6pvmsczecu4j9qaunxw4b31mpa9pcfd",
    clientSecret: "CvUps5dCqtgbfVp7AZpcNeTDuIJAATq5",
  });

  const ccgAuth = new BoxCcgAuth({ config: ccgConfig });
  const client = new BoxClient({ auth: ccgAuth });









  const formData = await readMultipartFormData(event);

  if (!formData || formData.length === 0) {
    return { error: "No file uploaded." };
  }

  let file = null;
  let Uploadtype = "";
  let FileName = ""
  let mimeType = ""

  // Extract file and text data from formData

  for (const field of formData) {
    if (field.name === "file") {
      file = field;
    } else if (field.name === "type") {
      Uploadtype = field.data.toString();
    }else if (field.name === "Filename"){
      FileName = field.data.toString()
    }else if (field.name === "mimeType"){
      mimeType = field.data.toString()
    }
  }


  if (!file) {
    return { error: "File is required." };
  }

  console.log(file,Uploadtype,FileName,mimeType)


  if (Uploadtype === 'thumbnail'){

    let findCassetteFolder = await client.folders.getFolderItems("0");

    const data_folder = findCassetteFolder.entries.find(item => item.name === "cassette_data");

    findCassetteFolder = await client.folders.getFolderItems(data_folder.id);

    const targetItem = findCassetteFolder.entries.find(item => item.name === "thumbnails");


    const fileExtension = mime.extension(mimeType);
    const finalFileName = `${FileName}.${fileExtension}`;

    const attrs = { name: finalFileName, parent: { id: targetItem.id } };



    const buffer = Buffer.isBuffer(file.data)
    ? file.data
    : Buffer.from(file.data);

    const fileStream = new Readable({
      read() {
        this.push(buffer);
        this.push(null);
      },
    });


    detectFileType(file.data).then((ext) => console.log('File extension:', ext));

    const body = {
      attributes: attrs,
      file: fileStream,
    };

    const files = await client.uploads.uploadFile(body);
    const Nfile = files.entries[0];

    console.log(`File uploaded with id ${Nfile.id}, name ${Nfile.name}`);
    return Nfile;
  }

});
