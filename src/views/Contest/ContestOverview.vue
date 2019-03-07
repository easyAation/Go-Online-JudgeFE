<template lang="html">
  <div class="conover-wrap">
    <h1>{{ overview.contest.title }}</h1>
    <h3>Start Time:&nbsp;&nbsp;{{ overview.contest.start_time | timePretty }}</h3>
    <h3>End Time:&nbsp;&nbsp;{{ overview.contest.end_time | timePretty }}</h3>
    <table>
      <tr>
        <th>#</th>
        <th>ID</th>
        <th>Title</th>
        <th>Ratio</th>
      </tr>
      <tr v-for="(item, index) in overview.problem" :key="item.pid">
        <td>
          <Icon v-if="1 !== -1" type="checkmark-round"></Icon>
        </td>
        <!-- <td>{{ index + 1 }}</td> -->
        <td>{{ item.index }}</td>
        <td>
          <router-link :to="{ name: 'contestProblemInfo', params: { pid: item.id,cid: cid, id: item.index } }">
            <Button type="text" style="color:#2d8cf0">{{ item.title }}</Button>
          </router-link>
        <td>
          <!-- <span>{{ item.solve / (item.submision + 0.000001) | formate }}</span>&nbsp; -->
          ({{ item.solve }} / {{ item.submission }})
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
      return {
        overview: [],
        cid: ''
      }
    },
    methods: {
      getContestOverView: function() {
        var self = this
        axios
        .get('http://localhost:4040/api/v1/contest/detail',{
          params : {
            contest_id : self.cid
          }
        })
        .then(function(response) {
            self.overview = response.data.data
        })
      }
    },
    mounted: function() {
      this.getContestOverView()
    },
    created() {
      this.cid = this.$route.params.cid
    }
}
</script>

<style lang="stylus">
table
  width: 100%
  border-collapse: collapse
  border-spacing: 0
  th:nth-child(1)
    padding-left: 10px
  tr
    border-bottom: 1px solid #ebeef5
    height: 40px
    line-height: 40px
    font-size: 14px
    td:nth-child(1)
      padding-left: 10px
  th
    text-align:left
  .ivu-btn
    vertical-align: baseline
    color: #e040fb
    padding: 0 1px
    font-size: 14px

table
  th:nth-child(1)
    width: 5%
  th:nth-child(2)
    width: 5%
  th:nth-child(3)
    width: 60%

h1
  text-align: center
  margin-top: 10px
  margin-bottom: 8px
  font-size: 30px
h3
  text-align: center
  margin-bottom: 8px
table
  margin-bottom: 20px
</style>
