<template lang="html">
  <div v-if="solution">
    <h1>{{ solution.result }}</h1>
    <p>
      <span>Problem:
        <router-link :to="{name: 'problemInfo', params: {pid: solution.pid}}">
          {{ solution.pid }}
        </router-link>
      </span>
      <span>Memory: {{ solution.memory }} KB</span>
      <span>Runtime: {{ solution.run_time }} MS</span>
      <span>Author:
        <router-link :to="{name: 'userInfo', params: {uid: solution.uid}}">
          {{ solution.uid }}
        </router-link>
      </span>
    </p>
    <hr>
    <!-- <h2>Testcases</h2> -->
    <table>
      <tr>
        <th>Uuid</th>
        <th>Time/ms</th>
        <th>Memory/kb</th>
        <th>Result</th>
      </tr>
    
        <tr>
          <td>{{ solution.submit_id }}</td>
          <td>{{ solution.time }}</td>
          <td>{{ solution.memory }}</td>
          <td >{{ solution.result }}</td>
        </tr>
     
    </table>
    <!-- <hr> -->
    <pre class="error" v-if="solution.error"><code>{{ solution.error }}</code></pre>
    <br>
    <Button shape="circle" icon="document">
      Click to copy code
    </Button>
    <pre><code v-html="solution.code"></code></pre>
    <!-- <div v-if="isAdmin && solution.sim && solution.simSolution">
      <hr>
      Similarity: {{ solution.sim }}%</br>
      From: {{ solution.simSolution.sid }} by
      <router-link :to="{name: 'userInfo', params: {uid: solution.simSolution.uid}}">
        {{ solution.simSolution.uid }}
      </router-link>
      <pre><code v-html="solution.simSolution.code"></code></pre>
    </div> -->
  </div>
</template>

<script>
import http from "../http";
import { mapGetters, mapActions } from "vuex";
// import constant from "@/util/constant";
// import "highlight.js/styles/github.css";
// // import highlight from 'highlight.js'
// // https://github.com/isagalaev/highlight.js/issues/1284
// import highlight from "highlight.js/lib/highlight";
// import cpp from "highlight.js/lib/languages/cpp";
// import python from "highlight.js/lib/languages/python";
// import java from "highlight.js/lib/languages/java";
// import "highlight.js/styles/atom-one-light.css";
// import { testcaseUrl } from "@/util/helper";

// highlight.registerLanguage("cpp", cpp);
// highlight.registerLanguage("java", java);
// highlight.registerLanguage("python", python);

export default {
  data: () => ({
    solution: {}
  }),
  computed: {},
  created() {
    this.getSolution();
  },
  methods: {
    getSolution() {
      console.log(11);
      console.log(this.$route.params.sid);
      http
        .get("submit/list", {
          params: {
            sid: this.$route.params.sid
          }
        })
        .then(res => {
          if (res.total != 0) this.solution = res.data.data[0];
          else this.$Message.error("系统没有发现该提交!");
        });
    },

    onCopy() {
      this.$Message.success("Copied!");
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../styles/common';

h1 {
  margin-bottom: 6px;
}

p {
  margin-bottom: 4px;
}

span {
  margin-right: 20px;
}

hr {
  margin-bottom: 10px;
}

pre {
  border: 1px solid #e040fb;
  border-radius: 4px;
  padding: 10px;

  &.error {
    background-color: #FFF9C4;
  }
}
</style>
