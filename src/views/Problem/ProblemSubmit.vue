<template lang="html">
  <div>
    <h1>{{ this.$route.params.pid }}:  {{ title }}</h1>
    <div>
    <Form v-model="solution">
      <FormItem label="Language" label-position="left">
        <Select v-model="solution.language">
          <Option :value="1">C++ (G++)</Option>
          <Option :value="2">C (GCC)</Option>
          <Option :value="3">Java (openJDK)</Option>
          <Option :vaule="4">Python 3.6</Option>
          <Option :vaule="5">Python 2.7</Option>
        </Select>
      </FormItem>
      <FormItem>
         <Input v-model="solution.code" type="textarea" :autosize="{minRows:15,maxRows: 20}" placeholder="Paste your code here"></Input>
       </FormItem>
    </Form>
    </div>
    <Button type="primary" @click="submit" :disabled="!isLogin">Submit</Button>
    <Button style="margin-left: 8px" @click="reset">Reset</Button>
    {{ res }}
    <p v-if="!isLogin">Please Log in First</p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            isLogin: localStorage.getItem("Flag"),
            solution: {
              "code":'',
              "language":'',
            },
            title: '',
            res: '',
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
        self.title = response.data.data.title
      })
    },
    submit() {
      var self = this
      var data = {
          "source_code": self.solution.code,
          "language_id": "4",
          "number_of_runs": "1",
          "stdin": "Judge0",
          "expected_output": "hello, Judge0",
          "cpu_time_limit": "2",
          "cpu_extra_time": "0.5",
          "wall_time_limit": "5",
          "memory_limit": "128000",
          "stack_limit": "64000",
          "max_processes_and_or_threads": "30",
          "enable_per_process_and_thread_time_limit": false,
          "enable_per_process_and_thread_memory_limit": true,
          "max_file_size": "1024"
        }

      axios
      .post('http://localhost:3000/submissions?wait=true',JSON.stringify(data),{
        headers: {
          "Content-Type": "application/json"
        }
      }).then(function(response){

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

<style lang="stylus">
h1
  margin-bottom: 10px
  color: #9799CA
  margin-top: 10px
  text-align: center
  font-size: 30px
  
.ivu-form-item-label
    font-size: 16px


</style>

