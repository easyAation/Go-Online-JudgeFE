<template lang="html">
  <div class="home-wrap">
    <div class="news">NewsList</div>
    <Card>
      <Row type="flex" align="middle">
        <Col :span="2">
          <Icon size="40" type="ios-chatboxes"></Icon>
        </Col>
        <Col :span="20">
            <span>2018年ACM实验室招新个人赛</span>
            <p>2018-10-09 20:37:29</p>
        </Col>
        <Col :span="2">
          <Icon  type="close-circled"></Icon>
        </Col>
      </Row>
    </Card>

    <Card>
      <Row type="flex" align="middle">
        <Col :span="2">
          <Icon type="chatbox-working"></Icon>
        </Col>
        <Col :span="20">
          <!-- <router-link :to="{ name: 'newsInfo', params: { nid: item.nid } }"> -->
            <span></span>
          <!-- </router-link> -->
          <p></p>
        </Col>
        <Col :span="2">
          <Icon  type="close-circled"></Icon>
        </Col>
      </Row>
    </Card>

    <Card>
      <Row type="flex" align="middle">
        <Col :span="2">
          <Icon type="chatbox-working"></Icon>
        </Col>
        <Col :span="20">
          <!-- <router-link :to="{ name: 'newsInfo', params: { nid: item.nid } }"> -->
            <span></span>
          <!-- </router-link> -->
          <p></p>
        </Col>
        <Col :span="2">
          <Icon  type="close-circled"></Icon>
        </Col>
      </Row>
    </Card>

    <Card>
      <Row type="flex" align="middle">
        <Col :span="2">
          <Icon type="chatbox-working"></Icon>
        </Col>
        <Col :span="20">
          <!-- <router-link :to="{ name: 'newsInfo', params: { nid: item.nid } }"> -->
            <span></span>
          <!-- </router-link> -->
          <p></p>
        </Col>
        <Col :span="2">
          <Icon  type="close-circled"></Icon>
        </Col>
      </Row>
    </Card>

    <Card>
      <Row type="flex" align="middle">
        <Col :span="2">
          <Icon type="chatbox-working"></Icon>
        </Col>
        <Col :span="20">
          <!-- <router-link :to="{ name: 'newsInfo', params: { nid: item.nid } }"> -->
            <span></span>
          <!-- </router-link> -->
          <p></p>
        </Col>
        <Col :span="2">
          <Icon  type="close-circled"></Icon>
        </Col>
      </Row>
    </Card>

    <Card>
      <Row type="flex" align="middle">
        <Col :span="2">
          <Icon type="chatbox-working"></Icon>
        </Col>
        <Col :span="20">
          <!-- <router-link :to="{ name: 'newsInfo', params: { nid: item.nid } }"> -->
            <span></span>
          <!-- </router-link> -->
          <p></p>
        </Col>
        <Col :span="2">
          <Icon  type="close-circled"></Icon>
        </Col>
      </Row>
    </Card>

    <Card>
      <Row type="flex" align="middle">
        <Col :span="2">
          <Icon type="chatbox-working"></Icon>
        </Col>
        <Col :span="20">
          <!-- <router-link :to="{ name: 'newsInfo', params: { nid: item.nid } }"> -->
            <span></span>
          <!-- </router-link> -->
          <p></p>
        </Col>
        <Col :span="2">
          <Icon  type="close-circled"></Icon>
        </Col>
      </Row>
    </Card>

    <Page :total="sum" @on-change="pageChange" :page-size="pageSize" :current.sync="page" show-elevator></Page>
  </div>
</template>

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
