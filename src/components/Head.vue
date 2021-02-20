<template>
  <div id="Head">
    <div class="wrapper">
      <h3>几立婚礼后台 </h3>
      <div class="query-center">
        <el-input
          id="query-input"
          placeholder="搜素"
          v-model="input3"
          size="medium"
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Head',
  props: {},
  data() {
    return {
      input3: ''
    }
  }
}
</script>

<style lang="less">
#Head {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 48px;
  z-index: 99997;
  background: #fff;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  .wrapper {
    width: 100%;
    padding: 0px 50px 0 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      flex-direction: row;
      width: 220px;
      .logo {
        width: 80px;
        height: 28px;
        background: url(../assets/logo.png) 0 0 no-repeat;
        display: inline-block;
        margin-right: 25px;
      }
      .nav {
        display: flex;
        a {
          color: #444;
          line-height: 40px;
          text-decoration: none;
          margin-right: 25px;
        }
        .router-link-active {
          color: #c90000;
        }
      }
    }
    .query-center {
      display: flex;
      flex-grow: 1;
      padding-left: 10px;
      .el-input__inner {
        width: 100%;
      }
      .el-input__inner:focus {
        border-color: #c90000 !important;
      }
    }
  }
}
</style>
