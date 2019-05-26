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
    <div> 
        <span> {{solution.language}} </span>
   </div>
  </div>
</template>

<script>
import http from "../../http.js";
import uuid from "../../utils/uuid";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      isLogin: localStorage.getItem("token"),
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
      http
        .get("problem/detail", {
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
      let pro = this.problem;
      var data = {
        id: uuid.uuid(8, 32),
        problem_id: pro.id,
        code: this.solution.code,
        language: this.solution.language,
        time_limit: pro.time_limit,
        memory_limit: pro.memory_limit
      };
      console.log(data);

      let account = JSON.parse(localStorage.getItem("account"));
      http
        .post("submission/submit", JSON.stringify(data))
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err.message);
        });
      // this.$router.push({
      //   name: "status"
      // });
    }
  },
  mounted: function() {
    this.getProblemDetail();
  },
  computed: {
    ...mapGetters({
      isLogined: "session/isLogined"
    })
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
