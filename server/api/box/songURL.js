
import { BoxClient } from "box-typescript-sdk-gen/lib/client.generated.js";
import {
  BoxCcgAuth,
  CcgConfig,
} from "box-typescript-sdk-gen/lib/box/ccgAuth.generated.js";

export default defineEventHandler(async (event) => {


const ccgConfig = new CcgConfig({
  userId: "22482084327",
  clientId: "v6pvmsczecu4j9qaunxw4b31mpa9pcfd",
  clientSecret: "CvUps5dCqtgbfVp7AZpcNeTDuIJAATq5",
});

const ccgAuth = new BoxCcgAuth({ config: ccgConfig });
const client = new BoxClient({ auth: ccgAuth });




  const {song_id} = await getQuery(event)




   const url =  await client.downloads.getDownloadFileUrl(song_id);


  return {
    src: url,
  };
});
