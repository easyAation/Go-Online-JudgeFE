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
        <Page :total="count" @on-change="changePage" :page-size="pageSize" :current.sync="currentIndex" show-elevator></Page>
      </Col>
    </Row>
    <table>
      <tr>
        <th>SID</th>
        <th>PID</th>
        <th>Username</th>
        <th>Judge</th>
        <th>Time/ms</th>
        <th>Memory/kb</th>
        <th>Language</th>
        <th>Submit Time</th>
      </tr>
      
      <tr v-for="(item, index) in showList" :key="item.id">
        <td>{{ item.submit_id }}</td>
        <td>
          <router-link :to="{ name: 'contestProblem', params: { id: item.id } }">
            {{ item.pid }}
          </router-link>
        </td>
        <td>
          <router-link :to="{ name: 'userInfo', params: { uid: item.uid } }">
            <Button type="text" style="color:#2d8cf0;">{{ item.uid }}</Button>
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
        <td>{{ item.run_time}}</td>

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
import http from "../../http.js";
import { clearInterval } from "timers";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      uid: "",
      pid: "",
      judge: "",
      language: "",
      list: [],
      showList: [],
      currentIndex: 1,
      pageSize: 2,
      judgeList: [],
      languageList: []
    };
  },
  computed: {
    ...mapGetters({
      submission: "contest/submission",
      count: "contest/submissionTotal"
    })
  },
  methods: {
    getSubmissions() {
      this.$store
        .dispatch("contest/getSubmission", this.$route.params.cid)
        .then(res => {
          let start = (this.currentIndex - 1) * this.pageSize;
          let end = start + this.pageSize;
          this.showList = this.submission.slice(start, end);
        })
        .catch(err => {
          this.$Message.error(err.message);
          console.log(this.submission);
        });
      // http.get("contest/submission").then(res => {
      //   console.log(res);
      //   this.list = res.data.list.reverse();
      //   this.count = res.data.total;

      //   let start = (this.currentIndex - 1) * this.pageSize;
      //   let end = start + this.pageSize;
      //   this.showList = this.list.slice(start, end);
      // });
    },
    changePage(index) {
      console.log(index);
      let start = (index - 1) * this.pageSize;
      let end = start + this.pageSize;
      this.showList = this.submission.slice(start, end);
    },
    search() {}
  },
  created() {
    this.cid = this.$route.params.cid;
    this.getSubmissions();
  },
  mounted() {
    this.timer = setInterval(() => {
      this.getSubmissions();
    }, 5000);
  },
  beforeDestroy() {
    window.clearInterval(this.timer);
  }
};
</script>

<style lang="stylus">
@import '../../styles/common';

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
