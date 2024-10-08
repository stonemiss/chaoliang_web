<template>
  <div id="app" :style="isGray? 'filter: grayscale(100%);' : ''">
    <router-view />
  </div>
</template>
<script>
import { websiteGreyStatus } from "./api/management";
export default {
  data() {
    return {
      // 是否置灰
      isGray: false
    }
  },
  mounted() {
    this.getWebsiteGreyStatus()
  },
  methods: {
    async getWebsiteGreyStatus() {
      const res =await websiteGreyStatus()
      if(res.code==1) {
        if(res.data==1) {
          this.isGray = true
        }
      }
    },
  }
}
</script>
<style lang="scss">

</style>
