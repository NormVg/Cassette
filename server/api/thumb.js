import { defineEventHandler, getQuery, send } from "h3";
import axios from "axios";
import * as mm from "music-metadata";

export default defineEventHandler(async (event) => {
  const { url, id } = getQuery(event);

  // console.log(process.env.API_BASE_URL,"asd")
  let audioUrl;

  const host = getRequestURL(event);

  if (url === undefined) {
    const response = await axios.get(
      `${host.origin}/api/box/songURL?song_id=${id}`
    );

    audioUrl = response.data.src; // Assign the response data to audioUrl
  } else {
    audioUrl = url;
  }

  if (!audioUrl) {
    return { error: "Missing audio URL" };
  }

  try {
    // Download the audio file as a buffer
    const response = await axios.get(audioUrl, { responseType: "arraybuffer" });
    const audioBuffer = Buffer.from(response.data);

    // Extract metadata from the audio buffer
    const metadata = await mm.parseBuffer(audioBuffer, "audio/mpeg"); // Adjust for other formats

    if (metadata.common.picture && metadata.common.picture.length > 0) {
      const picture = metadata.common.picture[0]; // Get first image
      const mimeType = picture.format; // e.g., image/jpeg

      // Return the album art as an image
      return send(event, Buffer.from(picture.data), mimeType);
    } else {
      return { error: "No album art found" };
    }
  } catch (error) {
    return { error: "Failed to extract thumbnail", details: error.message };
  }
});
