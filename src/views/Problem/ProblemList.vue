<template lang="html">
  <div class="prolist-wrap">
    <Row style="margin-bottom: 20px">
      <Col span="16">
        <Page :total="sum" @on-change="pageChange" :page-size="pageSize" :current.sync="page" show-elevator></Page>
      </Col>
      <Col :span="2">
        <Select>
          <Option v-for="item in options" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </Col>
      <Col :span="4">
        <Input icon="search" placeholder="Please input..." @keyup.enter.native="search"></Input>
      </Col>
      <Col :span="2">
        <Button type="primary" @click="search">Search</Button>
      </Col>
    </Row>
    <table>
      <tr>
        <th>#</th>
        <th>PID</th>
        <th>Title</th>
        <th>Ratio</th>
        <th>Tags</th>
      </tr>
      <template v-for="(item, index) in list">
        <tr>
          <td>
            <!-- <Icon v-if="isSolved(item.id,uid) !== false" size="25" type="ios-checkmark"></Icon> -->
            <!-- <Icon v-else></Icon> -->
            <Icon></Icon>
          </td>
          <td>{{ item.id }}</td>
          <td>
            <router-link :to="{ name: 'problemInfo', params: { pid: item.id } }">
              <Button type="text" style="color:#2d8cf0;">{{ item.title }}</Button>
            </router-link>
          <td>
            (<router-link :to="{ name: 'status', query: { pid: item.id} }">
              <Button type="text" style="color:#2d8cf0">{{ item.solve }}</Button>
            </router-link> /
            <router-link :to="{ name: 'status', query: { pid: item.id } }">
              <Button type="text" style="color:#2d8cf0">{{ item.submission }}</Button>
            </router-link>)
          </td>
          <td>
            <template v-for="(item2, index2) in item.tags">
              <router-link :to="{ name: 'problemList', query: { type: 'tag', content: item2 } }">
                <Tag>{{ item2 }}</Tag>
              </router-link>
            </template>
          </td>
        </tr>
      </template>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import APIURL from '../../utils/api.js'
import { solved, unsolve} from '../../utils/submision'
export default {
  data() {
    return {
      list: [],
      options: [],
      uid: localStorage.getItem('uid')
    }
  },
  methods: {
    getProblemList: function() {
      var self = this;
      axios
      .get(APIURL + '/api/v1/problem/list')
      .then(function(response){
        self.list = response.data.data
      })
    },
    isSolved(pid,uid) {
      return solved(pid,uid)
    }
  },
  mounted: function() {
     this.getProblemList()
  },
}
</script>


<style lang="stylus" scoped>

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
    width: 10%
  th:nth-child(3)
    width: 20%
  th:nth-child(4)
    width: 20%
  th:nth-child(5)
    width: 20%
  th:nth-child(6)
    width: 10%
  th:nth-child(7)
    width: 10%
</style>