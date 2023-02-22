<template>
  <div class="home">
    <!-- 左侧导航栏 -->
    <TopNavigation />
    <!-- 顶部导航栏 -->
    <LeftNavigation class="auto-fill" />
  </div>
</template>

<script setup>
import TopNavigation from "@/components/TopNavigation.vue";
import LeftNavigation from "@/components/LeftNavigation.vue";
</script>

<style scoped>
.home {
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column;
}

.auto-fill {
  flex: 1;
}
</style>
