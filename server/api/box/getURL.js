import { ClientBox,BoxFileURL } from "~/utils/BoxClient";

export default defineEventHandler(async (event) => {

  const {file_id} = await getQuery(event)
    const boxClient = await ClientBox()
   const url =  await BoxFileURL(boxClient,file_id)


  return url

});
