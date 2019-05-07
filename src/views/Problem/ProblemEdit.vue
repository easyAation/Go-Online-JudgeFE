<template lang="html">
  <div class="proadd-wrap">
    <Row>
      <Col :span="23">
        <Input v-model="problem.name">
          <span slot="prepend">Title</span>
        </Input>
      </Col>
    </Row>
    <Row>
      <Col :span="11">
        <Input v-model="problem.time_limit">
          <span slot="prepend">Time</span>
          <span slot="append">MS</span>
        </Input>
      </Col>
      <Col :offset="1" :span="11">
        <Input v-model="problem.memory_limit">
          <span slot="prepend">Memory</span>
          <span slot="append">KB</span>
        </Input>
      </Col>
    </Row>
    <div class="label">Description</div>
    <Row>
      <Col :span="23">
        <Input type="textarea" :rows="8" v-model="problem.description"></Input>
      </Col>
    </Row>
    <div class="label">Input</div>
    <Row>
      <Col :span="23">
        <Input type="textarea" :rows="8" v-model="problem.input_des"></Input>
      </Col>
    </Row>
    <div class="label">Output</div>
    <Row>
      <Col :span="23">
        <Input type="textarea" :rows="8" v-model="problem.output_des"></Input>
      </Col>
    </Row>
    <div class="label">Sample Input</div>
    <Row>
      <Col :span="23">
        <Input type="textarea" :rows="8" v-model="problem.case_data_input"></Input>
      </Col>
    </Row>
    <div class="label">Sample Output</div>
    <Row>
      <Col :span="23">
        <Input type="textarea" :rows="8" v-model="problem.case_data_output"></Input>
      </Col>
    </Row>
    <div class="label">Hint</div>
    <Row>
      <Col :span="23">
        <Input type="textarea" :row="8" v-model="problem.hint"> </Input>
      </Col>
    </Row>
     <div>
     <router-link :to="{name: 'problemInfo', params: {pid: problem.id}}">
       <Button type="primary" @click="submit">Submit</Button>
    </router-link>
  </div>
  </div>
  
</template>

<script>
// import { VueEditor } from 'vue2-editor'
import axios from 'axios'
export default {
  data() {
      return {
          problem: {
              id: 0,
              name: '',
              time_limit: 0,
              memory_limit: 0,
              description: '',
              input_des: '',
              output_des: '',
              hint: '',
              case_data_input: '',
              case_data_output: '',
          }
      }
  },
  methods: {
    handleImageAdded (file, Editor, cursorLocation) {
      const formData = new window.FormData()
      formData.append('image', file)
      api.getImage(formData)
        .then(({ data }) => {
          const url = data.url // Get url from response
          Editor.insertEmbed(cursorLocation, 'image', url)
        })
        .catch((err) => console.log(err))
    },
    getProblemDetail: function() {
      var self = this
      axios
      .get(process.env.BASE_API+ '/v1/problem/detail', {
        params: {
          pid: self.pid
        }
      })
      .then(function(response){
        self.problem = response.data.problem
        console.log("problem: ", this.problem)
      })
    },
    submit() {
      var self = this
      var data = {
	      "id":           self.pid,
	      "name":         self.problem.name,
	    	"time_limit":   parseInt(self.problem.time_limit),
	    	"memory_limit": parseInt(self.problem.memory_limit),
	    	"description":  self.problem.description,
	    	"input_des":    self.problem.input_des,
	      "output_des":   self.problem.output_des,
		    "case_data_input":        self.problem.case_data_input,
		    "case_data_output":       self.problem.case_data_output
      }
      console.log(self.problem)
      axios
      .post(process.env.BASE_API + "/v1/problem/update", JSON.stringify(data))
      .then(function(response){
        console.log(response)
      })
    }
  },
  mounted: function() {
    this.getProblemDetail()
  },
  created() {
    this.pid = parseInt(this.$route.params.pid)
  }
}
</script>

<style lang="stylus">
.proadd-wrap
  margin-bottom: 20px
  .ivu-input-wrapper
    margin-bottom: 14px
  .label
    text-align:left
    margin-bottom: 10px
  #editor1, #editor2, #editor3, #editor4
    text-align: left
    height: 220px
    margin-bottom: 10px
  .el-textarea
    margin-bottom: 20px
</style>
