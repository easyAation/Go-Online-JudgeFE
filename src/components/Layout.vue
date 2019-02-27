<template lang="html">
    <div class="nav-wrap">
        <Layout>
            <Header :style="{position: 'fixed', width: '100%', 'z-index': 100}">
            <Menu mode="horizontal" active-name="active">
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

                <Dropdown v-if="isLogin" @on-click="profileAction">
                    <a href="javascript:void(0)" style="font-size:15px">
                        {{ profile.uid }}
                        <Icon type="ios-arrow-down" />
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem name="profile">Profile</DropdownItem>
                        <DropdownItem name="logout">Logout</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                
                <Button type="text" @click="login=true" v-else>Login / Register</Button>
                 <Modal
                    v-model="login"
                    @on-ok="ok"
                    @on-cancel="cancel">
                    <Tabs v-model="mode">
                        <TabPane label="Login" name="login">
                            <Form ref="loginForm" :model="form" :rules="loginRules" :label-width="100">
                                <FormItem class="loginuid" label="Username" prop="uid">
                                    <Input v-model="form.uid"></Input>
                                </FormItem>
                                <FormItem class="loginpwd" label="Password" prop="pwd">
                                    <Input v-model="form.pwd" type="password" @keyup.enter.native="submit"></Input>
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
import axios from 'axios'
export default {
     data () {
            return {
                mode: 'login',
                form: {
                    "uid":'',
                    "pwd":''
                },
                isLogin: localStorage.getItem("Flag"),
                login: false,
                profile: {
                    'uid': "SpiffyEight77"
                }
            }
        },
        methods: {
            submit () {
                var self = this
                var code
                if(this.mode == 'login') {
                    var data =  {
                            "username": this.form.uid,
                            "password": this.form.pwd
                        }   
                    axios
                    .post('http://localhost:4040/api/v1/user/login',JSON.stringify(data)
                    ).then(function(response){
                            self.code = response.data.code
                    })
          
                    if (self.code === 200) {
                        localStorage.setItem("Flag",true)
                        self.isLogin = true
                        self.login = false
                        self.$Message.success('Login successfully');
                    } else {
                        self.$Message.error('Wrong username or password');
                    }

                } else {
                    axios
                    .post('http://localhost:4040/api/v1/user/register',{
                        params: {
                            "username":"SpiffyEight77",
                            "password":"864750987"
                        }   
                    }).then(function(response){
                        
                    })
                    this.$Message.info('Clicked submit register')
                    this.login = false
                }
            },
            cancel () {
                this.$Message.info('Clicked cancel');
            },
            profileAction (name) {
                if(name === 'logout') {
                    this.$Message.info('See you next time~');
                    localStorage.removeItem("Flag")
                    this.isLogin = false
                }
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