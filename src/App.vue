<template>
  <div id="app">
    <oj-layout></oj-layout>
  </div>
</template>

<script>
import Layout from './components/Layout'
export default {
  name: 'App',
  components: {
    'oj-layout': Layout
  },
  // meta: {isLogin: false}
}
</script>

<style lang="stylus">
a
  text-decoration: none
ul, li
  list-style-type: none
.ac
  color: red
.wa, .re, .tle, .mle, .ole, .se, .rp
  color: #11b811
.ce
  color: #6633FF
.pe
  color: orange
.pd, .rj
  color: black
</style>

<style>
    .btn-menu {
      font-size: 16px;
      float: right;
      margin-right: 10px;
    }
</style>


