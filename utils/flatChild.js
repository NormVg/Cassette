
function extractFiles(folder, parentPath = "") {
  let fileList = [];

  // Compute the current folder's full path
  const currentPath = parentPath ? `${parentPath}/${folder.name}` : folder.name;

  // If it has children, process them
  if (folder.child && Array.isArray(folder.child)) {
    for (const item of folder.child) {
      if (item.type === "file") {
        fileList.push({
          id: item.id,
          name: item.name
          // path: `${currentPath}/${item.name}`, // Full path of the file
        });
      } else if (item.type === "folder") {
        fileList = fileList.concat(extractFiles(item, currentPath)); // Recurse into folders
      }
    }
  }

  return fileList;
}

export default extractFiles
