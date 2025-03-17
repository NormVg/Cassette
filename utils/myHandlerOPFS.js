async function getDirectoryHandle(directoryName, options = { create: true }) {
  const root = await navigator.storage.getDirectory();
  return root.getDirectoryHandle(directoryName, options);
}

async function writeFile(directory, fileName, fileData) {
  const dirHandle = await getDirectoryHandle(directory);
  const fileHandle = await dirHandle.getFileHandle(fileName, { create: true });
  const writable = await fileHandle.createWritable();
  await writable.write(fileData);
  await writable.close();
  return fileHandle;
}

async function readFile(directory, fileName) {
  const dirHandle = await getDirectoryHandle(directory, { create: false });
  const fileHandle = await dirHandle.getFileHandle(fileName, { create: false });
  const file = await fileHandle.getFile();
  return file;
}

async function fileExists(directory, fileName) {
  try {
      const dirHandle = await getDirectoryHandle(directory, { create: false });
      await dirHandle.getFileHandle(fileName, { create: false });
      return true;
  } catch (e) {
      return false;
  }
}

async function getFileSrc(directory, fileName) {
  const file = await readFile(directory, fileName);
  return URL.createObjectURL(file);
}

async function downloadAndSaveMusic(url, fileName) {
  try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch the file');
      const blob = await response.blob();
      await saveMusicFile(fileName, blob);
      return true;
  } catch (error) {
      console.error('Error downloading music:', error);
      return false;
  }
}

async function downloadAndSaveImage(url, fileName) {
  try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch the image');
      const blob = await response.blob();
      await saveImageFile(fileName, blob);
      return true;
  } catch (error) {
      console.error('Error downloading image:', error);
      return false;
  }
}

// Helper functions to handle music and image files
async function saveMusicFile(fileName, fileData) {
  return writeFile('cassetteMusic', fileName, fileData);
}

async function saveImageFile(fileName, fileData) {
  return writeFile('cassetteImage', fileName, fileData);
}

async function getMusicFile(fileName) {
  return readFile('cassetteMusic', fileName);
}

async function getImageFile(fileName) {
  return readFile('cassetteImage', fileName);
}

async function musicFileExists(fileName) {
  return fileExists('cassetteMusic', fileName);
}

async function imageFileExists(fileName) {
  return fileExists('cassetteImage', fileName);
}

async function getMusicFileSrc(fileName) {
  return getFileSrc('cassetteMusic', fileName);
}

async function getImageFileSrc(fileName) {
  return getFileSrc('cassetteImage', fileName);
}


async function deleteAllFiles(directory) {
  try {
      const dirHandle = await getDirectoryHandle(directory, { create: false });
      for await (const entry of dirHandle.keys()) {
          await dirHandle.removeEntry(entry, { recursive: true });
      }
      return true;
  } catch (error) {
      console.error(`Error deleting files in ${directory}:`, error);
      return false;
  }
}

async function deleteFile(directory, fileName) {
  try {
      const dirHandle = await getDirectoryHandle(directory, { create: false });
      await dirHandle.removeEntry(fileName);
      console.log(`Deleted ${fileName} from ${directory}`);
  } catch (error) {
      console.error(`Error deleting ${fileName}:`, error);
  }
}


async function walkRootDirectory() {
  async function walkDirectory(dirHandle, path = '') {
    const files = [];
    for await (const [name, entry] of dirHandle.entries()) {
      const fullPath = path ? `${path}/${name}` : name;
      if (entry.kind === 'file') {
        files.push(fullPath);
      } else if (entry.kind === 'directory') {
        const subFiles = await walkDirectory(entry, fullPath);
        files.push(...subFiles);
      }
    }
    return files;
  }

  try {
    const root = await navigator.storage.getDirectory();
    return await walkDirectory(root);
  } catch (error) {
    console.error('Error walking the root directory:', error);
    return [];
  }
}


async function validateAndDeleteFile(directory, fileName) {
  try {
      const file = await readFile(directory, fileName);
      if (!file || file.size === 0) {
          console.warn(`File ${fileName} is empty or unreadable.`);
          await deleteFile(directory, fileName);
          return false;
      }

      // Optionally, you can add more validation for music/image files
      if (directory === "cassetteMusic" && !file.type.startsWith("audio/")) {
          console.warn(`File ${fileName} is not a valid audio file.`);
          await deleteFile(directory, fileName);
          return false;
      }

      if (directory === "cassetteImage" && !file.type.startsWith("image/")) {
          console.warn(`File ${fileName} is not a valid image file.`);
          await deleteFile(directory, fileName);
          return false;
      }

      console.log(`File ${fileName} is valid.`);
      return true;
  } catch (error) {
      console.error(`Error reading ${fileName}:`, error);
      await deleteFile(directory, fileName);
      return false;
  }
}


// Example usage:
// const musicBlob = new Blob([audioData], { type: 'audio/mpeg' });
// await saveMusicFile('song.mp3', musicBlob);
// const file = await getMusicFile('song.mp3');
// const exists = await musicFileExists('song.mp3');
// const src = await getMusicFileSrc('song.mp3');

export {
  saveMusicFile,
  saveImageFile,
  getMusicFile,
  getImageFile,
  musicFileExists,
  imageFileExists,
  getMusicFileSrc,
  getImageFileSrc,
  downloadAndSaveMusic,
  downloadAndSaveImage,
  deleteAllFiles,
  validateAndDeleteFile,
  walkRootDirectory
};
