<template lang="html">
  <div class="proinfo-wrap">
    <!-- <problem :problem="problem" /> -->
    <ul>
      <li v-for="i in totalProblems" :key="i" :class="{'active': i === position + 1}" @click="pageChange(i)">
        {{ i }}
      </li>
    </ul>

    <div class="proinfo-wrap">
        <slot name="title"><h1>{{ position + 1 }}:  {{ problem.name }}</h1></slot>
        <!-- <h5>Time Limit: {{ problem.time }}MS&nbsp;&nbsp;&nbsp;Memory Limit: {{ problem.memory }}KB</h5> -->
        <h5>Time Limit: {{problem.time_limit}}MS&nbsp;&nbsp;&nbsp;Memory Limit:  {{problem.memory_limit}}KB</h5>
        <h2 class="text-primary">Description</h2>
        <div class="cont" v-html="problem.description">
            {{ problem.description }}
        </div>
        <h2>Input</h2>
        <div class="cont" v-html="problem.input_des">
            {{ problem.input_des }}
        </div>
        <h2>Output</h2>
        <div class="cont" v-html="problem.output_des">
            {{ problem.output_des }}
        </div>
        <h2>Sample Input
        <!-- <Tooltip content="Click to copy" placement="top">
            <Icon type="document" v-clipboard:copy="problem.in" v-clipboard:success="onCopy" style="cursor: pointer"></Icon>
        </Tooltip> -->
        </h2>
        <pre><code>{{ problem.case_data_input }}</code></pre>
        <h2>Sample Output
        <!-- <Tooltip content="Click to copy" placement="top">
            <Icon type="document" v-clipboard:copy="problem.out" v-clipboard:success="onCopy" style="cursor: pointer"></Icon>
        </Tooltip> -->
        </h2>
        <pre><code>{{ problem.case_data_output }}</code></pre>
        <div v-if="problem.hint">
            <h2>Hint</h2>
            <div class="cont" v-html="problem.hint">
              {{problem.hint}}
            </div>
        </div>
    </div>
    <Button shape="circle" icon="ios-send" @click="submit">Submit</Button>
  </div>
</template>

<script>
import http from "../../http.js";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      cid: this.$route.params.cid,
      position: this.$route.params.id,
      problem: ""
    };
  },
  created() {
    if (this.list == undefined) {
      this.$store.dispatch("contest/findOne", this.cid);
    }
    this.getProblem(this.list[this.position].pid)
      .then(res => {
        this.problem = res.data.problem;
      })
      .catch(err => {
        this.$Message.error(err.message);
      });
  },
  computed: {
    ...mapGetters({
      totalProblems: "contest/totalProblems",
      list: "contest/problems"
    })
  },
  methods: {
    submit() {
      this.$router.push({
        name: "contestProblemSubmit",
        params: this.$router.params
      });
    },
    getProblem(pid) {
      return http.get("problem/detail", {
        params: {
          pid: pid
        }
      });
    },
    pageChange(position) {
      position = position - 1;
      console.log("position:");
      console.log(position);
      this.position = position;
      this.getProblem(this.list[this.position].pid)
        .then(res => {
          this.problem = res.data.problem;
        })
        .catch(err => {
          this.$Message.error(err.message);
        });
      console.log(this.problem);
    }
  }
  // watch: {
  //   $route: "getProblemDetail"
  // }
};
</script>

<style lang="stylus" scoped>
h1 {
  color: #9799CA;
  margin-top: 10px;
  margin-bottom: 8px;
  text-align: center;
  font-size: 30px;
}

h5 {
  margin-bottom: 10px;
  text-align: center;
  font-size: 12px;
}

h2 {
  border-bottom: 1px solid #e8e8e8;
  padding: 10px 0;
  color: #9799CA;
  font-size: 20px;
}

.cont {
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 15px;
}

pre {
  padding: 10px;
  border-radius: 5px;
  background-color: #ECEFF1;
}

code {
  font-size: 15px;
}

ul {
  margin-left: 10px;

  li {
    display: inline-block;
    vertical-align: middle;
    min-width: 32px;
    height: 32px;
    line-height: 30px;
    margin-right: 8px;
    text-align: center;
    list-style: none;
    background-color: #fff;
    border: 1px solid #dddee1;
    border-radius: 4px;
    cursor: pointer;
  }

  .active {
    color: #fff;
    background-color: #2d8cf0;
    border-color: #2d8cf0;
  }
}
</style>
