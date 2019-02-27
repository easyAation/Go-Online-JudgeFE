<template lang="html">
  <div>
    <Tabs :value="active" @on-click="change">
      <TabPane label="Description" name="problemInfo"></TabPane>
      <TabPane label="Submit" name="problemSubmit"></TabPane>
      <!-- <TabPane label="My Submissions" name="mySubmission" v-if="isLogined"></TabPane> -->
      <TabPane label="Statistics" name="problemStatistics"></TabPane>
    </Tabs>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    methods: {
        change (name) {
            this.$router.push({ name, params: { pid: this.$route.params.pid } })
        }
    }
}
</script>
