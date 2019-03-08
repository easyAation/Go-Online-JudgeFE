<template lang="html">
  <div class="con-wrap">
    <table>
      <tr>
        <th>CID</th>
        <th>Title</th>
        <th>Status</th>
        <th>Start Time</th>
        <th>Type</th>
      </tr>
      <template v-for="(item, index) in list">
        <tr>
          <td>{{ item.id }}</td>
          <td>
            <router-link :to="{ name: 'contestOverview', params: { cid: item.id } }">
            <span style="color:#2d8cf0" @click="visit(item)">{{ item.title }}</span>
            </router-link>
          <td>
            <span class="ready" v-if="formateTime(item.start_time) > formateTime(currentTime)">Ready</span>
            <span class="run" v-if="formateTime(item.start_time) < formateTime(currentTime) && formateTime(item.end_time) > formateTime(currentTime)">Running</span>
            <span class="end" v-if="formateTime(item.end_time) < formateTime(currentTime)" >Ended</span>
          </td>
          <td>
            <span>{{ item.start_time | timePretty }}</span>
          </td>
          <td>
            <span>
              {{ item.type }}
            </span>
          </td>
        </tr>
      </template>
    </table>
    <Page :total="sum"
      @on-change="pageChange"
      :page-size="pageSize"
      :current.sync="page"
      show-elevator>
    </Page>
  </div>
</template>

<script>
import axios from 'axios'
import APIURL from '../utils/api.js'
import { formate, timePretty, timeContest, timeagoPretty }from '../utils/formate'
export default {
    data() {
        return {
            list: []
        }
    },
    methods: {
        getContestList: function() {
            var self = this
            axios
            .get(APIURL + '/api/v1/contest/list')
            .then(function(response) {
                self.list = response.data.data.reverse()
            })
        },
        visit: function() {
            
        },
        formateTime(time) {
            return timePretty(time)
        }
    },
    mounted: function() {
        this.getContestList()
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


.con-wrap
  margin-bottom: 20px
  table
    margin-bottom: 20px
    th:nth-child(1)
      padding-left: 30px
      width: 5%
    th:nth-child(2)
      width: 30%
    th:nth-child(3)
      width: 10%
    th:nth-child(4)
      width: 15%
    th:nth-child(5)
      width: 10%
    th:nth-child(6)
      width: 10%
    th:nth-child(7)
      width: 10%
    td:nth-child(1)
      padding-left: 30px
  .ready
    font-weight: bold
    color: blue
  .run
    font-weight: bold
    color: red
  .end
    font-weight: bold
    color: black
  .public
    font-weight: 500
  .password
    color: green
    font-weight: 500
  .private
    color: red
    font-weight: 500
</style>

