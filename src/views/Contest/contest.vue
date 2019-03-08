<template lang="html">
  <div class="conin-wrap">
    <Card class="card">
      <Row type="flex" justify="center">
        <Col :span="6">Begin: {{ contest.contest.start_time | timePretty }}</Col>
        <Col :span="12" v-if="formateTime(currentTime) < formateTime(contest.contest.start_time)">Ready</Col>
        <Col :span="12" v-if="formateTime(currentTime) > formateTime(contest.contest.start_time) && formateTime(currentTime) < formateTime(contest.contest.end_time)">Running</Col>
        <Col :span="12" v-if="formateTime(currentTime) > formateTime(contest.contest.end_time)">Ended</Col>
        <Col :span="6">End: {{ contest.contest.end_time | timePretty }}</Col>
      </Row>
        <Progress :stroke-width="18" :percent="timePercentage(formateTime(currentTime),formateTime(contest.contest.start_time),formateTime(contest.contest.end_time))"></Progress>
    </Card>
    <Tabs :value="display" @on-click="handleClick">
      <TabPane label="Overview" name="contestOverview"></TabPane>
      <TabPane label="Problem" name="contestProblemInfo"></TabPane>
      <TabPane label="Submit" name="contestProblemSubmit"></TabPane>
      <TabPane label="Status" name="contestStatus"></TabPane>
      <TabPane label="Ranklist" name="contestRanklist"></TabPane>
      <!-- <TabPane label="Edit" name="contestEdit" v-if="isAdmin"></TabPane> -->
    </Tabs>
    <!-- <router-view v-if="contest.contest && contest.contest.id"></router-view> -->
    <router-view></router-view>
    <!-- 为了确保之后的 children 能拿到 contest -->
  </div>
</template>

<script>
import axios from 'axios'
import APIURL from '../../utils/api.js'
import { formate, timePretty, timeContest, timeagoPretty, timePercent }from '../../utils/formate'
export default {
    data() {
        return {
            contest: [],
            display: ''
        }
    },
    methods: {
        getContestOverView: function() {
            var self = this
            axios
            .get(APIURL + '/api/v1/contest/detail',{
                params : {
                    contest_id : self.cid
                }
            })
            .then(function(response) {
                self.contest = response.data.data
            })
        },
        formateTime(time) {
            return timePretty(time)
        },
        timePercentage (currentTime,start_time,end_time) {
            if (currentTime < start_time) {
                return 0
            } else if (currentTime > end_time) {
                return 100
            } else {
                return timePercent(currentTime,start_time,end_time)
            }
        },
        handleClick(name) {
          if (name === 'contestProblemInfo' || name === 'contestProblemSubmit') {
            this.$router.push({ name: name, params: { cid: this.cid, pid: 1, id: 1 } })
          } else {
            this.$router.push({ name: name, params: { cid: this.cid } })
          }
        }
    },
    mounted: function() {
        this.getContestOverView()
    },
    created() {
        this.display = this.$route.name
        this.cid = this.$route.params.cid
    },
    watch: {
      '$route' (to, from) {
      this.display = to.name
    }
  }
}
</script>

<style lang="stylus">
.conin-wrap
  margin-bottom: 20px
  .card
    margin-bottom: 20px
  .ivu-col
    text-align: center
    margin-bottom: 20px
    font-size: 16px
  .ivu-progress-bg
    background-color: #2d8cf0
  .ivu-progress-text
    color: #2d8cf0
</style>
