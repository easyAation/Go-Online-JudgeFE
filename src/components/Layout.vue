<template lang="html">
    <div class="nav-wrap">
        <Layout>
            <Header :style="{position: 'fixed', width: '100%', 'z-index': 100}">
            <Menu mode="horizontal" active-name="active">
                <div class="left">
                <MenuItem name="home" :to="{name: 'Home'}">
                    <Icon type="ios-home"/>
                        Home
                </MenuItem>
               
                <MenuItem name="problem" :to="{name: 'problemList'}">
                    <Icon type="ios-apps" />
                        Problem
                </MenuItem>
                
                <MenuItem name="discuss">
                    <Icon type="ios-chatboxes" />
                        Discuss
                </MenuItem>

                
                <MenuItem name="status" :to="{name: 'status'}">
                    <Icon type="md-refresh" />
                        Status
                </MenuItem>
               
                <MenuItem name="rank">
                    <Icon type="ios-stats" />
                        Rank
                </MenuItem>
                <router-link to="/contests">
                <MenuItem name="contest" :to="{name: 'contestList'}">
                    <Icon type="md-trophy" />
                        Contest
                </MenuItem>
                </router-link>
                <router-link to="/faq">
                <MenuItem name="faq" :to="{name: 'faq'}">
                    <Icon type="ios-help-circle" />
                        FAQ
                </MenuItem>
                </router-link>
                </div>
            </Menu>
            <div class="right">
                <Dropdown v-if="logined" @on-click="profileAction">
                    <a href="javascript:void(0)" style="font-size:15px">
                        {{ account.name }}
                        <Icon type="ios-arrow-down" />
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem v-if="profile.username === 'admin'" name="admin">Admin</DropdownItem>
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
                            <Form ref="loginForm" :model="form" :rules="loginRules()" :label-width="100">
                                <FormItem class="loginuid" label="UserID" prop="uid">
                                    <Input v-model="form.uid"></Input>
                                </FormItem>
                                <FormItem class="loginpwd" label="Password" prop="pwd">
                                    <Input v-model="form.pwd" type="password" @keyup.enter.native="submit"></Input>
                                </FormItem>
                            </Form>
                        </TabPane>
                        <TabPane label="Register" name="register">
                            <Form ref="registerForm" :model="form" :rules="registerRules()" :label-width="100">
                                <FormItem label="*帐号" prop="uid">
                                    <Input v-model="form.uid" ></Input>
                                </FormItem>
                                <FormItem label="*昵称" prop="name">
                                    <Input v-model="form.name"></Input>
                                </FormItem>
                                <FormItem label="*密码" prop="pwd">
                                    <Input type="password" v-model="form.pwd" value="必填"></Input>
                                </FormItem>
                                <FormItem label="*重复密码" prop="rpwd" class="rpwd">
                                    <Input type="password" v-model="form.rpwd"></Input>
                                </FormItem>
                                <FormItem label="博客" prop="blog">
                                    <Input v-model="form.blog"> </Input>
                                </FormItem>
                                <FormItem label="githup" prop="githup">
                                    <Input v-model="form.githup"> </Input>
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
               <span> {{this.account.name}} </span>
                <strong>Go-Online-Judge</strong> by <a href="https://github.com/SpiffyEight77/Go-Online-Judge" target="_blank">SpiffyEight77 <Icon type="logo-octocat" /></Icon>.</a>
                The source code is licensed <a href="http://opensource.org/licenses/mit-license.php" target="_blank">MIT</a>.
            </Footer>
        </Layout>
    </div>
</template>

<script>
import axios from 'axios'
import {mapState, mapGetters, mapActions} from 'vuex'
export default {
     data () {
            return {
                mode: 'login',
                form: {
                    "uid":'',
                    "pwd":'',
                    "rpwd": '',
                    "name":'',
                    "blog": '',
                    "githup": '',
                },
                login: false,
                logined: false,
                account: {
                    token: '',
                    uit:'',
                    name: '',
                },
                profile: {
                    "name": '',
                    "uid": '',
                }
            }
        },
        created() {
            let data = JSON.parse(localStorage.getItem("account"))
            if (data != null) {
                this.account = data
                this.logined = true
                this.$store.dispatch("setAccount", this.account)
                this.$store.dispatch("setLogined", true)
            }
            console.log(this.account)
        },
        methods: {
            profileAction (name) {
                if(name === 'logout') {
                    localStorage.clear()
                    this.$store.dispatch("setAccount", null)
                    this.logined = false
                    this.$Message.success('See you~')
                } else if(name === 'profile') {
                    this.$router.push({
                        name: 'userInfo',
                        params: {uid: this.uid}
                    })
                } else {
                    window.location.href = "http://localhost:8080"
                }
            },
            Login: function(data)
            {
                if (data.id === "") {
                    self.$Message.error("帐号不能为空!")
                    return
                }
               if (data.password === "") {
                    self.$Message.error("密码不能为空!")
                    return
               }

              axios
              .post(process.env.BASE_API + '/v1/signin', JSON.stringify(data))
              .then(res => {
                  localStorage.setItem("account", JSON.stringify(res.data))
                  localStorage.setItem("logined", true)
                  this.account = res.data
                  this.logined = true
                  this.$Message.success("Login Sucessfully!")
                  console.log("Login Successfully")
               })
              .catch(err => {
                  this.$Message.error("User not exist of password error!")
                  console.log(err)
              })
            },
            submit () {
                var self = this
                if(self.mode == 'login') {
                    var data =  {
                            "ID": this.form.uid,
                            "password": this.form.pwd
                        }
                    self.$options.methods.Login.bind(this)(data)
                    return
                }
                
                self.$Message.error("->>>>>>>>>.")
                if(self.form.pwd !== self.form.rpwd) {
                     self.$Message.error('repeat password error');
                     return
                } 
                  var data =  {
                    "id": self.form.uid,
                    "name": self.form.name,
                    "password": self.form.pwd,
                    "blog_addr": self.form.blog,
                    "githup_addr": self.form.githup,
                  }

                 if (data.id === "") {
                     self.$Message.error("帐号不能为空!")
                    return
                 }
                 if (data.nickname === "") {
                    self.$Message.error("昵称不能为空!")
                     return
                 }
                 if (data.password === "") {
                    self.$Message.error("密码不能为空!")
                     return
                }

                 axios
                 .post(process.env.BASE_API + '/v1/account/register', JSON.stringify(data)
                 ).then(function(response){
                     self.$Message.success('Clicked submit register')
                     self.login = false
                 }).catch(function(err) {
                      self.$Message.error(err.response.data.msg)                       
                  })
            },

            cancel () {
                this.$Message.info('Clicked cancel');
            },

            ok() {

            },
            loginRules() {

            },
            registerRules() {
                    
            },
            IsLogin() {
                let data = localStorage.getItem("logined")
                if (data != null && data) {
                    return true
                }
                console.log(data)
                console.log("hahahha")
                return false
            },
        },
        computed: {
            ...mapState({
              //  account: state => state.account,
                //logined: state => state.logined,
            }),
            token() {
                return this.$store.state.token
            },
            name() {
                return this.$store.state.account.name
            },
            uid() {
                return this.$store.state.uid
            },
            Account() {
                if (state.account.uid == '') {
                   let ac = JSON.parse(localStorage.getItem("account"))
                   this.$store.dispatch("setAccount", ac)
               }
               return this.$store.state.account
            },
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