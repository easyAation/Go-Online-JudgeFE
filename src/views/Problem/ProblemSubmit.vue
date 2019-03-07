<template lang="html">
  <div>
    <h1>{{ this.$route.params.pid }}:  {{ title }}</h1>
    <div>
    <Form v-model="solution">
      <FormItem label="Language" label-position="left">
        <Select v-model="solution.language">
          <Option :value="10">C++ (g++ 7.2.0)</Option>
          <Option :value="4">C (gcc 7.2.0)</Option>
          <Option :value="28">Java (openJDK)</Option>
          <Option :vaule="34">Python (3.6.0)</Option>
          <Option :vaule="36">Python (2.7.9)</Option>
        </Select>
      </FormItem>
      <FormItem>
         <Input v-model="solution.code" type="textarea" :autosize="{minRows:15,maxRows: 20}" placeholder="Paste your code here"></Input>
       </FormItem>
    </Form>
    </div>
    <router-link to="/status">
    <Button type="primary" @click="submit" :disabled="!isLogin">Submit</Button>
    </router-link>
    <Button style="margin-left: 8px" @click="reset">Reset</Button>
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
            title: ''
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
          "pid":self.id.toString(),
          "uid":localStorage.getItem("uid"),
          "username":localStorage.getItem("Username").toString(),
          "code": self.solution.code,
          "language": self.solution.language.toString(),
        }

      axios
      .post('http://localhost:4040/api/v1/submission/submit',JSON.stringify(data))
      .then(function(response){
          
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

