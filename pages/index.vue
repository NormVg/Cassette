
<script setup>
// import { useDevice } from '@nuxtjs/device/runtime/composables/useDevice';

const {isMobile}  = useDevice();
console.log(isMobile,"is mobile");
</script>

<template>

<Desktop v-if="!isMobile"/>
<!-- <Desktop v-if="$device.isDesktop" /> -->

<Phone v-else/>"

</template>

<style scoped>


</style>
