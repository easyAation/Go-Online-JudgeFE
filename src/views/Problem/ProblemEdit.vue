<template lang="html">
  <div>
    <oj-problem-edit :problem="problem" />
    <Button type="primary" @click="submit"> Submit </Button>
  </div>
</template>

<script>
import http from "../../http.js";
import ProblemEdit from "../../components/ProblemEdit";
export default {
  data() {
    return {
      problem: {
        id: 0,
        name: "",
        time_limit: 0,
        memory_limit: 0,
        description: "",
        input_des: "",
        output_des: "",
        hint: "",
        case_data_input: "",
        case_data_output: ""
      }
    };
  },
  components: {
    "oj-problem-edit": ProblemEdit
  },
  methods: {
    handleImageAdded(file, Editor, cursorLocation) {
      const formData = new window.FormData();
      formData.append("image", file);
      api
        .getImage(formData)
        .then(({ data }) => {
          const url = data.url; // Get url from response
          Editor.insertEmbed(cursorLocation, "image", url);
        })
        .catch(err => console.log(err));
    },
    getProblemDetail() {
      http
        .get("problem/detail", {
          params: {
            pid: parseInt(this.$route.params.pid)
          }
        })
        .then(res => {
          this.problem = res.data.problem;
          console.log("pro: ", this.problem);
        });
    },
    submit() {
      let data = {
        id: this.pid,
        name: this.problem.name,
        time_limit: parseInt(this.problem.time_limit),
        memory_limit: parseInt(this.problem.memory_limit),
        description: this.problem.description,
        input_des: this.problem.input_des,
        output_des: this.problem.output_des,
        case_data_input: this.problem.case_data_input,
        case_data_output: this.problem.case_data_output
      };

      http
        .post("problem/update", JSON.stringify(data))
        .then(res => {
          this.$Message.success("修改成功!");
        })
        .catch(err => {
          this.$Message.error("修改失败");
          console.log(err.message);
        });
    }
  },
  mounted: function() {
    this.getProblemDetail();
  },
  created() {
    this.pid = parseInt(this.$route.params.pid);
  }
};
</script>

<style lang="stylus">
.proadd-wrap {
  margin-bottom: 20px;

  .ivu-input-wrapper {
    margin-bottom: 14px;
  }

  .label {
    text-align: left;
    margin-bottom: 10px;
  }

  #editor1, #editor2, #editor3, #editor4 {
    text-align: left;
    height: 220px;
    margin-bottom: 10px;
  }

  .el-textarea {
    margin-bottom: 20px;
  }
}
</style>
