<template lang="html">
  <div>
    <h1>{{ this.$route.params.pid }}:  {{ problem.name }}</h1>
    <div>
    <Form v-model="solution">
      <FormItem label="language" label-position="left" value="C">
        <Select v-model="solution.language">
          <Option value="C">C (gcc 7.2.0)</Option>
          <Option value="CPP">C++ (g++ 7.2.0)</Option>
          <Option value="Golang">Golang</Option>
        </Select>
      </FormItem>

      <FormItem>
         <Input v-model="solution.code" type="textarea" :autosize="{minRows:15,maxRows: 20}" placeholder="Paste your code here"></Input>
       </FormItem>
    </Form>
    </div>
  
    <!--
    <Button type="primary" @click="submit" :disabled="!isLogin">Submit</Button>
    -->
    <Button type="primary" @click="submit">Submit</Button>
   
    <Button style="margin-left: 8px" @click="reset">Reset</Button>
    <p v-if="!isLogin">Please Log in First</p>
    <div> 
        <span> {{solution.language}} </span>
   </div>
  </div>
</template>

<script>
import axios from "axios";
import uuid from "../../utils/uuid";
export default {
  data() {
    return {
      isLogin: localStorage.getItem("Flag"),
      solution: {
        code: "",
        language: ""
      },
      problem: ""
    };
  },
  methods: {
    getProblemDetail: function() {
      var self = this;
      axios
        .get(process.env.BASE_API + "/v1/problem/detail", {
          params: {
            pid: self.id
          }
        })
        .then(function(response) {
          self.problem = response.data.problem;
        });
    },
    reset() {},
    submit() {
      var self = this;
      var data = {
        id: uuid.uuid(8, 32),
        problem_id: self.problem.id,
        code: self.solution.code,
        language: self.solution.language,
        time_limit: self.problem.time_limit,
        memory_limit: self.problem.memory_limit
      };
      console.log(data);

      let account = JSON.parse(localStorage.getItem("account"));
      let ok = false;
      axios
        .post(
          process.env.BASE_API + "/v1/submission/submit",
          JSON.stringify(data),
          {
            headers: {
              Authorization: account.token
            }
          }
        )
        .then(function(response) {
          ok = true;
          console.log(response);
        })
        .catch(err => {
          this.$Message.error("System internal error.");
        });
      this.$router.push({
        name: "status"
      });
    }
  },
  mounted: function() {
    this.getProblemDetail();
  },
  created() {
    this.id = this.$route.params.pid;
  }
};
</script>

<style lang="stylus">
h1 {
  margin-bottom: 10px;
  color: #9799CA;
  margin-top: 10px;
  text-align: center;
  font-size: 30px;
}

.ivu-form-item-label {
  font-size: 16px;
}
</style>
