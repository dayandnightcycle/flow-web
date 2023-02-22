<script setup>
import { RouterView } from 'vue-router'
</script>
<script>
export default  {
  name:  'App',
  created() {
    if(this.$router.path !== '/home'){
      this.$router.replace('/')
    }
  }
}
</script>
<template>
  <RouterView />
</template>
<style>
*{
  padding: 0;
  margin: 0;
}

</style>

