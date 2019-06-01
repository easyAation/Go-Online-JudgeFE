<template lang="html">
  <div class="status-wrap">
    <Row class="filter">
      <Col :offset="1" :span="5">
        <Col :span="6"><label>User</label></Col>
        <Col :span="15"><Input v-model="uid" placeholder="username"></Input></Col>
      </Col>
      <Col :span="4">
        <Col :span="6"><label>Pid</label></Col>
        <Col :span="15"><Input v-model="pid" placeholder="pid"></Input></Col>
      </Col>
      <Col :span="6">
        <Col :span="6"><label>Judge</label></Col>
        <Col :span="16">
          <Select v-model="judge" placeholder="请选择">
            <Option
              v-for="item in judgeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </Option>
          </Select>
        </Col>
      </Col>
      <Col :span="4">
        <Col :span="12"><label>Language</label></Col>
        <Col :span="12">
          <Select v-model="language" placeholder="请选择">
            <Option
              v-for="item in languageList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </Option>
          </Select>
        </Col>
      </Col>
      <Col :span="3">
        <Button type="primary" @click="search" icon="md-search">Search</Button>
      </Col>
    </Row>
    <Row class="pagination">
      <Col :span="16">
        <Page :total="sum" @on-change="pageChange" :page-size="pageSize" :current.sync="page" show-elevator></Page>
      </Col>
    </Row>
    <table>
      <tr>
        <th>SID</th>
        <th>PID</th>
        <th>Username</th>
        <th>Result</th>
        <th>Time/ms</th>
        <th>Memory/kb</th>
        <th>Language</th>
        <th>Submit Time</th>
      </tr>
      <tr v-for="(item, index) in list" :key="item.id">
        <td>{{ item.submit_id }}</td>
        <td>
          <router-link :to="{ name: 'problemInfo', params: { pid: item.pid } }">
            {{ item.pid }}
          </router-link>
        </td>
        <td>
          <router-link :to="{ name: 'userInfo', params: { uid: item.uid } }">
            <Button type="text" style="color:#2d8cf0;"> lianxm </Button>
          </router-link>
        </td>
        <td v-if="item.result === 'Accepted'" style="color:green">
          {{item.result}}
        </td>
        <td v-else-if="item.result === 'Compilation Error'" style="color:purple">
          {{item.result}}
        </td>
        <td v-else-if="item.result === 'Wrong Answer'" style="color:red">
          {{ item.result }}
        </td>
        <td v-else style="color:blue">
          {{ item.result }}
        </td>
        <td>{{ item.run_time }}</td>

        <td v-if="item.memory === null">
            0
        </td>
        <td v-else>
            {{item.memory}}
        </td>
        <td >{{ item.language }}</td>
        <td>{{ item.created_at | timePretty }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            list: [],
            judgeList: [],
            languageList: [],
        }
    },
    methods: {
        getSubmissions: function() {
            var self = this;
            axios
            .get(process.env.BASE_API + '/v1/submit/list')
            .then(function(response) {
              console.log("response:",  response)
              self.list = response.data.data.reverse()
              console.log(self.list)
            })
        }
    },
    mounted: function() {
        this.getSubmissions()
  },
}
</script>

<style lang="stylus">
@import '../styles/common'
.filter
  margin-bottom: 20px
  label
    height: 32px
    line-height: 32px
  .ivu-col
    text-align: center
  .ivu-select-item
    text-align: left
.pagination
  margin-bottom: 10px
table
  th:nth-child(1)
    width: 8%
  th:nth-child(2)
    width: 8%
  th:nth-child(3)
    width: 10%
  th:nth-child(4)
    width: 15%
  th:nth-child(5)
    width: 8%
  th:nth-child(6)
    width: 8%
  th:nth-child(7)
    width: 8%
  th:nth-child(8)
    width: 15%
</style>
