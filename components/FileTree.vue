<script setup>
import backIcon from '@/assets/back_btn.png'

const props = defineProps({
  tree: {
    type: [Array, Object],
    required: true,
  },
});

// Current navigation stack
const folderStack = ref([]);

// Compute initial tree (ignore root folder)
const initialTree = computed(() => {
  if (Array.isArray(props.tree)) return props.tree;
  return props.tree.name === "root" ? props.tree.child : [props.tree];
});

// Get the current folder (last in stack) or null for home
const currentFolder = computed(() => {
  return folderStack.value.length ? folderStack.value[folderStack.value.length - 1] : null;
});

// Open a folder (add to stack)
const openFolder = (folder) => {
  folderStack.value.push(folder);
};

// Go back (remove last folder from stack)
const goBack = () => {
  folderStack.value.pop();
};
</script>

<template>
  <div class="file-tree">
    <!-- If inside a folder, show back button and folder contents -->
    <div v-if="currentFolder">
      <div class="parent-folder-box">
      <button class="back-button" @click="goBack"><img :src="backIcon" alt=""></button>
        {{ currentFolder.name }}</div>

      <div v-for="item in currentFolder.child" :key="item.id">
        <FolderCard v-if="item.type === 'folder'" :title="item.name" @click="openFolder(item)" />
        <SongCard v-if="item.type === 'file'" :idsong="item.id"  :title="item.name" :artist="currentFolder.name" />
      </div>
    </div>

    <!-- If no folder is selected, show the main tree -->
    <div v-else>
      <div v-for="item in initialTree" :key="item.id">
        <FolderCard v-if="item.type === 'folder'" :title="item.name" @click="openFolder(item)" />
        <SongCard v-if="item.type === 'file'"  :idsong="item.id"  :title="item.name" :artist="'Home'" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.file-tree {
  padding-left: 10px;
}

.back-button {
  /* margin-bottom: 10px; */
  background: none;
  color: white;
  border: none;
  /* padding: 5px 10px; */
  height: 50px;
  width:50px;
  cursor: pointer;
  /* border: 1px solid green; */

  display: flex;
  justify-content: center;
  align-items: center;
}


.back-button img{
  height:30px;
  /* border: 1px solid green; */
}

.parent-folder-box {
  margin-bottom: 10px;
  /* margin-left: 10px; */
  color: #E9DBC7;
  font-size: 25px;
  font-weight: bolder;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* border: 1px solid green; */
}
</style>
