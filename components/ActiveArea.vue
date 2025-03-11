
<script setup>
const prop = defineProps(
  {
    title: {
      type: String,
      default: "Active Area",
    }
  }
);
</script>

<template>
  <div id="active-area">

    <div id="box-title">
      {{ prop.title }}
    </div>

    <slot>

    </slot>

  </div>
</template>

<style scoped>

#box-title{

  font-size: 30px;
  margin-left: 10px;
  margin-top: 10px;

}

#active-area{
  height:calc(100vh - 280px);
  width: calc(100% - 80px);
  background-color:#ad28319a;
  margin-left:70px ;
  margin-right: 20px;
  margin-top: 40px;
  border-radius: 10px;
  overflow: hidden;
}

</style>
