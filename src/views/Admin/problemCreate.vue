<template>
  <div>
    <h1>出题的基本步骤</h1>
    <br>
    <Steps :current="5" :style="{color: 'black'}">
      <Step title="算法设计" content="思考该题希望解答者使用的算法类型" status="process"></Step>
      <Step title="题面设计" content="在算法基础上增加适当背景描述" status="process"></Step>
      <Step title="输入输出格式" content="一般情况下应该使输入输出保持简单" status="process"></Step>
      <Step title="测试数据编写" content="尽可能多出一点数据，这些数据建议自己写代码生成" status="process"></Step>
      <Step
        title="测试题目"
        content="务必自己写代码测试题目能不能通过！！！必要时也要让其它人测试题目"
        icon="ios-star"
        status="process"
      ></Step>
    </Steps>
    <oj-problem-edit :problem="problem"/>
    <Button type="primary" size="large" @click="submit">Submit</Button>
  </div>
</template>

<script>
import problemEdit from "../../components/ProblemEdit";
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
  methods: {
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
  components: {
    "oj-problem-edit": problemEdit
  }
};
</script>
