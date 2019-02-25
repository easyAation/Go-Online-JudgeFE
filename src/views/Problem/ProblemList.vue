<template lang="html">
  <div class="prolist-wrap">
    <Row style="margin-bottom: 20px">
      <Col span="16">
        <Page ></Page>
      </Col>
      <Col :span="2">
        <Select>
          <Option>item</Option>
        </Select>
      </Col>
      <Col :span="4">
        <Input icon="search" placeholder="Please input..."></Input>
      </Col>
      <Col :span="2">
        <Button type="primary" >Search</Button>
      </Col>
    </Row>
    <table>
      <tr>
        <th>#</th>
        <th>PID</th>
        <th>Title</th>
        <th>Ratio</th>
        <th>Tags</th>
      </tr>
      <template>
          <td>
            <Icon></Icon>
          </td>
          <td>item</td>
          <td>
              <Button type="text">item</Button>
              <strong >Reserved</strong>
          <td>
            <span></span>&nbsp;
              <Button type="text"></Button>
              <Button type="text"></Button>
          </td>
          <td>
            <template>
                <Tag></Tag>
            </template>
          </td>
          <td>
              <Button type="text"></Button>
           
          </td>
          <td>
            <Button type="text">Delete</Button>
          </td>
        </tr>
      </template>
    </table>
  </div>
</template>

<style lang="stylus" scoped>
import '../styles/common'

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