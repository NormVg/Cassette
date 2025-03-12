
<script setup>


const {isMobile}  = useDevice();

</script>

<template>

<Desktop v-if="!isMobile"/>
<Phone v-else/>"

</template>

<style scoped>


</style>
