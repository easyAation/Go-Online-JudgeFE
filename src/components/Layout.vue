<template lang="html">
    <div class="nav-wrap">
        <Layout>
            <Header :style="{position: 'fixed', width: '100%', 'z-index': 100}">
            <Menu mode="horizontal" :theme="theme1" active-name="active" class="oj-menu">
                <div class="left">
                <router-link to="/">
                <MenuItem name="home">
                    <Icon type="ios-home"/>
                        Home
                </MenuItem>
                </router-link>
                <router-link to="/problems">
                <MenuItem name="problem">
                    <Icon type="ios-apps" />
                        Problem
                </MenuItem>
                </router-link>
                <MenuItem name="discuss">
                    <Icon type="ios-chatboxes" />
                        Discuss
                </MenuItem>
                <MenuItem name="status">
                    <Icon type="md-refresh" />
                        Status
                </MenuItem>
                <MenuItem name="rank">
                    <Icon type="ios-stats" />
                        Rank
                </MenuItem>
                <MenuItem name="contest">
                    <Icon type="md-trophy" />
                        Contest
                </MenuItem>
                <router-link to="/faq">
                <MenuItem name="faq">
                    <Icon type="ios-help-circle" />
                        FAQ
                </MenuItem>
                </router-link>
                </div>
            </Menu>
            <div class="right">
                <Button type="text" @click="login=true">Login / Register</Button>
                 <Modal
                    v-model="login"
                    @on-ok="ok"
                    @on-cancel="cancel">
                    <Tabs>
                        <TabPane label="Login" name="login">
                            <Form ref="loginForm" :model="form" :rules="loginRules" :label-width="100">
                                <FormItem class="loginuid" label="Username" prop="uid">
                                    <Input></Input>
                                </FormItem>
                                <FormItem class="loginpwd" label="Password" prop="pwd">
                                    <Input type="password" @keyup.enter.native="submit"></Input>
                                </FormItem>
                            </Form>
                        </TabPane>
                        <TabPane label="Register" name="register">
                            <Form ref="registerForm" :model="form" :rules="registerRules" :label-width="100">
                                <FormItem label="Username" prop="uid">
                                    <Input></Input>
                                </FormItem>
                                <FormItem label="Nickname" prop="nick">
                                    <Input></Input>
                                </FormItem>
                                <FormItem label="Password" prop="pwd">
                                    <Input type="password"></Input>
                                </FormItem>
                                <FormItem label="CheckPwd" prop="checkPwd" class="checkpwd">
                                    <Input type="password"></Input>
                                </FormItem>
                            </Form>
                        </TabPane>
                    </Tabs>
                    <div slot="footer">
                        <Row type="flex" justify="center">
                            <Col :span="20">
                            <Button type="primary" size="large" long @click="submit">Submit</Button>
                            </Col>
                        </Row>
                    </div>
                </Modal>
            </div>
            </header>
            <Content :style="{margin: '88px 20px 0', background: '#fff', minHeight: '500px', padding: '20px 40px'}">
                <router-view></router-view>
            </Content>
            <Footer class="layout-footer-center">
                <p>Server Time: {{ currentTime | timePretty }}</p>
                <strong>Go-Online-Judge</strong> by <a href="https://github.com/SpiffyEight77/Go-Online-Judge" target="_blank">SpiffyEight77 <Icon type="social-github"></Icon>.</a>
                The source code is licensed <a href="http://opensource.org/licenses/mit-license.php" target="_blank">MIT</a>.
            </Footer>
        </Layout>
    </div>
</template>

<script>
export default {
     data () {
            return {
                login: false
            }
        },
        methods: {
            ok () {
                this.$Message.info('Clicked ok');
            },
            cancel () {
                this.$Message.info('Clicked cancel');
            }
        }
}
</script>

<style lang="stylus">
.nav-wrap
  border: 1px solid #d7dde4
  background: #f5f7f9
  position: relative
  border-radius: 4px
  overflow: hidden
  .ivu-layout-header
    display: flex
    justify-content: space-between
    background: #fff
    padding: 2px 0px 0px 0px
    height: 62px
    line-height: 62px
    box-shadow: 0 2px 3px hsla(0,0%,4%,.1)
  .ivu-menu-horizontal
    height: 62px
    line-height: 60px
  .left
    width: 900px
    margin: 0 auto
    margin-left: 5%
  .right
    margin-right: 5%
    .ivu-btn
      font-size: 14px
      margin-bottom: 6px
  .layout-footer-center
    text-align: center
    p
      margin-bottom: 8px

.ivu-tabs-nav-container
  font-size: 16px
.ivu-tabs-nav
  .ivu-tabs-tab
    padding: 8px 16px 12px 16px
.ivu-form-item
  margin-right: 20px
.checkpwd
  margin-bottom: 5px
.loginuid
  margin-top: 56px
  margin-bottom: 30px
</style>