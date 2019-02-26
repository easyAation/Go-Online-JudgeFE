<template lang="html">
  <div class="news">
    <Tabs :value="current" @on-click="change">
        <TabPane label="Overview" name="newsInfo"></TabPane>
    </Tabs>
    <h1>{{ news.title }}</h1>
    <h3>{{ news.created_at | timePretty }}</h3>
    <div class="news-cont">
        <p>
            {{news.content}}
        </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            news: ''
        }
    },
    methods: {
    getNewsDetail: function() {
      var self = this;
      axios
      .get('http://localhost:4040/api/v1/news/detail',{
          params: {
              news_id: self.id
          }
      }).then(function(response){
        self.news = response.data.data
      })
    }
  },
  mounted: function() {
     this.getNewsDetail()
  },
  created() {
      this.id = this.$route.params.nid;
  }
}
</script>


<style lang="stylus" scoped>
h1, h4, h3
  margin-bottom: 10px
  margin-top: 10px;
.news-cont
  padding-top: 10px
  text-align: left
  border-top: 1px solid #dfd8d8
</style>