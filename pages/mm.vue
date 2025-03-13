<script setup>
import { ref } from "vue";
import { parseBlob } from "music-metadata"; // now hybrid, works in browser

const file = ref(null);
const metadata = ref(null);
const thumbnail = ref(null);

const handleFileChange = async (event) => {
  const selectedFile = event.target.files[0];
  if (!selectedFile) return;

  try {
    const metadataResult = await parseBlob(selectedFile);
    metadata.value = metadataResult.common;

    // Extract the first cover art if available
    if (metadataResult.common.picture?.length) {
      const cover = metadataResult.common.picture[0];
      const blob = new Blob([cover.data], { type: cover.format });
      thumbnail.value = URL.createObjectURL(blob);
    } else {
      thumbnail.value = null;
    }
  } catch (error) {
    console.error("Error reading metadata:", error);
  }
};
</script>

<template>
  <div class="container">
    <input type="file" @change="handleFileChange" accept="audio/*" />

    <div v-if="metadata">
      <h3>Metadata:</h3>
      <p><strong>Title:</strong> {{ metadata.title || "Unknown" }}</p>
      <p><strong>Artist:</strong> {{ metadata.artist || "Unknown" }}</p>
      <p><strong>Album:</strong> {{ metadata.album || "Unknown" }}</p>

      <div v-if="thumbnail">
        <h3>Thumbnail:</h3>
        <img :src="thumbnail" alt="Album Art" class="thumbnail" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
}
.thumbnail {
  width: 200px;
  height: 200px;
  border-radius: 10px;
  margin-top: 10px;
}
</style>
