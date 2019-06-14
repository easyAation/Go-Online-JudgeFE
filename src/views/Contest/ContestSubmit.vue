<template lang="html">
  <div>
    <h1>{{  parseInt(this.$route.params.id) + 1}}:  {{ problem.name }}</h1>
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

  <Modal
        v-model="toDisplayModal"
        @on-ok="ok"
        :title="modelTitle"
        @on-cancel="cancel">
        <div display:inline>
          <Spin >
            <div>
             <p v-if="res.result === 'Accepted'" style="color:green">
                    {{res.result}}
             </p>
             <p v-else-if="res.result === 'Compilation Error'" style="color:purple">
                    {{res.result}}
             </p>
             <p v-else-if="res.result === 'Wrong Answer'" style="color:red">
                   {{ res.result }}
             </p>
             <p v-else-if="res.result === 'Time Limit'" style="color:red">
                   {{ res.result }}
             </p>
             <p v-else-if="res.result !== '' " style="color:metting">
                  {{ res.result }}
             </p>
             </div>
          </Spin>
             
             <!-- <p> {{res.time}}ms </p>
             <p> {{res.memoty}}b</P> -->
        </div>
        <!-- <pre> {{solution.code}} </pre> -->
    </Modal>

  </div>
</template>

<script>
import http from "../../http.js";
import uuid from "../../utils/uuid";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      problem: {},
      isLogin: localStorage.getItem("token"),
      toDisplayModal: false,
      solution: {
        code: "",
        language: ""
      },
      modelTitle: "",
      res: {
        result: "panding"
      },
      id: 0
    };
  },
  computed: {
    ...mapGetters({
      isLogined: "session/isLogined",
      list: "contest/problems"
    })
  },
  methods: {
    ok() {
      this.$Message.info("Clicked ok");
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    },
    getProblemDetail(pid) {
      var self = this;
      http
        .get("problem/detail", {
          params: {
            pid: pid
          }
        })
        .then(function(res) {
          self.problem = res.data.problem;
        });
    },
    reset() {},
    submit() {
      console.log(this.$route.params.cid);
      this.res.result = "pending";
      let pro = this.problem;
      var data = {
        id: uuid.uuid(8, 32).toLowerCase(),
        cid: parseInt(this.$route.params.cid),
        problem_id: pro.id,
        code: this.solution.code,
        language: this.solution.language,
        time_limit: pro.time_limit,
        memory_limit: pro.memory_limit
      };
      console.log(data);
      this.modelTitle = "#" + data.id + "uid for " + pro.id;
      let account = JSON.parse(localStorage.getItem("account"));
      http
        .post("contest/submit", JSON.stringify(data))
        .then(res => {
          this.res = res.data.data;
          this.$store.dispatch("contest/getSubmission", this.$route.params.cid);
        })
        .catch(err => {
          this.res.result = "system error!";
          console.log(err.message);
        });
      this.toDisplayModal = true;
    }
  },
  mounted: function() {
    this.getProblemDetail(this.list[this.id].pid);
  },
  created() {
    this.id = this.$route.params.id;
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

.ivu-form-res-label {
  font-size: 16px;
}
</style>
