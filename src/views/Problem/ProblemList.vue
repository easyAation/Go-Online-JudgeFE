<template lang="html">
  <div class="prolist-wrap">
    <Row style="margin-bottom: 20px">
      <Col span="16">
        <Page :total="sum" @on-change="pageChange" :page-size="pageSize" :current.sync="page" show-elevator></Page>
      </Col>
      <Col :span="2">
        <Select v-model="type">
          <Option v-for="item in options" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </Col>
      <Col :span="4">
        <Input v-model="content" icon="search" placeholder="Please input..." @keyup.enter.native="search"></Input>
      </Col>
      <Col :span="2">
        <Button type="primary" @click="search">Search</Button>
      </Col>
    </Row>
    <table>
      <tr>
        <th>#</th>
        <th>PID</th>
        <th>Title</th>
        <th>Ratio</th>
        <th>Tags</th>
        <th v-if="isAdmin">Visible</th>
        <th v-if="isAdmin">Delete</th>
      </tr>
      <template v-for="(item, index) in list">
        <tr v-if="isAdmin || item.status === status.Available">
          <td>
            <Icon v-if="solved.indexOf(item.pid) !== -1" type="checkmark-round"></Icon>
          </td>
          <td>{{ item.pid }}</td>
          <td>
            <router-link :to="{ name: 'problemInfo', params: { pid: item.pid } }">
              <Button type="text">{{ item.title }}</Button>
            </router-link>
            <Tooltip content="This item is reserved, no one could see this, except admin" placement="right">
              <strong v-show="item.status === status.Reserve">Reserved</strong>
            </Tooltip>
          <td>
            <span>{{ item.solve / (item.submit + 0.000001) | formate }}</span>&nbsp;
            (<router-link :to="{ name: 'status', query: { pid: item.pid, judge: judge.Accepted } }">
              <Button type="text">{{ item.solve }}</Button>
            </router-link> /
            <router-link :to="{ name: 'status', query: { pid: item.pid } }">
              <Button type="text">{{ item.submit }}</Button>
            </router-link>)
          </td>
          <td>
            <template v-for="(item2, index2) in item.tags">
              <router-link :to="{ name: 'problemList', query: { type: 'tag', content: item2 } }">
                <Tag>{{ item2 }}</Tag>
              </router-link>
            </template>
          </td>
          <td v-if="isAdmin">
            <Tooltip content="Click to change status" placement="right">
              <Button type="text" @click="change(item)">{{ problemVisible[item.status] }}</Button>
            </Tooltip>
          </td>
          <td v-if="isAdmin">
            <Button type="text" @click="del(item.pid)">Delete</Button>
          </td>
        </tr>
      </template>
    </table>
  </div>
</template>

<script>
export default {
  
}
</script>


<style lang="stylus" scoped>

table
  width: 100%
  border-collapse: collapse
  border-spacing: 0
  th:nth-child(1)
    padding-left: 10px
  tr
    border-bottom: 1px solid #ebeef5
    height: 40px
    line-height: 40px
    font-size: 14px
    td:nth-child(1)
      padding-left: 10px
  th
    text-align:left
  .ivu-btn
    vertical-align: baseline
    color: #e040fb
    padding: 0 1px
    font-size: 14px

table
  th:nth-child(1)
    width: 5%
  th:nth-child(2)
    width: 10%
  th:nth-child(3)
    width: 20%
  th:nth-child(4)
    width: 20%
  th:nth-child(5)
    width: 20%
  th:nth-child(6)
    width: 10%
  th:nth-child(7)
    width: 10%
</style>