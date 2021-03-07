<template>
  <div id="WeddingList">
    <div
      class="wedding-item"
      v-for="item in weddingList"
      :key="item.id"
      @click="click(item)"
    >
      <img class="cover" :src="item.get('cover').url()" />
      <div class="right">
        <h2 class="title">{{ item.get('title') }}</h2>
        <h3 class="tag">{{ item.get('tag') }}</h3>
        <!-- <h4 class="tag">排序：{{ item.get('sort') }}</h4> -->
        <!-- <h4 class="tag">创建时间：{{ item.createdAt }}</h4> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeddingList',
  props: {},
  data() {
    return {}
  },
  computed: {
    weddingList: function () {
      return this.$store.state.weddingList
    },
  },
  async mounted() {
    await this.getNet()
  },
  methods: {
    async getNet() {
      const loading = this.$loading({
        text: 'Loading',
      })
      const query = new this.$AV.Query('wedding')
      query.descending('sort')
      query.addAscending('createdAt')
      const tag = this.$route.params.select
      if (tag && tag !== '最新') {
        query.equalTo('tag', tag)
      }
      const items = await query.find()
      this.$store.commit('setWeddingList', items)
      loading.close()
    },
    click(item) {
      this.$router.push({
        path: '/admin',
        query: {
          id: item.id,
        },
      })
    },
  },
  watch: {
    $route: 'getNet',
  },
}
</script>

<style lang="less">
#WeddingList {
  width: 100%;
  box-sizing: border-box;
  padding: 22px 65px 50px 45px;
  .wedding-item {
    width: 100%;
    display: flex;
    padding: 10px;
    background: #fff;
    cursor: pointer;
    .cover {
      width: 345px;
      height: 190px;
      object-fit: cover;
    }
    .right {
      text-align: left;
      padding-left: 25px;
      .title {
        margin-top: 0;
      }
    }
  }
}
</style>
