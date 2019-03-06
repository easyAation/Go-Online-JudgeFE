<template lang="html">
  <div class="proinfo-wrap">
    <!-- <problem :problem="problem" /> -->
    <ul>
      <li v-for="i in totalProblems" :key="i" :class="{'active': i === proIndex }" @click="pageChange(i)">
        {{ i }}
      </li>
    </ul>
    <div class="proinfo-wrap">
        <slot name="title"><h1>{{ id }}:  {{ problem.title }}</h1></slot>
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
            problem: '',
            id: '',
            proIndex: '',
            totalProblems: '',
            totalProblems: ''
        }
    },
    methods: {
    getProblemDetail: function() {
      this.pid = this.$route.params.pid
      this.cid = this.$route.params.cid
      this.id = this.$route.params.id
      var self = this;

     self.proIndex =  parseInt(self.$route.params.id)

      axios
      .get('http://localhost:4040/api/v1/problem/detail',{
          params: {
              problem_id: self.pid
          }
      })
      .then(function(response){
        self.problem = response.data.data
      })
    },
    getContestOverView: function() {
        var self = this
        axios
        .get('http://localhost:4040/api/v1/contest/detail',{
          params : {
            contest_id : self.cid
          }
        })
        .then(function(response) {
            self.overview = response.data.data
            self.totalProblems = parseInt(self.overview.contest.problems)
        })
    },
    submit () {
      this.$router.push({
        name: 'contestProblemSubmit',
        params: this.$router.params
      })
    },
    pageChange (val) {
      this.$router.push({
        name: 'contestProblemInfo',
        params: { id: val, pid: this.pid, cid: this.cid }
      })
    },
  },
  mounted: function() {
      this.getContestOverView()
  },
  created() {
     this.getProblemDetail()
  },
  watch: {
    "$route": "getProblemDetail" 
  },
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

ul
  margin-left: 10px
  li
    display: inline-block
    vertical-align: middle
    min-width: 32px
    height: 32px
    line-height: 30px
    margin-right: 8px
    text-align: center
    list-style: none
    background-color: #fff
    border: 1px solid #dddee1
    border-radius: 4px
    cursor: pointer
  .active
    color: #fff
    background-color: #2d8cf0
    border-color: #2d8cf0
</style>
