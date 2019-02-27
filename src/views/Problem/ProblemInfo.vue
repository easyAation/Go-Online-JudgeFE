<template lang="html">
  <div class="proinfo-wrap">
    <!-- <problem :problem="problem" /> -->
    <div class="proinfo-wrap">
        <slot name="title"><h1>{{ problem.id }}:  {{ problem.title }}</h1></slot>
        <!-- <h5>Time Limit: {{ problem.time }}MS&nbsp;&nbsp;&nbsp;Memory Limit: {{ problem.memory }}KB</h5> -->
        <h5>Time Limit: 1000MS&nbsp;&nbsp;&nbsp;Memory Limit:  32768KB</h5>
        <h2 class="text-primary">Description</h2>
        <div class="cont">
            {{ problem.description }}
        </div>
        <h2>Input</h2>
        <div class="cont">
            {{ problem.input }}
        </div>
        <h2>Output</h2>
        <div class="cont">
            {{ problem.output }}
        </div>
        <h2>Sample Input
        <!-- <Tooltip content="Click to copy" placement="top">
            <Icon type="document" v-clipboard:copy="problem.in" v-clipboard:success="onCopy" style="cursor: pointer"></Icon>
        </Tooltip> -->
        </h2>
        <pre><code>{{ problem.sample_input }}</code></pre>
        <h2>Sample Output
        <!-- <Tooltip content="Click to copy" placement="top">
            <Icon type="document" v-clipboard:copy="problem.out" v-clipboard:success="onCopy" style="cursor: pointer"></Icon>
        </Tooltip> -->
        </h2>
        <pre><code>{{ problem.sample_output }}</code></pre>
        <!-- <div v-if="problem.hint">
            <h2>Hint</h2>
            <div class="cont"></div>
        </div> -->
    </div>
    <Button shape="circle" icon="ios-send" @click="submit">Submit</Button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            problem: ''
        }
    },
    methods: {
    getProblemDetail: function() {
      var self = this;
      axios
      .get('http://localhost:4040/api/v1/problem/detail',{
          params: {
              problem_id: self.id
          }
      })
      .then(function(response){
        self.problem = response.data.data
      })
    },
    submit () {
      this.$router.push({
        name: 'problemSubmit',
        params: this.$router.params
      })
    }
  },
  mounted: function() {
     this.getProblemDetail()
  },
    created() {
      this.id = this.$route.params.pid;
  }
}
</script>

<style lang="stylus" scoped>
h1
  color: #9799CA
  margin-top: 10px
  margin-bottom: 8px
  text-align: center
  font-size: 30px
h5
  margin-bottom: 10px
  text-align:center
  font-size: 12px
h2
  border-bottom: 1px solid #e8e8e8
  padding: 10px 0
  color: #9799CA
  font-size:20px
.cont
  margin-top: 10px
  margin-bottom: 20px
  font-size: 15px
pre
  padding: 10px
  border-radius: 5px
  background-color: #ECEFF1
code 
  font-size: 15px
</style>
