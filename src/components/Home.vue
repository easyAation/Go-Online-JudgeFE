<template lang="html">
  <div class="home-wrap">
    <div class="news">NewsList</div>
    <Card v-for="(item,i) in list" :key="item.id">
      <Row type="flex" align="middle">
        <Col :span="2">
          <Icon size="40" color="#2d8cf0" type="ios-chatboxes"></Icon>
        </Col>
        <Col :span="20">
            <router-link :to="{ name: 'newsInfo', params: { nid: item.id } }">
              <span style="color:#2d8cf0;">{{ item.title }}</span>
            </router-link>
            <p>{{ item.created_at | timePretty }}</p>
        </Col>
        <Col :span="2">
          <Icon  type="close-circled"></Icon>
        </Col>
      </Row>
    </Card>
    <Page></Page>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
      list: ""
    }
  },
  methods: {
    getNewsList: function() {
      var self = this;
      axios
      .get('http://localhost:4040/api/v1/news/list').then(function(response){
        self.list = response.data.data.reverse()
      })
    }
  },
  mounted: function() {
     this.getNewsList()
  }
}
</script>

<style lang="stylus">
.home-wrap
  margin: 0 10%
  .news
    font-size: 40px
    padding-bottom: 10px
    // margin-bottom: 20px
    // border-bottom: 1px solid #dfd8d8
  .content
    padding-left: 20px
    padding-bottom: 20px
    margin-bottom: 20px
    border-bottom: 1px solid #dfd8d8
  .ivu-card
    margin-bottom: 20px
    .ivu-icon-chatbox-working
      font-size: 24px
      margin-left: 30%
      color: rgba(201, 31, 242, 0.5)
    p
      margin-top: 10px
    .ivu-icon-close-circled
      line-height: 20px
      color: #c3c2c2
      cursor: pointer
      &:hover
        font-size: 20px
</style>
