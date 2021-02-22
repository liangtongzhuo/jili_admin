<template>
  <div id="Admin">
    <div class="input-flex">
      名字：<el-input
        class="input"
        v-model="title"
        placeholder="input title"
      ></el-input>
    </div>

    <div class="input-flex">
      排序：<el-input-number
        v-model="sort"
        :min="0"
        label="排序"
        size="small"
      ></el-input-number>
    </div>
    <div class="input-flex">
      <el-switch v-model="hidden" inactive-text="显示" active-text="隐藏">
      </el-switch>
    </div>

    <div class="content-div">
      <ul class="select-ul">
        <li v-for="(item, index) in selectList" :key="index">
          <a
            :class="item.tag === select.tag ? 'focus select' : 'select'"
            @click="clickSelect(item)"
          >
            {{ item.tag }}
          </a>
        </li>
      </ul>
    </div>

    <div class="content-div">
      <!-- <ul>
        <li class="li-color" v-for="(item, index) in colorList" :key="index">
          <a
            :class="item.type === color.type ? 'focus-color color' : 'color'"
            :style="`background:${item.color}`"
            @click="clickColor(item)"
          >
            {{ item.type === 0 ? 'ALL' : '&nbsp;' }}
          </a>
        </li>
      </ul> -->

      <div class="upload">
        <img class="cover" v-if="coverAVFile" :src="coverAVFile.url()" />
        <br v-if="coverAVFile" />
        <label for="file">封面 </label>
        <input
          type="file"
          id="cover-image-upload"
          accept=".jpg, .jpeg, .png"
          @change="coverChange"
        />
      </div>
    </div>

    <div class="content-div">
      <!-- 内容 -->
      <div class="upload">
        <div
          v-for="(item, index) in content"
          :key="index"
          class="content-item-div"
        >
          <img class="content-img" :src="item" />
          <el-button
            type="primary"
            icon="el-icon-top"
            circle
            @click="topContentImg(index)"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-bottom"
            circle
            @click="bottomContentImg(index)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deleteContentImg(index)"
          ></el-button>
        </div>
        <br v-if="content.length > 0" />
        <label for="file">内容 </label>
        <input
          type="file"
          id="content-image-upload"
          accept=".jpg, .jpeg, .png"
          @change="contentChange"
          multiple
        />
      </div>
    </div>

    <el-button
      style="margin-top: 20px"
      size="small"
      type="success"
      @click="save"
      >保存</el-button
    >
    <el-button style="margin-top: 20px" size="small" @click="$router.back()"
      >返回</el-button
    >
  </div>
</template>

