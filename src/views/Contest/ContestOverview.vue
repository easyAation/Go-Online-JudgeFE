<template lang="html">
  <div class="conover-wrap">
    <h2>{{ contest.title }}</h2>
    <h4>Start Time:&nbsp;&nbsp;{{ contest.create_at | timePretty }}</h4>
    <h4>End Time:&nbsp;&nbsp;{{ contest.end_at | timePretty }}</h4>
    <table>
      <tr>
        <th>#</th>
        <th>ID</th>
        <th>Title</th>
        <th>Ratio</th>
      </tr>
      <tr v-for="(item, index) in problems" :key="item.pid">
        <td>
           <Icon v-if=" isLogined && solved(item.pid) == 2" size="25" type="ios-checkmark" style="color:red"> </Icon> 
          <Icon v-else-if="solved(item.pid) == 1" size="25" type="ios-close" style="color:red"></Icon>
        </td>
        <td>{{ index + 1 }}</td>
        <td>
          <router-link :to="{ name: 'contestProblem', params: { cid: cid, id: index }}">
            <Button type="text">{{ item.title }}</Button>
          </router-link>
        <td>
          <!-- <span v-if="item.submit === 0">0%</span> -->
          <span>{{ solveCount(item.pid) / (submitCount(item.pid) + 0.000001) | formate }}</span>&nbsp;
          ({{ solveCount(item.pid) }} / {{ submitCount(item.pid) }})
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      cid: this.$route.params.cid
    };
  },
  computed: {
    ...mapGetters({
      contest: "contest/contest",
      problems: "contest/problems",
      submission: "contest/submission",
      isLogined: "session/isLogined"
    }),
    query() {
      let uid;
      if (this.profile) {
        uid = this.profile.uid;
      }
      const opt = {
        cid: this.$route.params.cid,
        uid
      };
      return opt;
    }
  },
  created() {
    //this.fetch();
    //this.changeDomTitle({ title: `Contest ${this.$route.params.cid}` });
    this.$store.dispatch("contest/findOne", this.cid);
  },
  methods: {
    ...mapActions(["changeDomTitle"]),
    fetch() {
      this.$store.dispatch("contest/findOne", this.cid);
    },
    solved(pid) {
      let uid = localStorage.getItem("uid");
      if (uid === "") {
        return 0;
      }
      let isTest = false;
      for (let i = 0; i < this.submission.length; i++) {
        if (uid === this.submission[i].uid && this.submission[i].pid === pid) {
          isTest = true;
          if (this.submission[i].result == "Accepted") return 2;
        }
      }
      if (isTest) return 1;
      return 0;
    },
    submitCount(pid) {
      let count = 0;
      let uid = localStorage.getItem("uid");
      for (let i = 0; i < this.submission.length; i++) {
        if (pid == this.submission[i].pid && this.submission[i].uid == uid)
          count++;
      }
      return count;
    },
    solveCount(pid) {
      let count = 0;
      let uid = localStorage.getItem("uid");
      for (let i = 0; i < this.submission.length; i++) {
        if (
          pid == this.submission[i].pid &&
          this.submission[i].result == "Accepted" &&
          this.submission[i].uid == uid
        )
          count++;
      }
      return count;
    }
  },
  watch: {
    // 浏览器后退时回退页面
    $route(to, from) {
      if (to !== from) this.fetch();
    },
    profile(val) {
      this.$store.dispatch("contest/findOne", this.query);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../styles/common';

h2 {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 8px;
}

h4 {
  text-align: center;
  margin-bottom: 8px;
}

table {
  margin-bottom: 20px;
}
</style>
