<template lang="html">
  <div class="rank-wrap">
    <Row style="margin-bottom: 20px" type="flex" justify="end">
      <Col :span="1"><label>用户</label></Col>
      <Col :span="3">
        <!-- <Select v-model="group">
          <Option v-for="item in groupList" :value="item.gid" :key="item.gid">{{ item.title }}</Option>
        </Select> -->
      </Col>
      <Col :span="2">
        <Button type="primary" @click="search">Search</Button>
      </Col>
    </Row>
    <table>
      <tr>
        <th>排名</th>
        <th>用户</th>
        <th>昵称</th>
        <th>个性签名</th>
        <th>解决</th>
        <th>提交</th>
        <th>比率</th>
      </tr>
      <tr v-for="(item, index) in list" :key="item.id">
        <td>{{index + 1}}</td>
        <td>
          <router-link :to="{ name: 'userInfo', params: { uid: item.id } }">
            <Button type="text">{{ item.id }}</Button>
          </router-link>
        </td>
        <td>{{ item.name }}</td>
        <td> 这个用户太懒了,没有签名~</td>
        <td>
          <router-link :to="{ name: 'status'}">
            <Button type="text">{{ item.accept }}</Button>
          </router-link>
        </td>
        <td>
          <router-link :to="{ name: 'status', query: { uid: item.id } }">
            <Button type="text">{{ item.submit }}</Button>
          </router-link>
        <td>
          <span>{{ item.accept / (item.submit + 0.0000001) | formate }}</span>
        </td>
      </tr>
    </table>
    <!-- <Page :total="sum"
      @on-change="pageChange"
      :page-size="pageSize"
      :current.sync="page"
      show-elevator>
    </Page> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "userRank/list"
    })
  },
  methods: {
    search() {}
  },
  created() {
    this.$store.dispatch("userRank/getUserRank").catch(err => {
      this.$Message.error("system error.");
      this.$Message.error(err.message);
    });
  }
};
</script>

<style lang="stylus">
@import '../styles/common';

.rank-wrap {
  margin-bottom: 20px;

  label {
    line-height: 30px;
  }

  table {
    margin-bottom: 20px;

    td {
      word-break: break-all;
      line-height: 20px;
      font-size: 14px;
    }

    td:nth-child(4) {
      width: 50%;
      padding-right: 10px;
    }
  }
}
</style>


