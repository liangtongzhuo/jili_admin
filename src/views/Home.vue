<template>
  <div id="home">
    <Head />
    <Select />
    <WeddingList />
    <div class="upload">
      <el-button type="primary" round @click="$router.push({ name: 'Admin' })"
        >上传案例</el-button
      >
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Head from '@/components/Head.vue'
import WeddingList from '@/components/WeddingList.vue'
import Select from '@/components/Select.vue'
export default {
  name: 'Home',
  components: {
    Head,
    WeddingList,
    Select,
  },
}
</script>
<style lang="less">
#home {
  .upload {
    position: fixed;
    width: 100%;
    text-align: center;
    bottom: 20px;
  }
}
</style>
