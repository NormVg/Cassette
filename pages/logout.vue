<template>
  <div>

loging out...
  </div>
</template>
<script setup>


onMounted(async () => {
  await authClient.signOut();
  navigateTo("/");

});
</script>
