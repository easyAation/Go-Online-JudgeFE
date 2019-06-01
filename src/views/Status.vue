<template lang="html">
  <div class="status-wrap">
    <Row class="filter">
      <Col :offset="1" :span="5">
        <Col :span="6"><label>用户姓名</label></Col>
        <Col :span="15"><Input v-model="searchData.uid" placeholder="用户ID"></Input></Col>
      </Col>
      <Col :span="4">
        <Col :span="6"><label>题目编号</label></Col>
        <Col :span="15"><Input v-model="searchData.pid" placeholder="pid"></Input></Col>
      </Col>
      <Col :span="6">
        <Col :span="6"><label>结果</label></Col>
        <Col :span="16">
          <Select v-model="searchData.result" placeholder="请选择">
            <Option
              v-for="item in judgeList"
              :key="item"
              :label="item"
              :value="item">
            </Option>
          </Select>
        </Col>
      </Col> 
      <Col :span="4">
        <Col :span="12"><label>语言</label></Col>
        <Col :span="12">
          <Select v-model="searchData.language" placeholder="请选择">
            <Option
              v-for="item in languageList"
              :key="item"
              :label="item"
              :value="item">
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
        <Page :total="dataCount" :page-size="pageSize"  @on-change="changePage" :current.sync="currentIndex" show-elevator show-total></Page>
      </Col>
    </Row>
    <table>
      <tr>
        <th>提交编号</th>
        <th>题目编号</th>
        <th>用户ID</th>
        <th>结果</th>
        <th>时间/ms</th>
        <th>内存/kb</th>
        <th>语言</th>
        <th>提交时间</th>
      </tr>
      <tr v-for="(item, index) in showList" :key="item.id">
        <td>
             <!-- <router-link :to="{name: 'Sulotion', params:{item.submit_id} }"> -->
                
             <!-- </router-link> -->
              <router-link :to="{ name: 'solution', params: { sid: item.submit_id } }">
                    {{ item.submit_id }}
          </router-link>
        </td>
        <td>
          <router-link :to="{ name: 'problemInfo', params: { pid: item.pid } }">
            {{ item.pid }}
          </router-link>
        </td>
        <td>
          <router-link :to="{ name: 'userInfo', params: { uid: item.uid } }">
            <Button type="text" style="color:#2d8cf0;"> {{item.uid}} </Button>
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
        <td v-else-if="item.result !== '' " style="color:blue">
          {{ item.result }}
        </td>
        <td v-else style="color:purple">
            Compileing
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
import http from "../http";
export default {
  data() {
    return {
      uid: "",
      pid: "",
      currentIndex: 1,
      pageSize: 20,
      dataCount: 0,
      searchData: {
        language: "",
        result: "",
        uid: "",
        pid: ""
      },
      list: [],
      showList: [],
      totalList: [],
      judgeList: ["Accept", "Wrong Answer"],
      languageList: ["C", "C++", "Golang"]
    };
  },
  created() {
    this.getSubmissions();
  },
  methods: {
    getSubmissions() {
      http.get("submit/list").then(res => {
        console.log("response:", res);
        this.totalList = res.data.data.reverse();
        this.dataCount = res.data.total;

        let start = (this.currentIndex - 1) * this.pageSize;
        let end = start + this.pageSize;
        this.showList = this.totalList.slice(start, end);
      });
    },

    // search status
    search() {},
    changePage(index) {
      let start = (index - 1) * this.pageSize;
      let end = start + this.pageSize;
      this.showList = this.totalList.slice(start, end);
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.getSubmissions();
    }, 5000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style lang="stylus">
@import '../styles/common';

.filter {
  margin-bottom: 20px;

  label {
    height: 32px;
    line-height: 32px;
  }

  .ivu-col {
    text-align: center;
  }

  .ivu-select-item {
    text-align: left;
  }
}

.pagination {
  margin-bottom: 10px;
}

table {
  th:nth-child(1) {
    width: 8%;
  }

  th:nth-child(2) {
    width: 8%;
  }

  th:nth-child(3) {
    width: 10%;
  }

  th:nth-child(4) {
    width: 15%;
  }

  th:nth-child(5) {
    width: 8%;
  }

  th:nth-child(6) {
    width: 8%;
  }

  th:nth-child(7) {
    width: 8%;
  }

  th:nth-child(8) {
    width: 15%;
  }
}
</style>
