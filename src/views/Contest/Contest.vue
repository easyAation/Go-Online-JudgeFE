<template lang="html">
  <div class="conin-wrap">
    <Card class="card">
      <Row type="flex" justify="center">
        <Col :span="6">Begin: {{ contest.start_at | timePretty }}</Col>
        <Col :span="12" v-if="currentTime < contest.start_at">未开始</Col>
        <Col :span="12" v-if="currentTime > contest.start_at && currentTime < contest.end_at">正在进行</Col>
        <Col :span="12" v-if="currentTime > contest.end_at ">已结束</Col>
        <Col :span="6">End: {{ contest.end_at | timePretty }}</Col>
      </Row>
        <Progress :stroke-width="18" :percent="timePercentage"></Progress>
    </Card>
    <Tabs :value="display" @on-click="handleClick">
      <TabPane label="Overview" name="contestOverview"></TabPane>
      <TabPane label="Problem" name="contestProblem"></TabPane>
      <!-- <TabPane label="Submit" name="contestSubmit"></TabPane> -->
      <TabPane label="Status" name="contestStatus"></TabPane>
      <TabPane label="Ranklist" name="contestRank"></TabPane>
      <!-- <TabPane label="Edit" name="contestEdit" v-if="isAdmin"></TabPane> -->
    </Tabs>
    <router-view v-if="contest && contest.id"></router-view>
    <!-- 为了确保之后的 children 能拿到 contest -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      display: ""
    };
  },
  computed: {
    ...mapGetters({
      contest: "contest/contest",
      // isAdmin: "session/isAdmin",
      currentTime: "currentTime"
    }),
    timePercentage() {
      if (this.currentTime < this.contest.start_at) {
        return 0;
      } else if (this.currentTime > this.contest.end_at) {
        return 100;
      } else {
        return +(
          ((this.currentTime - this.contest.start_at) * 100) /
          (this.contest.end_at - this.contest.start_at)
        ).toFixed(1);
      }
    }
  },
  created() {
    this.display = this.$route.name;
    this.$store.dispatch("contest/findOne", this.$route.params.cid);
    this.$store.dispatch("contest/getSubmission", this.$route.params.cid);
  },
  methods: {
    handleClick(name) {
      if (name === "contestProblem" || name === "contestSubmit") {
        this.$router.push({
          name: name,
          params: {
            cid: this.$route.params.cid,
            id: this.$route.params.id || 1
          }
        });
      } else {
        this.$router.push({
          name: name,
          params: { cid: this.$route.params.cid }
        });
      }
    }
  },
  watch: {
    $route(to, from) {
      this.display = to.name;
    }
  }
};
</script>

<style lang="stylus">
.conin-wrap {
  margin-bottom: 20px;

  .card {
    margin-bottom: 20px;
  }

  .ivu-col {
    text-align: center;
    margin-bottom: 20px;
    font-size: 16px;
  }

  .ivu-progress-bg {
    background-color: #e040fb;
  }

  .ivu-progress-text {
    color: #e040fb;
  }
}
</style>
