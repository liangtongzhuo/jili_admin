<template>
  <div id="Select">
    <div class="content">
      <ul class="select-ul">
        <li v-for="(item, index) in selectList" :key="index">
          <router-link
            :to="selectRouter(item)"
            :class="
              item === $route.params.select ||
              (!$route.params.select && item === '最新')
                ? 'focus select'
                : 'select'
            "
          >
            {{ item }}
          </router-link>
        </li>
      </ul>

      <!-- <ul>
        <li class="li-color" v-for="(item, index) in colorList" :key="index">
          <router-link
            :class="
              item.index === $route.params.color ? 'focus-color color' : 'color'
            "
            :to="colorRouter(item.type)"
            :style="`background:${item.color}`"
          >
            {{ item.type === 0 ? 'ALL' : '&nbsp;' }}
          </router-link>
        </li>
      </ul> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Select',
  props: {},
  data() {
    return {
      selectList: [
        '最新',
        '婚礼案例',
        '活动案例',
      ],
      colorList: [
        {
          type: 0,
          color: 'linear-gradient(45deg,#ef544c,#fda539,#dee64e,50%,#43c2cd)'
        },
        {
          type: 1,
          color: '#ef544c'
        },
        {
          type: 2,
          color: '#fda539'
        },
        {
          type: 3,
          color: '#dee64e'
        },
        {
          type: 4,
          color: '#36be57'
        },
        {
          type: 5,
          color: '#43c2cd'
        },
        {
          type: 6,
          color: '#3977e3'
        },
        {
          type: 7,
          color: '#8044d6'
        },
        {
          type: 8,
          color: '#cb66c4'
        },
        {
          type: 9,
          color: '#fff'
        },
        {
          type: 10,
          color: '#e6e6e6'
        },
        {
          type: 11,
          color: '#000000'
        },
        {
          type: 12,
          color: '#7a4168'
        }
      ]
    }
  },
  mounted() {},
  methods: {
    selectRouter(item) {
      return this.$route.params.color
        ? `/${item}/${this.$route.params.color}`
        : `/${item}`
    },
    colorRouter(item) {
      return this.$route.params.select
        ? `/${this.$route.params.select}/${item}`
        : `/最新/${item}`
    }
  }
}
</script>

<style lang="less">
#Select {
  width: 100%;
  box-sizing: border-box;
  padding: 55px 44px 0px 44px;
  .content {
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
        .select {
          text-decoration: none;
          outline: 0;
          color: #222;
        }
        .focus {
          color: #c90000;
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
        .router-link-active:before {
          content: '\2714';
          color: white;
        }
      }
    }
  }
}
</style>