<script>
export default {
  name: 'Admin',
  components: {},
  data() {
    return {
      selectList: [{ tag: '婚礼案例' }, { tag: '活动案例' }],
      title: '',
      select: { tag: '婚礼案例' },
      sort: 0,
      coverAVFile: '',
      hidden: false,
      content: [],
      id: this.$route.query.id,
      // colorList: [
      //   {
      //     type: 0,
      //     color: 'linear-gradient(45deg,#ef544c,#fda539,#dee64e,50%,#43c2cd)',
      //   },
      //   {
      //     type: 1,
      //     color: '#ef544c',
      //   },
      // ],
      // color: '',
      wedding: {},
    }
  },
  async mounted() {
    // 如果是编辑，从服务器获取数据
    if (this.id) {
      const wedding = this.$AV.Object.createWithoutData('wedding', this.id)
      await wedding.fetch()
      this.title = wedding.get('title')
      this.sort = wedding.get('sort')
      this.hidden = wedding.get('hidden')
      this.select = {
        tag: wedding.get('tag'),
      }
      this.coverAVFile = wedding.get('cover')
      this.content = wedding.get('content').split('##')
      this.wedding = wedding
    }
  },
  methods: {
    // 上移
    topContentImg(index) {
      const fieldData = this.content
      if (index != 0) {
        fieldData[index] = fieldData.splice(index - 1, 1, fieldData[index])[0]
      } else {
        fieldData.push(fieldData.shift())
      }
    },
    // 下移
    bottomContentImg(index) {
      const fieldData = this.content
      if (index != fieldData.length - 1) {
        fieldData[index] = fieldData.splice(index + 1, 1, fieldData[index])[0]
      } else {
        fieldData.unshift(fieldData.splice(index, 1)[0])
      }
    },
    // 内容删除
    deleteContentImg(index) {
      this.content.splice(index, 1)
    },
    async save() {
      if (this.title.length === 0)
        return this.$message.error('error, title null')
      if (!this.coverAVFile) return this.$message.error('error, 封面 null')
      if (!this.select) return this.$message.error('error, select null')

      const WeddingDB = this.$AV.Object.extend('wedding')
      const weddingDB = this.id ? this.wedding : new WeddingDB()
      weddingDB.set('title', this.title)
      weddingDB.set('tag', this.select.tag)
      weddingDB.set('sort', this.sort)
      weddingDB.set('hidden', this.hidden)
      weddingDB.set('content', this.content.join('##'))

      const loading = this.$loading({
        lock: true,
        text: 'Loading',
      })

      try {
        // 保存封面
        weddingDB.set('cover', this.coverAVFile)
        await weddingDB.save()
      } catch (error) {
        loading.close()
        return this.$message.error(JSON.stringify(error))
      }
      loading.close()
      this.$message({
        message: '保存成功,2 秒跳转首页',
        type: 'success',
      })
      setTimeout(() => {
        this.$router.back()
      }, 2000)
    },
    // 上传详情的图片
    async contentChange() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
      })
      const coverImage = document.getElementById('content-image-upload')
      let i = 0
      for (const coverImageFile of coverImage.files) {
        const avCoverImageFile = new this.$AV.File(
          coverImageFile.name,
          coverImageFile
        )
        // 保存
        await avCoverImageFile.save()
        const url = avCoverImageFile.url()
        // 内容 push
        this.content.push(url)
        i++
        this.$message({
          message: `第${i}张，上传成功`,
          type: 'success',
        })
      }

      loading.close()
      this.$message({
        message: '封面上传全部成功',
        type: 'success',
      })
    },
    // 上传封面
    async coverChange() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
      })
      const coverImage = document.getElementById('cover-image-upload')
      const coverImageFile = coverImage.files[0]
      const avCoverImageFile = new this.$AV.File(
        coverImageFile.name,
        coverImageFile
      )
      // 保存
      await avCoverImageFile.save()
      this.coverAVFile = avCoverImageFile
      loading.close()
      this.$message({
        message: '封面上传成功',
        type: 'success',
      })
    },

    clickSelect(item) {
      this.select = item
    },
    clickColor(item) {
      this.color = item
    },
  },
}
</script>

<style lang="less">
#Admin {
  width: 1000px;
  text-align: left;
  margin: 30px auto;
  .input-flex {
    display: flex;
    margin-top: 20px;
    align-items: center;
    font-size: 14px;
    .input {
      width: 95%;
    }
  }

  .content-div {
    margin-top: 20px;
    width: 100%;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.02), 0 4px 8px 0 rgba(0, 0, 0, 0.02);
    border-radius: 2px;
    background: #fff;
    display: flex;
    flex-wrap: wrap;

    ul {
      width: 100%;
      padding: 21px;
      margin: 0;
      display: flex;
      li {
        list-style: none;
        margin-right: 40px;
        text-align: left;
        cursor: pointer;

        .select {
          text-decoration: none;
          outline: 0;
          color: #222;
        }
        a {
          border: 1px solid #fff;
          border-radius: 2px;
          padding: 1px 3px;
        }
        .focus {
          color: #c90000;
          border: 1px #c90000 solid;
        }
        .color {
          display: inline-block;
          text-decoration: none;
          color: white;
          width: 28px;
          height: 18px;
          box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.1);
          text-align: center;
          overflow: hidden;
        }
      }
      .li-color {
        margin-right: 20px;
        .focus-color:before {
          content: '\2714';
          color: white;
        }
      }
    }

    .content-item-div {
      display: flex;
      align-items: center;

      button {
        margin-left: 25px;
      }
    }
    .upload {
      padding: 10px 21px;
      width: 100%;
      .cover {
        width: 345px;
        height: 190px;
        object-fit: cover;
      }
      .content-img {
        margin-top: 5px;
        width: 345px;
        object-fit: cover;
      }
    }
  }
}
</style>
