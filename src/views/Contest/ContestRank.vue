<template lang="html">
  <div>
    <i-switch size="large" @on-change="change">
      <Icon type="android-done" slot="open"></Icon>
      <Icon type="android-close" slot="close"></Icon>
    </i-switch> 自动刷新 (每 10 秒一次)
    <div class="conrank-wrap">
      <table>
        <tr>
          <th>#</th>
          <th>User</th>
          <th>Nick</th>
          <th>Solve</th>
          <th>Penalty</th>
          <th v-for="(item, index) in problems">
            {{ index + 1 }}
          </th>
        </tr>
        <tr v-for="(item, index) in ranklist">
          <td>{{ index + 1 }}</td>
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.solved }}</td>
          <td class="straight">{{ item.penalty | timeContest }}</td>
          <template v-for="p in problems">
            <td v-if="solved(item.problems, p.pid) === 0"></td>
            <!-- !item[pid] 为 true 表示这道题没有提交过 -->
             <!-- <td v-else-if="solved(item.problems, p.pid) == 1" :class="[ item[pid].prime ? 'prime' : 'normal']"> -->
            <td v-else-if="solved(item.problems, p.pid) == 1" class= "normal">
              {{  penalty(item.problems, p.pid, contest) | timeContest }}
              accept {{failedCount(item.problems, p.pid)}}
            </td>
            <td v-else class="red">
              <span v-if="failedCount(item.problems, p.pid) > 0">{{ failedCount(item.problems, p.pid) }}</span>
            </td>
          </template>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    timer: null,
    relation: new Map()
  }),
  computed: {
    ...mapGetters("contest", ["ranklist", "contest", "problems"])
  },
  created() {
    this.getRank();
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    getRank() {
      this.$store
        .dispatch("contest/getRank", this.$route.params.cid)
        .then(res => {});
    },
    change(status) {
      if (status) {
        this.timer = setInterval(() => {
          this.getRank();
          this.$Message.info({
            content: "刷新成功",
            duration: 1
          });
        }, 10000);
      } else {
        clearInterval(this.timer);
      }
    },
    solved(problems, pid) {
      for (let p of problems) {
        if (p.pid == pid) {
          if (p.failed >= 0) return 1;
          return -1;
        }
      }
      return 0;
    },
    penalty(problems, pid, contest) {
      for (let p of problems) {
        if (p.pid == pid) {
          return new Date(p.create_at).getTime() - contest.start_at;
        }
      }
      return 0;
    },
    failedCount(problems, pid) {
      console.log(problems);
      for (let p of problems) {
        if (p.pid == pid) {
          console.log(pid);
          if (p.failed < 0) return -p.failed;
          return p.failed;
        }
      }
      return 0;
    }
  }
};
</script>

<style lang="stylus">
.conrank-wrap {
  margin-top: 1em;
  overflow: scroll;

  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;

    th, td {
      border: 1px solid #dbdbdb;
      padding: 8px 4px;

      &:nth-child(n + 5) {
        min-width: 4em;
      }
    }
  }

  .straight {
    nowrap: nowrap;
  }

  .prime {
    color: #fff;
    background-color: #3273dc;
    word-wrap: break-word;
    word-break: break-all;
    text-align: left;
  }

  .normal {
    color: #fff;
    background-color: #23d160;
    word-wrap: break-word;
    word-break: break-all;
    text-align: left;
  }

  .red {
    color: red;
  }
}
</style>