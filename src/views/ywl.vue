<template>
    <div style="width:100vw;height:100vh;display: flex;">
        <LiuChen/>
        <router-view class="viewContent" style="flex:1"></router-view>
    </div>
</template>
<script setup>
import LiuChen from "../components/TechnologicalProcess.vue";
</script>