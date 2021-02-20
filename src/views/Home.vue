<template>
  <div class="home">
    <Head />
    <Select />
    <WeddingList />
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
    Select
  }
}
</script>
