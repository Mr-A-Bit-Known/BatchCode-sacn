<template>
  <div
    id="app"
    class="isShow"
    :class="{ isBlock: isBlock }"
    v-loading.fullscreen.lock="fullscreenLoading"
  >
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isBlock: true,
      fullscreenLoading: true,
    };
  },
  created() {
    this.fullscreenLoading = true;
  },
  mounted() {
    this.fullscreenLoading = false;
  },
};
</script>

<style scoped>
.isShow {
  display: none;
}
.isBlock {
  display: block;
}
::-webkit-scrollbar {
  display: none;
}
</style>
