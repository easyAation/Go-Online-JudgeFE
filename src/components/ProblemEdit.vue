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
    <div class="label">题目描述</div>
    <Row>
      <Col :span="23">
        <!-- <Input type="textarea" :rows="8" v-model="problem.description"></Input> -->
        <vue-editor id="editor1" 
          useCustomImageHandler
          @imageAdded="handleImageAdd"
          v-model="problem.description">
          </vue-editor>
      </Col>
    </Row>
    <div class="label">输入描述</div>
    <Row>
      <Col :span="23">
        <vue-editor id="editor2" v-model="problem.input_des">
          </vue-editor>
      </Col>
    </Row>
    <div class="label">输出描述</div>
    <Row>
      <Col :span="23">
        <!-- <Input type="textarea" :rows="8" v-model="problem.output_des"></Input> -->
        <vue-editor id="editor3" v-model="problem.output_des">
          </vue-editor>
      </Col>
    </Row>
     <div class="label">提示信息</div>
    <Row>
      <Col :span="23">
        <!-- <Input type="textarea" :row="8" v-model="problem.hint"> </Input> -->
        <vue-editor id="editor4" v-model="problem.hint"></vue-editor>
      </Col>
    </Row>
     <div>
    <!-- <Row>
      <Col :span="23">
        <Input type="textarea" :rows="8" v-model="problem.case_data_input"></Input>
      </Col>
    </Row>
    <div class="label">样厉输出</div>
    <Row>
      <Col :span="23">
        <Input type="textarea" :rows="8" v-model="problem.case_data_output"></Input>
      </Col>
    </Row> -->
    <Row>
        <Col span="12">
            <div class="label"> 样厉输入 </div>
            <Input type="textarea"  v-model="problem.case_data_input" placeholder=""></Input>
        </Col>   
          <Col span="12">
            <div class="label"> 样厉输出 </div>
            <Input type="textarea" v-model="problem.case_data_output" placeholder=""></Input>
        </Col>   
    </Row>
  </div>
  </div>
  
</template>

<script>
import http from "../http.js";
import { VueEditor } from "vue2-editor";
export default {
  props: ["problem"],
  components: {
    VueEditor
  },
  methods: {
    handleImageAdd(file, Editor, cursorLocation) {
      const formData = new window.FormData();
      formData.append("image", file);
      http
        .post("image/upload", formData)
        .then(res => {
          console.log(res);
          Editor.insertEmbed(
            cursorLocation,
            "image",
            "http://localhost:2010/v1/image?file=" + res.data.url
          );
          // resetUploader();
        })
        .catch(err => {
          console.log(err.message);
        });
    }
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
