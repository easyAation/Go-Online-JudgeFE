<template lang="html">
  <div>
    <h1>{{ position }}:  {{ title }}</h1>
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
    <router-link :to="{ name:'contestStatus' }">
    <Button type="primary" @click="submit" :disabled="!isLogin">Submit</Button>
    </router-link>
    <Button style="margin-left: 8px" @click="reset">Reset</Button>
    <p v-if="!isLogin">Please Log in First</p>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      solution: [],
      isLogin: localStorage.getItem("Flag"),
      title: "",
      cid: this.$route.params.cid,
      position: this.$route.params.id
    };
  },
  methods: {
    getProblemDetail: function() {
      var self = this;
      axios
        .get(process.env.BASE_API + "/api/v1/contest/problem/detail", {
          params: {
            problem_index: self.id,
            contest_id: self.cid
          }
        })
        .then(function(response) {
          self.title = response.data.data.title;
          self.index = response.data.data.index;
        });
    },
    submit() {
      var self = this;
      var data = {
        pid: self.id.toString(),
        uid: localStorage.getItem("uid"),
        cid: self.cid.toString(),
        index: self.id.toString(),
        username: localStorage.getItem("Username").toString(),
        code: self.solution.code,
        language: self.solution.language.toString()
      };

      axios
        .post(
          process.env.BASE_API + "/api/v1/contest/problem/submit",
          JSON.stringify(data)
        )
        .then(function(response) {});
    }
  },
  mounted: function() {
    //this.getProblemDetail();
    this.title = this.list[this.position].title;
  },
  computed: {
    ...mapGetters({
      list: "contest/problems"
    })
  },
  created() {
    if (this.list == undefined) {
      this.$store.dispatch("contest/findOne", this.cid);
    }
  }
};
</script>

<style lang="stylus" scoped>
h1 {
  color: #9799ca;
  margin-top: 10px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 30px;
}
</style>