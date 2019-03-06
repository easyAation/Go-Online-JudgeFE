<template lang="html">
  <div>
    <Tabs :value="active" @on-click="change">
      <TabPane label="Description" name="problemInfo"></TabPane>
      <TabPane label="Submit" name="problemSubmit"></TabPane>
      <TabPane label="My Submissions" name="mySubmission" v-if="isLogin"></TabPane>
      <TabPane label="Statistics" name="problemStatistics"></TabPane>
    </Tabs>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    data() {
      return {
        active: '',
        isLogin: localStorage.getItem('Flag')
      }
    },
    methods: {
        change (name) {
            this.$router.push({ name, params: { pid: this.$route.params.pid } })
        }
    },
    created() {
       this.active = this.$route.name
    },
    watch: {
      '$route' (to, from) {
      this.active = to.name
      }
    }
}
</script>
