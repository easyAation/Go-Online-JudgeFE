<template lang="html">
  <div class="proinfo-wrap">
    <!-- <problem :problem="problem" /> -->
    <div class="proinfo-wrap">
        <slot name="title"><h1>{{ problem.id }}:  {{ problem.name }}</h1></slot>
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
            <Icon type="document" v-clipboard:copy="problem.case_data_inout" v-clipboard:success="onCopy" style="cursor: pointer"></Icon>
        </Tooltip> -->
        </h2>
        <pre><code>{{ problem.case_data_input }}</code></pre>
        <h2>Sample Output
        <!-- <Tooltip content="Click to copy" placement="top">
            <Icon type="document" v-clipboard:copy="problem.case_data_output" v-clipboard:success="onCopy" style="cursor: pointer"></Icon>
        </Tooltip> -->
        </h2>
        <pre><code>{{ problem.case_data_output }}</code></pre>
        <div v-if="problem.hint" v-html="problem.hint">
            <h2>Hint</h2>
            <div class="cont"></div>
        </div>
    </div>
    <Button shape="circle" icon="ios-send" @click="submit">Submit</Button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import http from "../../http";
export default {
  data() {
    return {
      id: 0,
      problem: {}
    };
  },
  methods: {
    submit() {
      this.$router.push({
        name: "problemSubmit",
        params: this.$router.params
      });
    }
  },
  created() {
    http
      .get("problem/detail", {
        params: {
          pid: this.$route.params.pid
        }
      })
      .then(res => {
        this.problem = res.data.problem;
      })
      .catch(err => {
        this.$Message.error(err.message);
        console.log(err.message);
      });
  }
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
</style>
