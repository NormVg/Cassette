<template>

  <Analytics/>
  <NuxtPage />
</template>

<style>
  body{
    background-color: #0A090C;
    font-family: "K2D", sans-serif;
  font-weight: 400;
  font-style: normal;
  }
</style>


<script setup>
import "@/assets/main.css";
import { Analytics } from '@vercel/analytics/nuxt';
</script>
