

import { BoxClient } from "box-typescript-sdk-gen/lib/client.generated.js";
import {
  BoxCcgAuth,
  CcgConfig,
} from "box-typescript-sdk-gen/lib/box/ccgAuth.generated.js";



const API_URL = "http://localhost:3000/api/thumb"; // Update this
const songId = "1802287426960"; // Replace with actual song ID




const ccgConfig = new CcgConfig({
  userId: "22482084327",
  clientId: "v6pvmsczecu4j9qaunxw4b31mpa9pcfd",
  clientSecret: "CvUps5dCqtgbfVp7AZpcNeTDuIJAATq5",
});

const ccgAuth = new BoxCcgAuth({ config: ccgConfig });
const client = new BoxClient({ auth: ccgAuth });





import axios from "axios";
import mime from "mime-types"; // Helps get correct file extension


async function fetchAndUploadImage() {
  try {
    // Fetch the image from the API
    const response = await axios.get(`${API_URL}?id=${songId}`, {
      responseType: "stream",
    });

    // Get MIME type from headers
    const mimeType = response.headers["content-type"];
    if (!mimeType.startsWith("image/")) {
      console.error("❌ No album art found!");
      return;
    }

    console.log("✅ Image stream received from API");

    // Determine correct file extension
    const extension = mime.extension(mimeType) || "bin"; // Fallback to .bin
    const fileName = `album-art.${extension}`;

    // Directly pass the image stream to upload function
    await uploadFile(response.data, fileName);
  } catch (error) {
    console.error("❌ Failed to fetch or upload album art:", error.message);
  }
}

async function uploadFile(stream, fileName, toId = "0") {
  const attrs = { name: fileName, parent: { id: toId } };

  const body = {
    attributes: attrs,
    file: stream, // Pass the stream directly
  };

  // Mocked client.uploads.uploadFile() function
  const files = await client.uploads.uploadFile(body);
  const uploadedFile = files.entries[0];

  console.log(`📤 File uploaded with id ${uploadedFile.id}, name ${uploadedFile.name}`);
  return uploadedFile;
}

// Run the process
fetchAndUploadImage();





// Run the process
fetchAndUploadImage();
